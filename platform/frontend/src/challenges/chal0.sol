pragma solidity ^0.8.10;

contract Vuln0 {
  struct tutorial {
    bool knowPlayerAddress;
    bool knowContractAddress;
    bool knowUint;
  }

  mapping (address => tutorial) solverToTutorial;

  modifier winCondition() {
    require (solverToTutorial[tx.origin].knowPlayerAddress);
    require (solverToTutorial[tx.origin].knowContractAddress);
    require (solverToTutorial[tx.origin].knowUint);
    _;
  }

  function giveMeYourAddress(address _player) public {
    require (_player == tx.origin);
    solverToTutorial[tx.origin].knowPlayerAddress = true;
  }

  function giveMeContractAddress(address _contract) public {
    require (_contract == address(this));
    solverToTutorial[tx.origin].knowContractAddress = true;
  }

  function giveMeUint(uint _num) public {
    require (_num == 13371337);
    solverToTutorial[tx.origin].knowUint = true;
  }
}
