pragma solidity ^0.8.10;

contract Vuln3 {
  bytes32 private password;
  mapping (address => bool) public solverToAuth;
  constructor(bytes32 _password) {
    password = _password;
  }

  modifier winCondition() {
    require (solverToAuth[tx.origin]);
    _;
  }

  function auth(bytes32 _password) public {
    if (password == _password) {
      solverToAuth[tx.origin] = true;
    }
  }
}
