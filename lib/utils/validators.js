"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLineBuffer = exports.validateAddresses = exports.validateAddress = void 0;
const regEx_1 = require("./regEx");
const commander_1 = require("commander");
const utils_1 = require("ethers/lib/utils");
const validateAddress = (address) => {
    try {
        if (typeof address === 'string' && address?.match(regEx_1.ethereumAddress))
            return (0, utils_1.getAddress)(address);
    }
    catch (err) { }
    throw new commander_1.InvalidArgumentError(`Address must be in hexadecimal format with a 0x prefix.`);
};
exports.validateAddress = validateAddress;
const validateAddresses = (addresses) => {
    try {
        const addressArray = convertAddresses(addresses);
        if (addressArray)
            return addressArray;
    }
    catch (err) { }
    throw new commander_1.InvalidArgumentError(`Must be an address or an array of addresses in hexadecimal format with a 0x prefix.
If running for multiple addresses, the comma-separated list of addresses must not have white spaces.`);
};
exports.validateAddresses = validateAddresses;
const convertAddresses = (addresses) => {
    if (typeof addresses === 'string' && addresses?.match(regEx_1.ethereumAddress))
        return [(0, utils_1.getAddress)(addresses).toLowerCase()];
    if (typeof addresses === 'string' && addresses?.match(regEx_1.ethereumAddresses))
        return addresses.split(',').map((a) => (0, utils_1.getAddress)(a).toLowerCase());
    return undefined;
};
const validateLineBuffer = (lineBufferParam) => {
    const lineBuffer = parseInt(lineBufferParam);
    if (isNaN(lineBuffer))
        throw Error(`Invalid line buffer "${lineBuffer}". Must be a number`);
    return lineBuffer;
};
exports.validateLineBuffer = validateLineBuffer;
//# sourceMappingURL=validators.js.map