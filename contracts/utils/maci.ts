import { Contract, BigNumber, ContractReceipt, utils } from 'ethers'
import {
  bnSqrt,
  createMessage,
  getRecipientClaimData,
  IncrementalQuinTree,
  hash5,
  hash2,
  LEAVES_PER_NODE,
} from '@clrfund/common'

import { genTallyResultCommitment } from 'maci-core'
import { VerifyingKey } from 'maci-domainobjs'
import { extractVk } from 'maci-circuits'
import { CIRCUITS } from './deployment'
import path from 'path'

export interface ZkFiles {
  processZkFile: string
  processWitness: string
  tallyZkFile: string
  tallyWitness: string
}
/**
 * Get the zkey file path
 * @param name zkey file name
 * @returns zkey file path
 */
export function getCircuitFiles(circuit: string, directory: string): ZkFiles {
  const params = CIRCUITS[circuit]
  return {
    processZkFile: path.join(directory, params.processMessagesZkey),
    processWitness: path.join(directory, params.processWitness),
    tallyZkFile: path.join(directory, params.tallyVotesZkey),
    tallyWitness: path.join(directory, params.tallyWitness),
  }
}

export class MaciParameters {
  stateTreeDepth: number
  intStateTreeDepth: number
  messageTreeSubDepth: number
  messageTreeDepth: number
  voteOptionTreeDepth: number
  maxMessages: number
  maxVoteOptions: number
  messageBatchSize: number
  processVk: VerifyingKey
  tallyVk: VerifyingKey

  constructor(parameters: { [name: string]: any } = {}) {
    this.stateTreeDepth = parameters.stateTreeDepth
    this.intStateTreeDepth = parameters.intStateTreeDepth
    this.messageTreeSubDepth = parameters.messageTreeSubDepth
    this.messageTreeDepth = parameters.messageTreeDepth
    this.voteOptionTreeDepth = parameters.voteOptionTreeDepth
    this.maxMessages = parameters.maxMessages
    this.maxVoteOptions = parameters.maxVoteOptions
    this.messageBatchSize = parameters.messageBatchSize
    this.processVk = parameters.processVk
    this.tallyVk = parameters.tallyVk
  }

  asContractParam(): any[] {
    return [
      this.stateTreeDepth,
      {
        intStateTreeDepth: this.intStateTreeDepth,
        messageTreeSubDepth: this.messageTreeSubDepth,
        messageTreeDepth: this.messageTreeDepth,
        voteOptionTreeDepth: this.voteOptionTreeDepth,
      },
      { maxMessages: this.maxMessages, maxVoteOptions: this.maxVoteOptions },
      this.messageBatchSize,
      this.processVk.asContractParam(),
      this.tallyVk.asContractParam(),
    ]
  }

  static fromConfig(circuit: string, directory: string): MaciParameters {
    const params = CIRCUITS[circuit]
    const { processZkFile, tallyZkFile } = getCircuitFiles(circuit, directory)
    const processVk: VerifyingKey = VerifyingKey.fromObj(
      extractVk(processZkFile)
    )
    const tallyVk: VerifyingKey = VerifyingKey.fromObj(extractVk(tallyZkFile))

    return new MaciParameters({
      ...params.maxValues,
      ...params.treeDepths,
      ...params.batchSizes,
      processVk,
      tallyVk,
    })
  }

  static async fromContract(maciFactory: Contract): Promise<MaciParameters> {
    const stateTreeDepth = await maciFactory.stateTreeDepth()
    const {
      intStateTreeDepth,
      messageTreeSubDepth,
      messageTreeDepth,
      voteOptionTreeDepth,
    } = await maciFactory.treeDepths()
    const { maxMessages, maxVoteOptions } = await maciFactory.maxValues()
    const messageBatchSize = await maciFactory.messageBatchSize()
    const vkRegistry = await maciFactory.vkRegistry()

    const processVk = await vkRegistry.getProcessVk(
      stateTreeDepth,
      messageTreeDepth,
      voteOptionTreeDepth,
      messageBatchSize
    )

    const tallyVk = await vkRegistry.getTallyVk(
      stateTreeDepth,
      intStateTreeDepth,
      voteOptionTreeDepth
    )

    return new MaciParameters({
      stateTreeDepth,
      intStateTreeDepth,
      messageTreeSubDepth,
      messageTreeDepth,
      voteOptionTreeDepth,
      maxMessages,
      maxVoteOptions,
      messageBatchSize,
      processVk: VerifyingKey.fromContract(processVk),
      tallyVk: VerifyingKey.fromContract(tallyVk),
    })
  }

