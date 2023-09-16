import { commaSeparatedList, ethereumAddress } from './regEx'
import { InvalidArgumentError, InvalidOptionArgumentError } from 'commander'
import { getAddress } from 'ethers/lib/utils'

export const validateAddress = (address: string): string => {
    try {
        if (typeof address === 'string' && address?.match(ethereumAddress))
            return getAddress(address)
    } catch (err) {}

    throw new InvalidArgumentError(
        `Address must be in hexadecimal format with a 0x prefix.`,
    )
}

// Splits a comma-separated list of names.
export const validateNames = (variables: string): string[] => {
    try {
        if (
            typeof variables === 'string' &&
            variables.match(commaSeparatedList)
        )
            return variables.split(',')
    } catch (err) {}

    throw new InvalidArgumentError(
        `Must be a comma-separate list of names with no white spaces.`,
    )
}

export const validateLineBuffer = (lineBufferParam: string): number => {
    try {
        const lineBuffer = parseInt(lineBufferParam, 10)
        if (lineBuffer >= 0) return lineBuffer
    } catch (err) {}
    throw new InvalidOptionArgumentError(
        `Must be a zero or a positive integer.`,
    )
}
