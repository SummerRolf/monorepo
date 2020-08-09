import fs from 'fs'
import { exec } from 'child_process'
import { network, ethers } from '@nomiclabs/buidler'

function execAsync(command: string): Promise<string> {
  console.log(command)
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr)
        return
      }
      resolve(stdout.trim())
    })
  })
}

async function main() {
  const state = JSON.parse(fs.readFileSync('state.json').toString())
  const fundingRound = await ethers.getContractAt('FundingRound', state.fundingRound)
  const maciAddress = await fundingRound.maci()
  const providerUrl = (network.config as any).url
  const coordinatorEthPrivKey = process.env.COORDINATOR_ETH_PK || '0xd49743deccbccc5dc7baa8e69e5be03298da8688a15dd202e20f15d5e0e9a9fb'

  // Process messages
  const processCmdOutput = await execAsync(`
    node ../node_modules/maci-cli/build/index.js process \
      --eth-provider ${providerUrl} \
      --contract ${maciAddress} \
      --privkey ${state.coordinator.privKey} \
      --eth-privkey ${coordinatorEthPrivKey} \
      --repeat
  `)
  console.log(processCmdOutput)
  const randomStateLeafMatch = processCmdOutput.match(/^Random state leaf: (.+)$/m)
  let randomStateLeaf
  if (randomStateLeafMatch) {
    randomStateLeaf = randomStateLeafMatch[1]
  } else {
    throw new Error('Invalid output')
  }

  // Tally votes
  const tallyCmdOutput = await execAsync(`
    node ../node_modules/maci-cli/build/index.js tally \
      --eth-provider ${providerUrl} \
      --contract ${maciAddress} \
      --privkey ${state.coordinator.privKey} \
      --eth-privkey ${coordinatorEthPrivKey} \
      --repeat \
      --current-results-salt 0x0 \
      --current-total-vc-salt 0x0 \
      --current-per-vo-vc-salt 0x0 \
      --tally-file tally.json \
      --leaf-zero ${randomStateLeaf}
  `)
  console.log(tallyCmdOutput)

  // Verify results
  const verifyCmdOutput = await execAsync(`
    node ../node_modules/maci-cli/build/index.js verify --tally-file tally.json
  `)
  console.log(verifyCmdOutput)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
