import { isAddress } from './utils/regEx'

const clc = require('cli-color')

import { writeSolidity } from './writerFiles'
import { diffCode } from './utils/diff'
import { EtherscanParser } from './parserEtherscan'

interface DiffOptions {
    network: string
    lineBuffer: number
}

interface FlattenAndDiffOptions extends DiffOptions {
    aFile?: string
    bFile?: string
    saveFiles?: boolean
}

interface DiffFiles {
    filename?: string
    aCode?: string
    bCode?: string
    result: 'added' | 'removed' | 'match' | 'changed'
}
interface CompareContracts {
    files: DiffFiles[]
    contractNameA: string
    contractNameB: string
}
export const compareContracts = async (
    addressA: string,
    addressB: string,
    etherscanParserA: EtherscanParser,
    etherscanParserB: EtherscanParser,
    options: DiffOptions,
): Promise<CompareContracts> => {
    const files: DiffFiles[] = []
    const { files: aFiles, contractName: contractNameA } =
        await etherscanParserA.getSourceCode(addressA)

    const { files: bFiles, contractName: contractNameB } =
        await etherscanParserB.getSourceCode(addressB)

    if (aFiles.length === 1 && bFiles.length === 1) {
        if (isAddress(aFiles[0].filename))
            files.push({
                filename: `${aFiles[0].filename} to ${bFiles[0].filename}`,
                aCode: aFiles[0].code,
                bCode: bFiles[0].code,
                result: aFiles[0].code === bFiles[0].code ? 'match' : 'changed',
            })
        return {
            files,
            contractNameA,
            contractNameB,
        }
    }

    // For each file in the A contract
    for (const aFile of aFiles) {
        // Look for A contract filename in B contract
        const bFile = bFiles.find((bFile) => bFile.filename === aFile.filename)

        if (bFile) {
            // The A contract filename exists in the B contract
            if (aFile.code !== bFile.code) {
                // console.log(`${aFile.filename}  ${clc.red('different')}:`)
                files.push({
                    filename: aFile.filename,
                    aCode: aFile.code,
                    bCode: bFile.code,
                    result: 'changed',
                })
            } else {
                files.push({
                    filename: aFile.filename,
                    aCode: aFile.code,
                    bCode: bFile.code,
                    result: 'match',
                })
            }
        } else {
            // The A contract filename does not exist in the B contract
            files.push({
                filename: aFile.filename,
                aCode: aFile.code,
                result: 'removed',
            })
        }
    }

    // For each file in the B contract
    for (const bFile of bFiles) {
        // Look for B contract filename in A contract
        const aFile = aFiles.find((aFile) => aFile.filename === bFile.filename)
        if (!aFile) {
            // The B contract filename does not exist in the A contract
            files.push({
                filename: bFile.filename,
                bCode: bFile.code,
                result: 'added',
            })
        }
    }

    // Sort by filename
    return {
        files: files.sort((a, b) => a.filename.localeCompare(b.filename)),
        contractNameA,
        contractNameB,
    }
}

export const displayContractNames = (
    addressA: string,
    addressB: string,
    contractNameA: string,
    contractNameB: string,
    options: { network: string; bNetwork?: string },
) => {
    console.log(
        `Contract A: ${addressA} ${contractNameA} on ${options.network}`,
    )
    console.log(
        `Contract B: ${addressB} ${contractNameB} on ${
            options.bNetwork || options.network
        }\n`,
    )
}

export const displayFileDiffSummary = (fileDiffs: DiffFiles[]) => {
    for (const file of fileDiffs) {
        switch (file.result) {
            case 'match':
                console.log(`${file.result.padEnd(7)} ${file.filename}`)
                break
            case 'added':
                console.log(
                    `${clc.green(file.result.padEnd(7))} ${file.filename}`,
                )
                break
            case 'changed':
            case 'removed':
                console.log(`${clc.red(file.result)} ${file.filename}`)
                break
        }
    }
}

export const displayFileDiffs = (
    fileDiffs: DiffFiles[],
    options: { lineBuffer?: number } = {},
) => {
    for (const file of fileDiffs) {
        switch (file.result) {
            case 'added':
                console.log(`Added ${file.filename}`)
                console.log(clc.green(file.bCode))
                break
            case 'changed':
                console.log(`Changed ${file.filename}`)
                diffCode(file.aCode, file.bCode, options.lineBuffer)
                break
            case 'removed':
                console.log(`Removed ${file.filename}`)
                console.log(clc.red(file.aCode))
                break
        }
    }
}

export const flattenAndDiff = async (
    addressA: string,
    addressB: string,
    aEtherscanParser: EtherscanParser,
    bEtherscanParser: EtherscanParser,
    options: FlattenAndDiffOptions,
): Promise<{ contractNameA: string; contractNameB: string }> => {
    // Get verified Solidity code from Etherscan and flatten
    const { solidityCode: codeA, contractName: contractNameA } =
        await aEtherscanParser.getSolidityCode(addressA, options.aFile)
    const { solidityCode: codeB, contractName: contractNameB } =
        await bEtherscanParser.getSolidityCode(
            addressB,
            options.bFile || options.aFile,
        )

    displayContractNames(
        addressA,
        addressB,
        contractNameA,
        contractNameB,
        options,
    )

    diffCode(codeA, codeB, options.lineBuffer)

    if (options.saveFiles) {
        await writeSolidity(codeA, addressA)
        await writeSolidity(codeB, addressB)
    }

    displayContractNames(
        addressA,
        addressB,
        contractNameA,
        contractNameB,
        options,
    )

    return { contractNameA, contractNameB }
}
