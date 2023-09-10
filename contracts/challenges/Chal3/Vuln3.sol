//SPSPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/// @title Vulnerability for challenge three
/// @author zeze
contract Vuln3 {
  /*************************
  **    MAIN VARIABLE     **
  *************************/
  bytes32 private password;
  mapping (address => bool) public solverToAuth;
  constructor(bytes32 _password) {
    password = _password;
  }

  /*************************
  **    HELPER SECTION    **
  *************************/
  modifier winCondition() {
    require (solverToAuth[tx.origin]);
    _;
  }

  /*************************
  **     USERS SECTION    **
  *************************/
  function auth(bytes32 _password) public {
    if (password == _password) {
      solverToAuth[tx.origin] = true;
    }
  }
}
