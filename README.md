# Tuxedo DApp, Extended CLI-wallet and Talisman integration

### Overview

Unlike traditional account-based systems, UTXO-based systems treat each transaction output as a distinct entity, introducing advantages in parallel processing and state transition simplicity.

The [Tuxedo](https://github.com/Off-Narrative-Labs/Tuxedo) project endeavors to demonstrate the flexibility and interoperability of Polkadot by implementing UTXO as one of its paradigms. MLabs, with expertise in the Cardano ecosystem utilizing UTXO as its core model, sees an opportunity to contribute to Tuxedo's success, address identified issues, and engage in future collaborative activities.

Our goal is to showcase the potential of Polkadot using the UTXO paradigm for the end user, leveraging Tuxedo. The project consists of two stages

## Stage 1: Extend the CLI-wallet and integrate Talisman

Extend the original CLI wallet to allow CryptoKitties DApp to run. Integrate Talisman to allow users to manage their UTXOs on the Tuxedo-based DApp.

**Functionality**:

1. Feature parity between Web-Based and CLI wallets
   
The web-based wallet allows core functionality of the CLI wallet, offering seamless UTXO synchronization and token handling, ensuring that users have an equivalent experience across both interfaces.

2. Talisman integration:

The Web-based wallet Talisman integrated to allow the transactions of the DApp.

3. Issues Fix to support transactions to multiple recipients (<https://github.com/Off-Narrative-Labs/Tuxedo/issues/62>)
   
The current implementation of a CLI-based wallet allows sending inputs from multiple owners in a single transaction, but it only supports a single recipient for all specified outputs.


**Blockchain Integration**:

Web-based and CLI wallet to connect with the blockchain node and fetch data.

**Demo Talisman integration**:

The video shows how the Talisman integration works for all the features of the DApp
[![Talisman integration](https://lh3.googleusercontent.com/fife/ALs6j_H0alrnYohHiTA8-ba66gKTIanTJEIpqpG3a_BypxrYF4x9RqyuEOPPNMFG2klmzx_XO41vzLjZozlEl-c6JSINV3tselBbCUq80lasnGIvlRQoHvv1btt7w2VJ5X3MpjKZvbTooqm-AjNfBnAOy8iNXOOKsfRVjoRAoTHrDQ1P6d7gHvo9lQk8Yxui-8LYIt4qr-IEgzD4GPxMkP--8AAuLqgn3I0uQxRxcYq5VaO1wmW9_6wU8E2Vw2xv95uipUoG4Jiw1UPosWKFExrBCdO1D_pAwknRpS5KXAuJl3zbmgbkiEZ4Z77eO-fwSqjC-YA_MWWYWj4ubG6avZQG3Jt4d-TNIrLKRXjj-o-eOR3D0HDuMgHSofDnLCs6PnvQ0MyGuYjW4aw96TD7GVrLclseyzgvR5NbFSdF8Vp9woxc2Ve8Tyx-cZJgEy6AhIW2Zn-588nFm3PXus4zgI-D41SbFgH8-iRiGsYUlUS1tlxbIELvMBznqVSQSpOJIeFidhwnnP12EC5qkK9RjTmhEbTlmEI6AhpiXwkX6zUv_awLSN58lKJmFDhozhx1HEvtKhdg_B9t6exLhGeB7LbU9KvueWIgxXC5Ey7Ijn-DvjyRf78Rp35pAb_n9Ucelz4cgXffawjo4D4B76wAT6fV-ILjfvsPN1JTAf_vJu9-LjLf-OqjUpuYbYBK1Ve7Yo1c1jfNimGTZFhYihLx62LK6dnf_PT-Nn_pucGCUgjbMDuZkEccjhDhjxwM6wz0Uj8mVQ_OE4UNv-vm1QqkNSSDw5tgRxI7v-_XSSPLGc1LoC0WanUI9LswnW2SovLw0nmJqMngCYUdOjSFLrTunEP80mZVpVhjjJeBsE-nIEUwCDMgs49YwSgwRn3RZoF10_lnpNwj3dP0uA7OCi8SdAeNzbk1btpZoI7hWwQ09ugejTJ46HMDd91FFxHWguxWY7YPTQmbcNk1ZOG0I5bB0A9pzGrJXnDj4OgonDxnsvtvsar8FhkE8YZkVUF5eWHw-llYnJFF9EE_D9OdtzZtQYd3QOLfksEwdCW4p_PBAltns3GPrL7Uuhqe-JsImwSS_vv2xssdL4TjosEQgHRSlw2c6bpeUJ9fU0xewnqaZJxy0m6J22AkQfBaanld9dZjtMVnV7XR4kmEzqqxxfVeqhWdrnY9azZKl46TP8DQRb_iCa0qVVY9GlUTC7slbAc0yCbcqzbwtk-jbLOfvy1FElL0htffkxOia5V8iJ5xY6U50ILipEHWqk3arZkwIhiY89xa1Q2zZvgMEW1MyGl25BByo1wUMRwMXJc6Q0OjRcOFWOC-png_Moa8W2joTxAfOLxiX6uqo21SNaZVO5TuRcK_LeyXW1H1QB2lJ3mzQU_NEA_6MVoWKsrmV7sfYu8pyGdH77FPge7w5Bk7W11wihECRVX-BMeCXor-inldO5UaaIlDglzsDyPhcLH0AohVxNJ1PPFUXverO70p5mm8U3m-u1qK4E63_Wjt3uejOr2XP5zh_IZzYCiH6vkGyRFdu2AN06rXBBMqbU-Dd_648D1VN-eU_0zhdv7rZ6yIYucguK8nkyzk-syV6b4xsWFJrNCT0YyFkDGvuTc)](https://www.loom.com/share/e1270ecea79a4689aff5732e8acfae14)

**Extended CLI-wallet for tradable kitties**

<https://github.com/mlabs-haskell/Tuxedo/blob/main/wallet/src/kitty.rs>

**Demo CLI-wallet**:

The videos demonstrate the CLI-wallet functionalities: mint coins, create kitty, update kitty name, list kitty for sale, update tradable kitty price, breed kitty and buy kitty

[![CLI-wallet - Demo part 1/3](https://i.ytimg.com/vi/Mom3BV_HozY/hqdefault.jpg)](https://youtu.be/Mom3BV_HozY)

[![CLI-wallet - Demo part 2/3](https://i.ytimg.com/vi/GfyiBW1XFW0/hqdefault.jpg)](https://youtu.be/GfyiBW1XFW0)

[![CLI-wallet - Demo part 3/3](https://i.ytimg.com/vi/1T2oE0bfaCQ/hqdefault.jpg)](https://youtu.be/1T2oE0bfaCQ)


## Stage 2: Developing a basic CryptoKitties DApp

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
Tuxedo Runtime pieces (wardrobe/kitties ):
We need Leverage Tuxedo runtime pieces for implementing specific DApp functionalities in the UTXO model, with a focus on NFTs, if some modification is required or if some new functionality is required we may need to customize runtime logic to suit the requirements of the UTXO-based DApp.
For this scope, we plan to modify the kitties' pieces code to support below features:

1. Generating the kitty without the parent when the user inserts the new key in the wallet (basically, 1 kitty is provided for free as an onboarding process)
2. Implementing the Trading of kitties between users
3. Searching kitties owned by other users
4. Adding/Updating more details of kitties such as Gender, Tradable status, Price, and Name.

**Transaction Handling**:
DApp implements transaction handling logic in the web application to initiate UTXO-based transactions, including NFT-related transactions, on the Tuxedo blockchain.
Provide feedback to users on transaction status and confirmations.

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

- React Framework (React + Redux + React Router)
- TypeScript 
- Babel (for backward compatibility in older browsers)
- Jest (JavaScript Testing Framework)
- Rust
- Axum (Rust Web Application Framework)
- Sled (embedded database)

**Demo DApp**

The video shows how to breed and trade kitties, together with all the functionalities of the DApp

[![Tuxedo DApp](https://lh3.googleusercontent.com/fife/ALs6j_GRmMkT9yNmSG5kaKdLa88zqK-5hgYvSEMCOB-qN6slEOY1qXpEWqLifkCz0ThIf80vyvjoyjnXPSUvl0BY7utO7FRYMrRaas-Y6OupQIeazbqZ7W76UVmJvU6297uHThvMl945BKMQwVykOHmBTsmmDl_GqWwbZ5QjW0vO_z2GOerml4430DuW5kG81SYqlx8GGGaoxwPNfbx38nYQWzyF2NCSt4ENSZNWFQySwo_cMnpzJcoGHkwxe3GCAdfv4SA018CtU3RghwVq0JT8-CcRwZyfiPpkiQeNH1R7w8TkHbxpWZchDryCY3zITeXsEP8Q9GO5ye-egi-TadAelazLI4dRvqz64X8WuNstZO1vTCMTGYMKo-rRSzdgp19bx8woQmVZz1FvClTCAdO1gp_mxYRmkBNSX6jOHB8tWiHNSvVAqYGkhQ0eLedbaOnyW6v_uBsBp7q33dx1MCQi3aJnVoXLBmV18dwRdU70VUQMrhPfTdeFA61YZ4Hh3cZ6akm3Gn8vuRWn7Kco0sLb_4fRwMfqH4cB8vyNttsovr0mAS_tgWEl6chdut4i0IlWjQYh_Mqj-l3qOn1A-ftb6gHxlVVzJAXAkg8I1NFkEsBZ9m04K5tKWXsWADtHAEU8r6fAXicBCOaXLca50oODHkvVBMQ5H-ow2x3tuwt0IxzufmOU2Ydm9RSjh9wmUluPnt3eKotfwKzWdPR1l-IivomYKOtTCS7ih7cddDpXd6P3_71OegKmwrrpwXYm-yj1Nhb5raDwj4wF2h2V12KmqTmgBxIZtWBKD23rfj8Pf8XVHaN-vGuBvt-RUnrx2M0dWxD8wzUZUnjRpZAqSsHfsrNHHlTr2JyTGhifukbaoloTzRcvR_2DwbdjslcHZlSmRm_G-R_84R9JgOuU12lJoOf-H6qaok6SYcle9xcEudzVoG3U0YiyFhdJzJz7fPQ76nYCzaTa_P8aZT9UGdr6YzsnLypOzYS_3kqAZJGfyiqgj101ylxAvXSE4IS0_NlymVY50Vt4au4PmPFz_CbAYObMVScW9wsplamggFmf2hdUXexNBihurRJNmwXxtF2OE607OF7l-9ZNh2bVrBtFC5czoPeXYHCISG8ghI-eR1AhqZEJ-dQwiz25OvZutSqYwXyBRo0ysxXekcgqarKN6HX5hmrdJlFrcwWWVdYNknhC6q-llw8hAmuvHS7g_-bwQqVL1vE0z7-vpEmC2Mt3q-sXzHC5WOviI2VLWjstGTTSxdv-9IvmTyLU24pSFw86J5-AaVczcLVcPrZaOCYcyE6Au307bNdeqEkSTYxkEA2D0QcYjIzrNmJR2rrwnb2Vn259aORlb1rcNGm2-_pglwkmU4k5rTF2bhXrvYNmDrFsL-EL3Zu54MTJ_FqTSYdoA5gb4YybwVDItBExUJX-Ze4hM5CzvlHE6XQrPTmLD0DXwMzjW7KWEj7UGL54EEDH4Vt1e2DBTfxum8qCglZc9BBXK63IovusDVGzYXPMZvqDbN2gKYJ2GjlbNrpIU-pgg9JMtWJyTwmjy1NRhjhQFrAQuR5CNYcXETpip0-a4mIvpYMJSyF_By70rbtbaQ7Vy2URBbK-kRrd=w1802-h1097)](https://www.loom.com/share/4445b97dddd8447c8ccafa3b9cea6bb6)


**DApp Wireframes**

[![Wallet wireframes](https://lh3.googleusercontent.com/d/1dCr5Wwi0L-fGPdwAQGFPDhmTeBQYPDy1=w3692-h1932-iv1)](https://drive.google.com/file/d/1dCr5Wwi0L-fGPdwAQGFPDhmTeBQYPDy1/view?usp=sharing)


**Further documentation**

[Testing guide](https://github.com/mlabs-haskell/TuxedoDapp/blob/master/Testing_Guide.md), [Build and run the DApp](https://github.com/mlabs-haskell/TuxedoDapp/wiki/Build-and-run-the-project), [DApp specification](https://github.com/mlabs-haskell/TuxedoDapp/wiki/DApp-specification), [APIs spreadsheet](https://github.com/mlabs-haskell/TuxedoDapp/wiki/APIs-spreadsheet), [Swagger APIs documentation](https://github.com/mlabs-haskell/TuxedoDapp/blob/master/openapi.yaml), [Frontend development libs](https://github.com/mlabs-haskell/TuxedoDapp/wiki/Frontend-development-libs), [Game design](https://github.com/mlabs-haskell/TuxedoDapp/wiki/Game-design), [Talisman wallet](https://github.com/mlabs-haskell/TuxedoDapp/wiki/Talisman-wallet), [Wireframes](https://github.com/mlabs-haskell/TuxedoDapp/wiki/Wireframes) 


**Comparative analysis**

[CryptoKitties Development: A comparative analysis between EVM - Cardano - Tuxedo/Polkadot](https://docs.google.com/document/d/1kdYA9Jd100p91t9okjYncLZw_Qn6guo2Bm032mko3DU)


**Additional extra work and experiments**

- Mint_coin: <https://github.com/Off-Narrative-Labs/Tuxedo/commit/80e7b5720a384907cef89e091034fff3fe0f2b7f>
- Metadata analysis and design/experiments: <https://github.com/Off-Narrative-Labs/Tuxedo/issues/30#issuecomment-1920539885>
