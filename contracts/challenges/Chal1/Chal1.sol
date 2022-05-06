//SPSPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Vuln1.sol";

interface CheckSolvedInterface {
  function chal1Solved (address _solver) external;
}

/// @title Challenge one
/// @author zeze
contract Chal1 is Ownable, Vuln1 {
  /*************************
  **    MAIN VARIABLE     **
  *************************/
  CheckSolvedInterface checkSolvedContract;
  address[] public solvers;

  constructor(address _checkSolvedAddress) {
    checkSolvedContract = CheckSolvedInterface(_checkSolvedAddress);
  }

  /*************************
  **    HELPER SECTION    **
  *************************/
  event newSolved(address indexed _solver);
  event hadSolved(address indexed _solver);
  
  /*************************
  **     USERS SECTION    **
  *************************/
  /// @notice Check if the challenge is solved by the address.
  /// @dev The address which had solved the challenge before would return.
  function win() public winCondition {
    for (uint i = 0; i < solvers.length; i++) {
      if (solvers[i] == tx.origin) {
        emit hadSolved(tx.origin);
        return;
      }
    }
    solvers.push(tx.origin);
    checkSolvedContract.chal1Solved(tx.origin);
    emit newSolved(tx.origin);
  }

  /// @notice Get how many addresses have solved the challenge.
  function statistics() public view returns (uint) {
    return solvers.length;
  }

  /// @notice Set the CheckSolved contract address by owner.
  function setCheckSolvedContractAddress(address _address) external onlyOwner {
    checkSolvedContract = CheckSolvedInterface(_address);
  }
}
