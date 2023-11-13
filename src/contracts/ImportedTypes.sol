pragma solidity ^0.8.16;

struct ImportedFileLevelStruct {
    uint256 amount;
    address owner;
}

struct ImportedFileLevelStructAliased {
    string note;
    bool flag;
}

contract ImportedTypesInContract {
    struct ImportedContractLevelStruct {
        bytes32 sig;
        uint64 timestamp;
    }

    struct ImportedContractLevelStructUnlinked {
        bytes data;
        bool valid;
        uint64 timestamp;
    }
}
