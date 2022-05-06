//SPSPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/// @title Vulnerability for challenge one
/// @author zeze
contract Vuln1 {
  /*************************
  **    MAIN VARIABLE     **
  *************************/
  mapping (address => uint) solverToPoints;

  /*************************
  **    HELPER SECTION    **
  *************************/
  modifier winCondition() {
    require (solverToPoints[tx.origin] > 10000000000);
    _;
  }

  /*************************
  **     USERS SECTION    **
  *************************/
  function getPoints() public view returns (uint) {
    return solverToPoints[tx.origin];
  }

  function addPoints(int _amount) public {
    require (_amount < 10);
    if (_amount >= 0) {
      solverToPoints[tx.origin] += uint(_amount);  
    } else {
      solverToPoints[tx.origin] += uint(-_amount);  
    }
  }
}
