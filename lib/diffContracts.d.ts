import { EtherscanParser } from './parserEtherscan';
interface DiffOptions {
    network: string;
    lineBuffer: number;
}
interface FlattenAndDiffOptions extends DiffOptions {
    aFile?: string;
    bFile?: string;
    saveFiles?: boolean;
}
interface DiffFiles {
    filename?: string;
    aCode?: string;
    bCode?: string;
    result: 'added' | 'removed' | 'match' | 'changed';
}
interface CompareContracts {
    files: DiffFiles[];
    contractNameA: string;
    contractNameB: string;
}
export declare const compareContracts: (addressA: string, addressB: string, etherscanParserA: EtherscanParser, etherscanParserB: EtherscanParser, options: DiffOptions) => Promise<CompareContracts>;
export declare const displayContractNames: (addressA: string, addressB: string, contractNameA: string, contractNameB: string, options: {
    network: string;
    bNetwork?: string;
}) => void;
export declare const displayFileDiffSummary: (fileDiffs: DiffFiles[]) => void;
export declare const displayFileDiffs: (fileDiffs: DiffFiles[], options?: {
    lineBuffer?: number;
}) => void;
export declare const flattenAndDiff: (addressA: string, addressB: string, aEtherscanParser: EtherscanParser, bEtherscanParser: EtherscanParser, options: FlattenAndDiffOptions) => Promise<{
    contractNameA: string;
    contractNameB: string;
}>;
export {};
