/**
 * Set the user registry in the ClrFund contract.
 *
 * Sample usage:
 *
 *  yarn hardhat set-user-registry --network <network>
 *
 * Note:
 * 1) Make sure you have deploy-config.json (see deploy-config-example.json).
 * 2) Make sure you have deployed-contracts.json created from the new-clrfund task
 *
 */

import { task, types } from 'hardhat/config'

import { Subtask } from '../helpers/Subtask'
import { type ISubtaskParams } from '../helpers/types'

task('set-user-registry', 'Set the user registry in ClrFund')
  .addFlag('incremental', 'Incremental deployment')
  .addFlag('strict', 'Fail on warnings')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addFlag('manageNonce', 'Manually increment nonce for each transaction')
  .addOptionalParam('skip', 'Skip steps with less or equal index', 0, types.int)
  .setAction(async (params: ISubtaskParams, hre) => {
    const { verify, manageNonce } = params
    const subtask = Subtask.getInstance(hre)

    subtask.setHre(hre)
    const deployer = await subtask.getDeployer()

    if (manageNonce) {
      subtask.setNonceManager(deployer)
    }

    let success: boolean
    try {
      await subtask.logStart()
      const steps = await subtask.getDeploySteps(['user'], params)

      const skip = params.skip || 0

      await subtask.runSteps(steps, skip)
      await subtask.checkResults(params.strict)
      success = true
    } catch (err) {
      console.error(
        '\n=========================================================\nERROR:',
        err,
        '\n'
      )
      success = false
    }

    await subtask.finish(success)

    if (verify) {
      console.log('Verify all contracts')
      await hre.run('verify-all')
    }
  })
