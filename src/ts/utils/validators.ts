import { ethereumAddress, ethereumAddresses } from './regEx'
import { InvalidArgumentError } from 'commander'
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

export const validateAddresses = (addresses: string): string[] => {
    try {
        const addressArray = convertAddresses(addresses)
        if (addressArray) return addressArray
    } catch (err) {}

    throw new InvalidArgumentError(
        `Must be an address or an array of addresses in hexadecimal format with a 0x prefix.
If running for multiple addresses, the comma-separated list of addresses must not have white spaces.`,
    )
}

const convertAddresses = (addresses: string): string[] => {
    if (typeof addresses === 'string' && addresses?.match(ethereumAddress))
        return [getAddress(addresses).toLowerCase()]
    if (typeof addresses === 'string' && addresses?.match(ethereumAddresses))
        return addresses.split(',').map((a) => getAddress(a).toLowerCase())
    return undefined
}

export const validateLineBuffer = (lineBufferParam: string): number => {
    const lineBuffer = parseInt(lineBufferParam)
    if (isNaN(lineBuffer))
        throw Error(`Invalid line buffer "${lineBuffer}". Must be a number`)
    return lineBuffer
}
