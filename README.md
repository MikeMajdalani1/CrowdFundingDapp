# Small Crowdfunding App

Welcome to the Small Crowdfunding App repository coded by me! This application allows users to contribute to a crowdfunding campaign using blockchain technology.

This project is perfect for people learning Web3. You can clone it and use it at your own wish.

## Getting Started

To get started with this project, follow the steps below:

1. Deploy the Smart Contract:

   - You will need a local blockchain environment like Ganache or a testnet such as Ropsten.
   - Deploy the crowdfunding smart contract on your chosen blockchain.
   - Take note of the contract address after deployment.

2. Replace ABI in the Contract Folder:

   - In the `contract` folder, replace the `Crowdfunding.json` file with the ABI (Application Binary Interface) of your deployed smart contract.
   - The ABI is essential for interaction between the frontend and the smart contract.

3. Update the Contract Address:
   - In your project's code, look for a constant named `contractAddress`.
   - Replace the value of `contractAddress` with the actual address of your deployed crowdfunding smart contract.

## Running the Application

Once you've deployed the contract and updated the ABI and contract address, you can run the crowdfunding app locally or deploy it to a web server. Follow these steps to run the application:

1. Install Dependencies:

   - Use npm or yarn to install the project dependencies by running `npm install` or `yarn install` in the project's root directory.

2. Start the Application:
   - Launch the application using `npm start` or `yarn start`.
   - The app should now be accessible at `http://localhost:3000` (by default).

## Features

- Contribute to the existing campaign.
- Track campaign progress and funding goals.

## Contact

If you have any questions or need assistance, feel free to contact me at [mikemajdalani1@gmail.com](mailto:mikemajdalani1@gmail.com).

Happy crowdfunding!
