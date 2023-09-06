pragma solidity ^0.8.0;

contract Crowdfunding {
    uint public fundingGoal;         
    uint public amountRaised;      
    bool public fundingGoalReached;  


      // Constructor to set the funding goal in wei
    constructor(uint _fundingGoal) {
        fundingGoal = _fundingGoal * 1 ether; 
    }

    // Function for contributors to add funds to the contract
    function contribute() public payable {
        require(!fundingGoalReached, "Funding goal has already been reached.");
        amountRaised += msg.value;
        if (checkGoalReached()) {
            fundingGoalReached = true;
        }
    }

      // Function to check if the funding goal has been reached
    function checkGoalReached() public view returns (bool) {
      
        return (amountRaised >= fundingGoal);
    }

 // Function to get the total amount raised in wei
    function getFundsRaised() public view returns (uint) {
        return amountRaised;
    }

  // Function to get the funding goal in wei
    function getFundingGoal() public view returns (uint) {
      
        return fundingGoal;
    }
}
