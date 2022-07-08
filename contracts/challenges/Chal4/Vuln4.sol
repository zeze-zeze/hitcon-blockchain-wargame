// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface Homework {
  function plus(uint, uint) external returns (uint);
  function minus(uint, uint) external returns (uint);
}


contract Vuln4 {
  /*************************
  **    MAIN VARIABLE     **
  *************************/
  mapping (address => bool) solverToSubmitted;

  /*************************
  **    HELPER SECTION    **
  *************************/
  modifier winCondition() {
    require(solverToSubmitted[tx.origin]);
    _;
  }

  /*************************
  **     USERS SECTION    **
  *************************/
  function submit() public {
    Homework homework = Homework(msg.sender);
    require(homework.plus(15434, 23456543) ==  15434 + 23456543);
    require(homework.plus(987654356, 765456) ==  987654356 + 765456);
    require(homework.plus(7230987, 45654) ==  7230987 + 45654);
    require(homework.minus(987654345678, 8765456) ==  987654345678 - 8765456);
    require(homework.minus(12345, 6789) ==  12345 - 6789);
    require(homework.minus(98765432, 8765432) ==  98765432 - 8765432);

    solverToSubmitted[tx.origin] = true;
  }
}
