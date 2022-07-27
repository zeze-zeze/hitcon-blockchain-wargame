pragma solidity ^0.8.10;

contract Vuln5 {
    mapping(address => bool) public crackerList;

    modifier winCondition() {
        require(crackerList[tx.origin] == true);
        _;
    }

    modifier contractGate() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gasGate() {
        require((gasleft() % 22) == 0);
        _;
    }

    modifier keyGate(bytes8 _gateKey) {
        unchecked {
            require(
                uint64(uint160(msg.sender)) ^ uint64(_gateKey) == uint64(0) - 1
            );
        }
        _;
    }

    function crack(bytes8 _gateKey)
        public
        contractGate
        gasGate
        keyGate(_gateKey)
    {
        crackerList[tx.origin] = true;
    }
}
