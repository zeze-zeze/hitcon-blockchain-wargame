// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Vuln1 {
  /*************************
  **    MAIN VARIABLE     **
  *************************/
  mapping (address => bool) solverToHitcon;

  /*************************
  **    HELPER SECTION    **
  *************************/
  modifier winCondition() {
    require (solverToHitcon[tx.origin]);
    _;
  }

  /*************************
  **     USERS SECTION    **
  *************************/

  function hitcon(uint _hitcon) public {
    require (_hitcon == uint(keccak256(abi.encodePacked("I love hitcon !!!!!!!!!"))));
    solverToHitcon[tx.origin] = true;
  }
}
