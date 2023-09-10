//SPSPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Hitcon Ether Faucet
/// @author hklin
/// @notice You can use this contract for a basic faucet
/// @dev Most function should be called by server side address
contract HitconFaucet is Ownable {

    /*************************
    **    MAIN VARIABLE     **
    *************************/

    uint256 immutable public amount; // Convert to Wei
    mapping (address => bool) public addressGiven; // record requested address

    constructor(uint256 _amount) {
        require(_amount > 0, "Should be > 0 Wei");
        amount = _amount;
    }

    /*************************
    **    HELPER SECTION    **
    *************************/

    event Transfer(address _from, address _to, uint256 _amount);
    event GetEther(address _from, uint256 _amount);

    modifier allowRequest(address _addr) {
        require(!addressGiven[_addr], "Already requested Ether");
        _;
    }

    /*************************
    **     USERS SECTION    **
    *************************/

    /// @notice This transfer function with one params send fixed amount of ethers
    /// @dev The amount send is initialized at contract deployment
    function transfer(address _addr) external onlyOwner allowRequest(_addr) {
        uint256 balance = address(this).balance;
        require(balance >= amount, "Not enough Ether");

        addressGiven[_addr] = true;
        payable(_addr).transfer(amount);
        emit Transfer(address(this), _addr, amount);
    }

    /// @notice This transfer function send specific amount of ethers to _addr
    /// @dev The amount send should be pass to the function as second params
    function transfer(address _addr, uint256 _amount) external onlyOwner allowRequest(_addr) {
        uint256 balance = address(this).balance;
        require(balance >= _amount, "Not enough Ether");

        addressGiven[_addr] = true;
        payable(_addr).transfer(_amount);
        emit Transfer(address(this), _addr, _amount);
    }

    /// @notice Allow deposit ethers to the faucet by everyone
    function getEther() external payable {
        emit GetEther(msg.sender, msg.value);
    }

    /// @notice Allow withdraw ethers left in the faucet
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}