# Tuxedo DApp and wallet integration 

### Overview

Unlike traditional account-based systems, UTXO-based systems treat each transaction output as a distinct entity, introducing advantages in parallel processing and state transition simplicity. 
The Tuxedo project endeavours to demonstrate the flexibility and interoperability of Polkadot by implementing UTXO as one of its paradigms. MLabs, with expertise in the Cardano ecosystem utilizing UTXO as its core model, sees an opportunity to contribute to Tuxedo's success, address identified issues, and engage in future collaborative activities.

Our goal is to showcase the potential of Polkadot using the UTXO paradigm for the end user, leveraging Tuxedo. The project will consist of two key stages:

- Stage 1: Developing a simple Web Wallet
- Stage 2: Developing a basic DApp

### Project Details

- Stage 1: Developing a simple Web Wallet

Develop a user-friendly web wallet that allows users to manage their UTXOs on the Tuxedo-based Polkadot network which is similar to polkadot.js which will get the chain info(genesisHash, runtime metadata, chain runtime version, API version), block info
Focus on simplicity, security, and ease of use to provide a seamless experience for users interacting with UTXOs.

**Technical Requirements**
 
**Security:** : Private key storage:
The web-based wallet will provide a secure method for private key storage on the client side, such as a browser's secure storage or hardware wallets.

**Functionality**: 
1. Feature Parity Between Web-Based and CLI Wallets
The web-based wallet will be designed to mirror the core functionality of the CLI wallet, offering seamless UTXO synchronization and token handling, ensuring that users have an equivalent experience across both interfaces
Note: _Feature Parity_ means Means web-based and command-line interface (CLI) wallets, have the same set of features and functionalities, both versions provide an equivalent or identical user experience by offering the same core capabilities and options.

