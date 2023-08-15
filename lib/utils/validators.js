"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLineBuffer = exports.validateVariables = exports.validateAddress = void 0;
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
const validateVariables = (variables) => {
    try {
        if (typeof variables === 'string' &&
            variables.match(regEx_1.commaSeparatedList))
            return variables.split(',');
    }
    catch (err) { }
    throw new commander_1.InvalidArgumentError(`Must be a comma-separate list of storage variable names with no white spaces.`);
};
exports.validateVariables = validateVariables;
const validateLineBuffer = (lineBufferParam) => {
    try {
        const lineBuffer = parseInt(lineBufferParam, 10);
        if (lineBuffer >= 0)
            return lineBuffer;
    }
    catch (err) { }
    throw new commander_1.InvalidOptionArgumentError(`Must be a zero or a positive integer.`);
};
exports.validateLineBuffer = validateLineBuffer;
//# sourceMappingURL=validators.js.map