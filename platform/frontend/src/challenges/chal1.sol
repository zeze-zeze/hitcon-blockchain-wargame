pragma solidity ^0.8.10;

contract Vuln1 {
  mapping (address => uint) solverToPoints;

  modifier winCondition() {
    require (solverToPoints[tx.origin] > 10000000000);
    _;
  }

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
