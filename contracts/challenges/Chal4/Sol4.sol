pragma solidity ^0.8.0;

interface Vuln4 {
  function submit() external;
}

contract Sol4 {
  function plus(uint a, uint b) public pure returns (uint) {
    return a + b;
  }
  
  function minus(uint a, uint b) public pure returns (uint) {
    return a - b;
  }

  function submit(address _address) public {
    Vuln4(_address).submit();
  }
}

