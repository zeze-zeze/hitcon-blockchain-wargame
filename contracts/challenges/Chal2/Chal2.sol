//SPSPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Vuln2.sol";

interface CheckSolvedInterface {
    function chal2Solved(address _solver) external;
}

/// @title Challenge two
/// @author Albert
contract Chal2 is Ownable, Vuln2 {
    /*************************
     **    MAIN VARIABLE     **
     *************************/
    CheckSolvedInterface checkSolvedContract;
    address[] public solvers;
    mapping(address => bool) public addressToSolved;

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
        if (addressToSolved[tx.origin]) {
            emit hadSolved(tx.origin);
            return;
        }
        addressToSolved[tx.origin] = true;
        solvers.push(tx.origin);
        checkSolvedContract.chal2Solved(tx.origin);
        emit newSolved(tx.origin);
    }

    /// @notice Get how many addresses have solved the challenge.
    function statistics() public view returns (uint256) {
        return solvers.length;
    }

    /// @notice Set the CheckSolved contract address by owner.
    function setCheckSolvedContractAddress(address _address)
        external
        onlyOwner
    {
        checkSolvedContract = CheckSolvedInterface(_address);
    }
}
