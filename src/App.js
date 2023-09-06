import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import CrowdfundingABI from "./contract/CrowdfundingABI.json";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [amountToDonate, setamountToDonate] = useState(null);
  const [amountRaised, setAmountRaised] = useState(0);
  const [fundingGoal, setFundingGoal] = useState(0);
  const [flag, setFlag] = useState(0);
  const [goalReached, setgoalReached] = useState(false);
  const [error, setError] = useState("");
  const [crowdfundingContract, setCrowdfundingContract] = useState(null);
  const contractAddress = "0x83C402d9b1a45326AC5dE5f63C91cd3ec7e2C42b"; //replace this variable once you deploy the contract, don't forget also to update the ABI file in /contract

  //this useEffect fecthes values from the smart contract
  useEffect(() => {
    async function fetchData() {
      if (crowdfundingContract) {
        try {
          const [amountRaised, fundingGoal, goalReached] = await Promise.all([
            crowdfundingContract.methods.getFundsRaised().call(),
            crowdfundingContract.methods.getFundingGoal().call(),
            crowdfundingContract.methods.checkGoalReached().call(),
          ]);

          setAmountRaised(weiToEth(amountRaised));
          setFundingGoal(weiToEth(fundingGoal));
          setGoalReached(goalReached);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, [crowdfundingContract, flag]);

  //this function handles input change
  function handleInputChange(event) {
    setamountToDonate(event.target.value);
  }

  //this function is used to convert WEI values to ETH
  function weiToEth(weiAmount) {
    return web3.utils.fromWei(weiAmount, "ether");
  }

  //this function contributes the amount of ETH selected and interacts with the smart contract
  async function contribute() {
    if (!web3) {
      setError("Please setup web3");
    } else if (amountToDonate === 0 || amountToDonate < 0) {
      setError("Please enter a valid amount");
    } else if (amountToDonate < 0.1) {
      setError("The minimum donation should be 0.1 ETH");
    } else if (amountToDonate > fundingGoal - amountRaised) {
      setError(
        "You can't donate more than the fund goal of this campaign, but thanks for your generosity!"
      );
    } else {
      const amountToDonateInWei = web3.utils.toWei(
        amountToDonate.toString(),
        "ether"
      );

      try {
        const accounts = await web3.eth.getAccounts();

        const gas = await crowdfundingContract.methods
          .contribute()
          .estimateGas({ from: accounts[0], value: amountToDonateInWei });
        const result = await crowdfundingContract.methods
          .contribute()
          .send({ from: accounts[0], value: amountToDonateInWei, gas });
        setFlag(flag + 1);

        setError("");
      } catch (error) {
        console.error(error);
      }
    }
  }

  //this function is used to connect Metamask to the app
  async function connectToMetamask() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const crowdfundingContract = new web3.eth.Contract(
          CrowdfundingABI,
          contractAddress
        );
        setCrowdfundingContract(crowdfundingContract);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("No Ethereum interface detected. Please install Metamask");
    }
  }

  return (
    <div className="app-container">
      <div className="app-header-text">
        <h1>Support the cause</h1>
        <p>
          Here you can find all campaigns you can donate ETH to, even a small
          amount would make a big impact ❤️
        </p>
        {account && (
          <p>
            Connected account: <b> {account}</b>
          </p>
        )}
      </div>

      <div className="card">
        <img src="animals.jfif" alt="animals" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">Donate to save animals in Beirut</h5>
          {account ? (
            <p style={{ fontSize: "20px" }}>
              {" "}
              <b>{amountRaised} ETH</b> out of <b> {fundingGoal} ETH </b>
              collected
            </p>
          ) : (
            <p style={{ fontSize: "20px" }}>
              {" "}
              <b>This campaign needs 10 ETH to be completed </b>
            </p>
          )}
          <p className="card-text">
            Animals in need of support require donations to provide them with
            the care and attention they deserve. These animals may be rescued
            from abuse or neglect, suffering from medical conditions, or in need
            of shelter, food, and rehabilitation. Donations provide critical
            resources to help provide medical care, shelter, and sustenance for
            these animals, giving them a chance at a better life. Your support
            can make a difference in their well-being and help them find loving
            forever homes.
          </p>
          <div className="card-donations">
            {!goalReached && (
              <input
                value={amountToDonate}
                onChange={handleInputChange}
                type="number"
                placeholder="ETH Amount"
                max={fundingGoal - amountRaised}
                min={0.1}
              />
            )}
            {error !== "" && <p className="card-error"> {error}</p>}
            {account ? (
              goalReached ? (
                <h3>GOAL REACHED, Thank you!</h3>
              ) : (
                <button onClick={contribute}>Donate</button>
              )
            ) : (
              <button onClick={connectToMetamask}>Connect to wallet</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
