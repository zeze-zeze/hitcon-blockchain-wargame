// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract HitconNFTSender is ERC1155Supply, Ownable, ReentrancyGuard {

    constructor(string memory _uri) public ERC1155(_uri) {
        _mint(msg.sender, 1, 1000000000000, "");
    }
    
    event hadSent(address indexed _solver);

    function allSolved(address _solver)
        external
        nonReentrant
        onlyOwner
    {
        _mint(_solver, 1, 1, "");
        emit hadSent(_solver);
    }

    function setURI(string memory _newuri) public onlyOwner {
        super._setURI(_newuri);
    }
}
