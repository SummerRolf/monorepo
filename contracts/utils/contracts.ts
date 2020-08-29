import { BigNumber, Contract } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export async function getGasUsage(transaction: TransactionResponse): Promise<number | null> {
  const receipt = await transaction.wait()
  if (receipt.status === 1) {
    return (receipt.gasUsed as BigNumber).toNumber()
  } else {
    return null
  }
}

export async function getEventArg(
  transaction: TransactionResponse,
  contract: Contract,
  eventName: string,
  argumentName: string,
): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
  const receipt = await transaction.wait()
  for (const log of receipt.logs || []) {
    if (log.address != contract.address) {
      continue;
    }
    const event = contract.interface.parseLog(log)
    if (event && event.name === eventName) {
      return event.args[argumentName]
    }
  }
  throw new Error('Event not found')
}
