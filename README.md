# Tuxedo DApp and wallet integration

### Overview

Unlike traditional account-based systems, UTXO-based systems treat each transaction output as a distinct entity, introducing advantages in parallel processing and state transition simplicity.

The [Tuxedo](https://github.com/Off-Narrative-Labs/Tuxedo) project endeavors to demonstrate the flexibility and interoperability of Polkadot by implementing UTXO as one of its paradigms. MLabs, with expertise in the Cardano ecosystem utilizing UTXO as its core model, sees an opportunity to contribute to Tuxedo's success, address identified issues, and engage in future collaborative activities.

Our goal is to showcase the potential of Polkadot using the UTXO paradigm for the end user, leveraging Tuxedo. The project consists of two stages

## Stage 1: Integration of Talisman Wallet

Integrate a user-friendly web wallet that allows users to manage their UTXOs on the Tuxedo-based Polkadot network

**Functionality**:

1. Feature Parity Between Web-Based and CLI Wallets
The web-based wallet allows to mirror the core functionality of the CLI wallet, offering seamless UTXO synchronization and token handling, ensuring that users have an equivalent experience across both interfaces.
Note: _Feature Parity_ means web-based and command-line interface (CLI) wallets, have the same set of features and functionalities, both versions provide an equivalent or identical user experience by offering the same core capabilities and options.

2. Issues Fix in web-based wallet (<https://github.com/Off-Narrative-Labs/Tuxedo/issues/62>)
The current implementation of a CLI-based wallet allows sending inputs from multiple owners in a single transaction, but it only supports a single recipient for all specified outputs.

3. Browser compatibility:
Web-based wallet ensures compatibility with Chrome, Firefox and Edge.

**Blockchain Integration**:

Web-based wallet to connect with the blockchain node and fetch data.

**Transactions**:

web-based wallet implements transaction creation and signing on the client side.

**Demo web wallet integration**:

The video shows how the Talisman integration works for all the features of the DApp
[![Talisman integration](https://cdn.loom.com/sessions/thumbnails/e1270ecea79a4689aff5732e8acfae14-00001.jpg)](https://cdn.loom.com/sessions/thumbnails/e1270ecea79a4689aff5732e8acfae14-00001.mp4)

## Stage 2: DApp Development

Create a simple decentralized application to demonstrate the viability and maturity of the Tuxedo framework, as required by this opened ticket  "Full Tuxedo App Implementation" <https://github.com/Off-Narrative-Labs/Tuxedo/issues/76>
Showcase the unique features of UTXO-based transactions on Polkadot, emphasizing scalability and robustness.
Address identified gaps and limitations in the current Tuxedo product to enhance overall functionality.
We think that a successful showcase of a DApp is Cryptokitties which is provided in Tuxedo via pieces in "<https://github.com/Off-Narrative-Labs/Tuxedo/tree/main/wardrobe/kitties>".
We want to use this concept and extend the wardrobe codebase by implementing a basic web interface and allowing breeding, trading, searching, and updating the kitty features such as name, price and tradable status of kitties.
This DApp is intended for educational purposes only, and not for production use.

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
We developed a personal dashboard for users to view and manage their NFT-based Kitties collections.
Display detailed information about each NFT, including ownership history and transaction history.
Manage NFT means, it includes below :

1. Viewing NFTs:
   Users can see a comprehensive list or visual representation of all the NFTs (kitties) they own.
   Display detailed information about each NFT, including attributes such as below:
   Name
   parents(mom and dad)
   free_breedings(numbers)
   DNA (H256 Hash value)
   num_breedings(number)
   Tradable(yes or No)
   Price
   Status (Ready for Raring, Tired (only for Dad), Had birth recently(only for Mom)).
2. Trade :
    Users can buy the kitty from other users via the search kitty screen or directly from the Trade Kitty screen by inputting the kitty & owner details.
3. Breed :
    Users can initiate breeding directly from the dashboard.
4. Update :
    Users can update features such as Tradable status, price, and name from the dashboard by clicking on any cell which will navigate to update the kitty screen.
5. Interactivity:
   Make the dashboard interactive, allowing users to click on individual NFTs to access more detailed information or initiate specific actions.

**Tech Stack:**

- React
- TypeScript
- Rust
- Sled (embedded database)
- Axum (web application framework)

**Demo CLI-wallet**:

The videos demonstrate the CLI-wallet functionalities: mint coins, create kitty, update kitty name, list kitty for sale, update tradable kitty price, breed kitty and buy kitty

[![Milestone 2 - CLI-wallet - part 1/3](https://i.ytimg.com/vi/Mom3BV_HozY/hqdefault.jpg)](https://youtu.be/Mom3BV_HozY)

[![Milestone 2 - CLI-wallet - part 2/3](https://i.ytimg.com/vi/GfyiBW1XFW0/hqdefault.jpg)](https://youtu.be/GfyiBW1XFW0)

[![Milestone 2 - CLI-wallet - part 3/3](https://i.ytimg.com/vi/1T2oE0bfaCQ/hqdefault.jpg)](https://youtu.be/1T2oE0bfaCQ)

**DApp Wireframes**

[![Wallet wireframes](https://lh3.googleusercontent.com/d/1dCr5Wwi0L-fGPdwAQGFPDhmTeBQYPDy1=w3692-h1932-iv1)](https://drive.google.com/file/d/1dCr5Wwi0L-fGPdwAQGFPDhmTeBQYPDy1/view?usp=sharing)
