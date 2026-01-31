const fs = require("fs")
const path = require("path")

// Small delay to ensure file is written
setTimeout(() => {
  // Truffle artifact
  const artifact = require("../contract/build/contracts/Polling.json")

  const networkIds = Object.keys(artifact.networks)
  const latestNetworkId = networkIds[networkIds.length - 1]
  const address = artifact.networks[latestNetworkId].address

  const envPath = path.join(__dirname, "../.env")

  fs.writeFileSync(
    envPath,
    `VITE_CONTRACT_ADDRESS=${address}\n`
  )

  console.log("✅ Contract address written to .env:", address)
}, 1000)
