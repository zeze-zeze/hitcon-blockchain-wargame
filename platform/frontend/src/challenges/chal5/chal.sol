pragma solidity ^0.8.10;

contract Vuln5 {
  mapping (address => bool) solverToHitcon;

  modifier winCondition() {
    require (solverToHitcon[tx.origin]);
    _;
  }

  function hitcon(uint _hitcon) public {
    require (_hitcon == uint(keccak256(abi.encodePacked("I love hitcon !!!!!!!!!"))));
    solverToHitcon[tx.origin] = true;
  }
}