  static mock(circuit: string): MaciParameters {
    const processVk = VerifyingKey.fromObj({
      vk_alpha_1: [1, 2],
      vk_beta_2: [
        [1, 2],
        [1, 2],
      ],
      vk_gamma_2: [
        [1, 2],
        [1, 2],
      ],
      vk_delta_2: [
        [1, 2],
        [1, 2],
      ],
      IC: [[1, 2]],
    })
    const params = CIRCUITS[circuit]
    return new MaciParameters({
      ...params.maxValues,
      ...params.treeDepths,
      ...params.batchSizes,
      processVk,
      tallyVk: processVk.copy(),
    })
  }
}

export function getRecipientTallyResult(
  recipientIndex: number,
  recipientTreeDepth: number,
  tally: any
): any[] {
  // Create proof for tally result
  const result = tally.results.tally[recipientIndex]
  const resultTree = new IncrementalQuinTree(
    recipientTreeDepth,
    BigInt(0),
    LEAVES_PER_NODE,
    hash5
  )
  for (const leaf of tally.results.tally) {
    resultTree.insert(leaf)
  }
  const resultProof = resultTree.genMerklePath(recipientIndex)
  const spentVoiceCreditsHash = hash2([
    BigInt(tally.totalSpentVoiceCredits.spent),
    BigInt(tally.totalSpentVoiceCredits.salt),
  ])

  const perVOSpentVoiceCreditsHash = genTallyResultCommitment(
    tally.perVOSpentVoiceCredits.tally.map((x) => BigInt(x)),
    BigInt(tally.perVOSpentVoiceCredits.salt),
    recipientTreeDepth
  )

  return [
    recipientTreeDepth,
    recipientIndex,
    result,
    resultProof.pathElements.map((x) => x.map((y) => y.toString())),
    spentVoiceCreditsHash,
    perVOSpentVoiceCreditsHash,
  ]
}

export function getRecipientTallyResultsBatch(
  recipientStartIndex: number,
  recipientTreeDepth: number,
  tally: any,
  batchSize: number
): any[] {
  const tallyCount = tally.results.tally.length
  if (recipientStartIndex >= tallyCount) {
    throw new Error('Recipient index out of bound')
  }

  const tallyData = []
  const lastIndex =
    recipientStartIndex + batchSize > tallyCount
      ? tallyCount
      : recipientStartIndex + batchSize
  for (let i = recipientStartIndex; i < lastIndex; i++) {
    tallyData.push(getRecipientTallyResult(i, recipientTreeDepth, tally))
  }

  return [
    recipientTreeDepth,
    tallyData.map((item) => item[1]),
    tallyData.map((item) => item[2]),
    tallyData.map((item) => item[3]),
    // TODO: fix this after getting the result of tally
    tallyData.map((item) => item[4]),
    tallyData.map((item) => item[5]),
    tally.newTallyCommitment,
  ]
}

export async function addTallyResultsBatch(
  fundingRound: Contract,
  recipientTreeDepth: number,
  tallyData: any,
  batchSize: number,
  startIndex = 0,
  callback?: (processed: number, receipt: ContractReceipt) => void
): Promise<BigNumber> {
  let totalGasUsed = BigNumber.from(0)
  const { tally } = tallyData.results
  for (let i = startIndex; i < tally.length; i = i + batchSize) {
    const data = getRecipientTallyResultsBatch(
      i,
      recipientTreeDepth,
      tallyData,
      batchSize
    )

    const tx = await fundingRound.addTallyResultsBatch(...data)
    const receipt = await tx.wait()
    if (callback) {
      // the 2nd element in the data array has the array of
      // recipients to be processed for the batch
      const totalProcessed = i + data[1].length
      callback(totalProcessed, receipt)
    }
    totalGasUsed = totalGasUsed.add(receipt.gasUsed)
  }
  return totalGasUsed
}

export { createMessage, getRecipientClaimData, bnSqrt }
