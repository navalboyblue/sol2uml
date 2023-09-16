import {
    validateAddress,
    validateLineBuffer,
    validateNames,
} from '../validators'

describe('Validators', () => {
    describe('valid address', () => {
        test.each([
            [
                '0xf7749B41db006860cEc0650D18b8013d69C44Eeb',
                '0xf7749B41db006860cEc0650D18b8013d69C44Eeb',
            ],
            [
                '0x1111111254fb6c44bac0bed2854e76f90643097d', // no checksum
                '0x1111111254fb6c44bAC0beD2854e76F90643097d',
            ],
        ])('%s', (address, expected) => {
            expect(validateAddress(address)).toEqual(expected)
        })
    })
    describe('invalid address', () => {
        test.each([
            '',
            '0xf7749B41db006860cEc0650D18b8013d69C44E',
            12,
            '0x',
            'XYZ',
            '0xf7749B41db006860cEc0650D18b8013d69C44Eeb,',
            ',0xf7749B41db006860cEc0650D18b8013d69C44Eeb',
        ])('%s', (address) => {
            // @ts-ignore
            expect(() => validateAddress(address)).toThrow(
                'Address must be in hexadecimal format with a 0x prefix',
            )
        })
    })
    describe('valid line buffer', () => {
        test.each([
            [0, 0],
            ['0', 0],
            ['1', 1],
            [1, 1],
            ['2', 2],
            ['10', 10],
            ['13', 13],
        ])('%s', (depth, expected) => {
            // @ts-ignore
            return expect(validateLineBuffer(depth)).toEqual(expected)
        })
    })
    describe('invalid line buffer', () => {
        test.each(['-1', -2, 'X', 'depth'])('%s', (depth) => {
            // @ts-ignore
            expect(() => validateLineBuffer(depth)).toThrow(
                'Must be a zero or a positive integer',
            )
        })
    })
    describe('valid variable names', () => {
        test.each([
            ['gap', ['gap']],
            ['__gap', ['__gap']],
            ['gap,__gap', ['gap', '__gap']],
            ['GaP,gap1', ['GaP', 'gap1']],
            ['gap,__gap,___gap', ['gap', '__gap', '___gap']],
        ])('%s', (variable, expected) => {
            expect(validateNames(variable)).toEqual(expected)
        })
    })
    describe('invalid variable names', () => {
        test.each([
            12,
            'gap,',
            'gap ',
            ' gap',
            ',',
            ',,',
            ',gap',
            'gap, gap2',
            'gap,ga p2',
            'gap1,gap2,',
            'gap1,gap2,gap3,',
        ])('%s', (variables) => {
            // @ts-ignore
            expect(() => validateNames(variables)).toThrow(
                'Must be a comma-separate list of names with no white spaces.',
            )
        })
    })
})