2. Issues Fix in web-based wallet (https://github.com/Off-Narrative-Labs/Tuxedo/issues/62)
The current implementation of a CLI-based wallet allows sending inputs from multiple owners in a single transaction, but it only supports a single recipient for all specified outputs.

3. Browser compatibility:
Web-based wallet will ensure compatibility with Chrome, Firefox and Edge.

**Blockchain Integration**:
Web-based wallet will connect to the blockchain node to fetch relevant data.
We will check if there is any lib such as the one used by "https://polkadot.js.org/" to interact with the Tuxedo-based blockchain for easy integration.

**Transactions**:
web-based wallet will implement transaction creation and signing on the client side.
We will consider using libraries that support the specific blockchain's transaction format for Tuxedo with UTXO instead of accounts.

**Local Database**:
web-based wallet will consider using databases for storing non-sensitive user data.
Local database (e.g., IndexedDB, WebSQL, or a lightweight client-side database) to store relevant wallet data locally on the user's device.

**Tech Stack**:
- polkadot{.js} trying to re-use it if possible
- React Framework(React + Redux + React Router) OR Vue Framework (Vue.js with Vuex and the Vue Router)
- TypeScript
- webpack
- Babel for backward compatibility in older Browsers
- IndexedDB for Local database
- Jest as JavaScript testing framework

Wallet Wireframes: [![Wallet wireframes](https://lh3.googleusercontent.com/d/1nzE2_uqK5V4IwUJJPb92Q_WJk3RDR9UL=-h1932-iv2)](https://drive.google.com/file/d/1nzE2_uqK5V4IwUJJPb92Q_WJk3RDR9UL/view?usp=sharing)

- Stage 2: DApp Development

Create a simple decentralized application to demonstrate the viability and maturity of the Tuxedo framework, as required by this opened ticket  "Full Tuxedo App Implementation" https://github.com/Off-Narrative-Labs/Tuxedo/issues/76
Showcase the unique features of UTXO-based transactions on Polkadot, emphasizing scalability and robustness.
Address identified gaps and limitations in the current Tuxedo product to enhance overall functionality.
We think that a successful showcase of a DApp is Cryptokitties which is provided in Tuxedo via pieces in "https://github.com/Off-Narrative-Labs/Tuxedo/tree/main/wardrobe/kitties".
We want to use this concept and extend the wardrobe codebase by implementing a basic web interface and allowing breeding, trading, searching, and updating the kitty features such as name, price and tradable status of kitties.
This DApp is intended for educational purposes only, and not for production use. The web wallet previously developed will be used for this DApp.

**Technical Requirements**

**Functionality**:
Kitties Creation with NFTs:
Represent each kitty as a unique NFT on the Tuxedo blockchain.
Use Tuxedo runtime pieces i.e. kitties to handle NFT-based kitties creation transactions.

**Breeding and NFT Ownership**:
DApp ensures NFT ownership is transferred correctly during breeding transactions.
Leverage NFT attributes to determine genetics and other breeding-related factors.

**Trading of kitties between users**:
DApp ensures Kitties can be traded between the users.
Ensure ownership is transferred successfully once trading is completed.

**Updating the kitty details**:
DApp ensures Kittie's details such as name, tradable status(Yes or No) and Price can be updated.

**Search kitties owned by other users**:
DApp helps search the kitties other users own based on the user's public key.
This displays the list of kitties owned by other users with all details required for trading such as Gender, Tradable status, Price, Parents, etc.

**Blockchain Integration**:
Tuxedo Runtime pieces.(wardrobe/kitties ):
We need Leverage Tuxedo runtime pieces for implementing specific DApp functionalities in the UTXO model, with a focus on NFTs, if some modification is required or if some new functionality is required we may need to customize runtime logic to suit the requirements of the UTXO-based DApp.
For this scope, we plan to modify the kitties' pieces code to support below features:

1. Generating the kitty without the parent when the user inserts the new key in the wallet (basically, 1 kitty is provided for free as an onboarding process)
2. Implementing the Trading of kitties between users
3. Searching kitties owned by other users
4. Adding/Updating more details of kitties such as Gender, Tradable status, Price, and Name.

**Transaction Handling**:
DApp implements transaction handling logic in the web application to initiate UTXO-based transactions, including NFT-related transactions, on the Tuxedo blockchain.
Provide feedback to users on transaction status and confirmations.

**Transaction Confirmation**:
DApp implements a transaction confirmation mechanism to ensure that users are informed about the progress and finalization of UTXO and NFT-based transactions such as Trade and Breed.

**Personal Dashboard**:
We will develop a personal dashboard for users to view and manage their NFT-based Kitties collections.
Display detailed information about each NFT, including ownership history and transaction history.
Manage NFT means, it includes below :

1. Viewing NFTs:
   Users should be able to see a comprehensive list or visual representation of all the NFTs (kitties) they own.
   Display detailed information about each NFT, including attributes such as below :
   Name
   parents(mom and dad)
   free_breedings(numbers)
   dna(H256 Hash value)
   num_breedings(number)
   Tradable(yes or No)
   Price
   Status (Ready for Raring, Tired (only for Dad), Had birth recently(only for Mom)).
2. Trade :
    Users should be able to buy the kitty from other users via the search kitty screen or directly from the Trade Kitty screen by inputting the kitty & owner details.
3. Breed :
    Users should be able to initiate breeding directly from the dashboard.
4. Update :
    Users should be able to update features such as Tradable status, price, and name from the dashboard by clicking on any cell which will navigate to update the kitty screen.
5. Interactivity:
   Make the dashboard interactive, allowing users to click on individual NFTs to access more detailed information or initiate specific actions.

**Tech Stack:**
- Polkadot-JS APIs for getting block data 
- React Framework(React + Redux + React Router) OR Vue Framework (Vue.js with Vuex and the Vue Router)
- TypeScript 
- Babel for backward compatibility in older Browsers 
- IndexedDB for Local database
- IPFS for storing metadata related to the kitty such as Name, Trade status, Price, etc.
- Jest as JavaScript testing framework

DApp Wireframes: [![Wallet wireframes](https://lh3.googleusercontent.com/d/1dCr5Wwi0L-fGPdwAQGFPDhmTeBQYPDy1=w3692-h1932-iv1)](https://drive.google.com/file/d/1dCr5Wwi0L-fGPdwAQGFPDhmTeBQYPDy1/view?usp=sharing)

