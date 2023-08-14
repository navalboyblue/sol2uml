
export ARCHIVE_NODE_URL=https://

# Flatten

### Aave V3 Pool mainnet
sol2uml flatten 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2

# Diff

## Origin contracts
### OETH VaultCore
sol2uml diff 0x1091588Cc431275F99DC5Df311fd8E1Ab81c89F3 0xEA24e9Bac006DE9635Ac7fA4D767fFb64FB5645c -v
sol2uml diff 0x1091588Cc431275F99DC5Df311fd8E1Ab81c89F3 0xEA24e9Bac006DE9635Ac7fA4D767fFb64FB5645c --summary
sol2uml diff 0x1091588Cc431275F99DC5Df311fd8E1Ab81c89F3 0xEA24e9Bac006DE9635Ac7fA4D767fFb64FB5645c --aFile Governable
sol2uml diff 0x1091588Cc431275F99DC5Df311fd8E1Ab81c89F3 0xEA24e9Bac006DE9635Ac7fA4D767fFb64FB5645c --aFile VaultCore
sol2uml diff 0x1091588Cc431275F99DC5Df311fd8E1Ab81c89F3 0xEA24e9Bac006DE9635Ac7fA4D767fFb64FB5645c --aFile OETHVaultCore --bFile VaultCore -v
sol2uml diff 0x1091588Cc431275F99DC5Df311fd8E1Ab81c89F3 0xEA24e9Bac006DE9635Ac7fA4D767fFb64FB5645c --aFile VaultStorage

### OETH Frax Strategy
### Has added and changed contracts
sol2uml diff 0x167747bf5b3b6bf2f7f7c4cce32c463e9598d425 0x5061cde874f75d119de3b07e191644097343ab9e -v
sol2uml diff 0x167747bf5b3b6bf2f7f7c4cce32c463e9598d425 0x5061cde874f75d119de3b07e191644097343ab9e --summary
sol2uml diff 0x167747bf5b3b6bf2f7f7c4cce32c463e9598d425 0x5061cde874f75d119de3b07e191644097343ab9e --aFile Generalized4626Strategy

### OUSD Token
## Old contract was flattened, new contract has multiple files
sol2uml diff 0xB248c975DaeAc47c4960EcBD10a79E486eBD1cA8 0x33db8d52d65F75E4cdDA1b02463760c9561A2aa1 -v
sol2uml diff 0xB248c975DaeAc47c4960EcBD10a79E486eBD1cA8 0x33db8d52d65F75E4cdDA1b02463760c9561A2aa1 --flatten -v

### OUSD VaultCore upgrade
sol2uml diff 0x48Cf14DeA2f5dD31c57218877195913412D3278A 0x997c35A0bf8E21404aE4379841E0603C957138c3 -v

## Curve
### stETH and frxETH Metapool
### Vyper contracts
sol2uml diff 0xdc24316b9ae028f1497c275eb9192a3ea0f67022 0xa1f8a6807c402e4a15ef4eba36528a3fed24e577 -v
### FRAX/USDC (crvFRAX) mainnet v arbitrum
sol2uml diff 0xdcef968d416a41cdac0ed8702fac8128a64241a2 0xc9b8a3fdecb9d5b218d02555a8baf332e5b740d5 --bNetwork arbitrum
sol2uml diff 0xdcef968d416a41cdac0ed8702fac8128a64241a2 0xc9b8a3fdecb9d5b218d02555a8baf332e5b740d5 --bn arbitrum

## Aave
### Aave V3 Pool mainnet v Optimism
sol2uml diff 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2 0x794a61358d6845594f94dc1db02a252b5b4814ad --bNetwork optimism
### Aave V3 Pool mainnet v Optimism flattened
sol2uml diff 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2 0x794a61358d6845594f94dc1db02a252b5b4814ad -bn optimism --flatten
### Aave V3 Pool Polygon v Optimism
### all files are the same
sol2uml diff 0x794a61358D6845594F94dc1DB02A252b5b4814aD 0x794a61358d6845594f94dc1db02a252b5b4814ad -n polygon -bn optimism

## USDC
## flattened source files with different contract names
sol2uml diff 0xb7277a6e95992041568d9391d09d0122023778a2 0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf
# Compare DAI to USDC
sol2uml diff 0x6b175474e89094c44da98b954eedeac495271d0f 0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf

## Balancer
## Compare Balancer Vault on Mainnet and Arbitrum
sol2uml diff 0xBA12222222228d8Ba445958a75a0704d566BF2C8 0xBA12222222228d8Ba445958a75a0704d566BF2C8 --bNetwork arbitrum
## Compare Balancer Vault on Mainnet and Optimism
sol2uml diff 0xBA12222222228d8Ba445958a75a0704d566BF2C8 0xBA12222222228d8Ba445958a75a0704d566BF2C8 --bNetwork optimism

# Uniswap
## Compare Uniswap SwapRouter02 between Mainnet and Celo
sol2uml diff 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45 0x5615CDAb10dc425a742d643d949a7F474C01abc4 --bNetwork celo
## Compare Uniswap SwapRouter02 between Mainnet and BNB
sol2uml diff 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45 0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2 --bNetwork bsc

# Storage
## FRAXStablecoin where Contract is followed by a boolean.
sol2uml storage -d 0x853d955aCEf822Db058eb8505911ED77F175b99e
