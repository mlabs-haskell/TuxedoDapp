# Testing Guide for Tuxedo dApp

## Prerequisites

Make sure you have Rust, Node.js and Yarn installed on your system.

Build environment used
- Rust: 1.77.2
- Node.js: 22.3.0
- yarn: 1.22.22

## Clone and run the Tuxedo Node

#### Open your terminal.
Run the following command to clone the Tuxedo repo on the `main` branch:
```sh
git clone https://github.com/mlabs-haskell/Tuxedo.git
```

#### Build and Run the Node

Navigate to the cloned Tuxedo repo directory:
```
cd Tuxedo
```

Build the node using Cargo:
```sh
cargo build --release -p node-template
```
Run the node in dev mode:
```sh
./target/release/node-template --dev
```


## Build and run the Webservice:
On a separate terminal, navigate to the `webservice-wallet` folder within the Tuxedo repo:
```sh
cd webservice-wallet
```

Build the webservice using Cargo:
```sh
cargo build
```

Run the webservice:
```sh
cargo run
```

## Running the dApp
Open a new terminal window. Clone the dApp repo:
```sh
git clone https://github.com/mlabs-haskell/TuxedoDapp.git
```

Navigate to the cloned dApp directory:
```sh
cd TuxedoDapp
```
Install the dependencies using Yarn:
```sh
yarn install
```
Start the dApp locally:
```sh
yarn start
```


You should now have the Tuxedo node running in dev mode, the webservice running, and the dApp running locally. You can test out the functionality of the dApp and interact with the Tuxedo blockchain.

#### Testing the dApp functionality
1. Fetch the local keys by running:
    ```sh
    curl --location 'http://localhost:3000/debug-get-keys'
    ```
2. Make a `POST` request to `http://localhost:3000/debug-generate-key` to generate a key in the local keystore in the wallet-cli
    ```sh
    curl --location 'http://localhost:3000/debug-generate-key' \
    --header 'Content-Type: application/json' \
    --data '{
        "password": ""
    }'
    ```
    Sample output:
    ```json
    {"message":"Keys generated successfully","public_key":"4875f18ce60479b935b257b2cfe17a03432f80af93b368f4653f2381fded9674","phrase":"convince defy athlete buyer truly inside inmate pool foil noodle barely supreme"}
    ```
3. Make a request by `debug-get-key` again by running:
    ```sh
    curl --location 'http://localhost:3000/debug-get-keys'
    ```
    Copy over the newly added public key, which will be used for creating the initial kitties.

4. Copy the `phrase` from the output of the command above and import it to Talisman (Settings -> Account -> Add New Account -> Import -> Import via Recovery Phrase -> Polkadot)
5. Access the DApp on `http://localhost:3006/` on Windows to test out the available dapp features. The port can also be customized by modifying the `package.json` file. Make sure that it's running on a different port than `3000`, because the webservice is running on `3000`:
  - Search for kitties
  - Breed a new kitty by specifying male and female parent kitties

    In order to accomplish this, we'll need to manually create the genesis parent kitties by calling the APIs:
    1. Create the male parent, make sure to replace the `owner_public_key` with the public key copied at the previous step (step 3):
    ```sh
    curl --location 'http://localhost:3000/post-create-kitty' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "kit1",
        "owner_public_key": "d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67",
        "gender": "Male"
    }'
    ```
    2. Create the female parent:
    ```sh
    curl --location 'http://localhost:3000/post-create-kitty' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "kit2",
        "owner_public_key": "d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67",
        "gender": "Female"
    }'
    ```
    3. Once the above is done, the `/breed` page should display the parents as dropdowns. Enter a 4 letter kitty name to breed the child kitty. The talisman should open up to sign the transaction if previous steps have succeeded.  
  - Update the name for an existing kitty owned by the wallet
  - Fetching owned kitties under `http://localhost:3006/my-kitties`
  - List the kitty for sale by specifying the listing price
  - Update price for a kitty that is already listed
  - Delist a listed kitty
  - Buy a listed kitty from another wallet by specifying the UXTO input tokens
    In order to test out this functionality, you'll need two keys, one for the seller and one for the buyer. For the seller, you can follow these steps:
      1. Create an initial kitty by calling the API by specifying yourself as the owner. See the command on the breeding section
      2. Go to kitty details, mark a kitty for sale using the radio button entering the price and click on Update
    For the buyer, we'll need to mint some tokens, the process can be as follows:
      1. Generate a new key from the previous steps and add it to Talisman as the "Buyer"
      2. Mint enough coins for the buyer. The `amount` parameter should be more than the kitty price and the `owner_public_key` will need to be fetched by calling `debug-get-key` as done with the seller public key from the previous steps.
          ```sh
          curl --location 'http://localhost:3000/post-mint-coin' \
            --header 'Content-Type: application/json' \
            --data '{
                "owner_public_key": "4050f574baa3c9af13b264560925e98d0750cb428b8f97562225a26a7fecd178",
                "amount": 200
            }'
          ```
      3. Connect to the site as the buyer's wallet through Talisman.
      4. Go to the details page for the kitten that was listed and you should see the option to "Buy"
      5. Once you click on "Buy", you'll be able to select the coin that was minted in step 2.
      6. Select it and click on "Proceed"
      7. Go to kitty details and you will see that you are the owner of the kitty as you have the option to Update and Breed


#### Running wallet cli tests
Run `cargo test` inside the `webservice-wallet` directory. Two tests might fail on the first run due to initial state of the local blockchain, but should succeed on the subsequent runs:
```
    Finished test [unoptimized + debuginfo] target(s) in 0.48s
     Running unittests src/main.rs (/Users/philoniare/mlabs/Tuxedo/target/debug/deps/tuxedo_template_web_service_wallet-2207457bac4dda0f)

running 30 tests
test output_filter::tests::filter_prints ... ok
test output_filter::tests::filter_sr25519_signature_works ... ok
test service_handlers::block_handler::block_service_handler::tests::test_get_block_block_number_not_present_fail ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_create_kitty ... ok
test service_handlers::block_handler::block_service_handler::tests::test_get_block_success ... ok
test service_handlers::block_handler::block_service_handler::tests::test_get_genesis_block_success ... ok
test service_handlers::key_handler::key_service_handler::tests::test_debug_get_keys_success ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_create_kitty_fail_due_unknown_public_key ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_create_kitty_fail_due_inavlid_public_key ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_create_kitty_success ... ok
test service_handlers::key_handler::key_service_handler::tests::test_debug_generate_key_success ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_get_all_kitty_list ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_get_owned_kitty_list ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_get_kitty_by_dna ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_breed_kitty ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_get_txn_and_inpututxolist_for_list_kitty_for_sale_success ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_name_update ... ok
test service_handlers::money_handler::money_servicehandler::tests::test_mint_coin_fail_due_inavlid_public_key ... ok
test service_handlers::money_handler::money_servicehandler::tests::test_mint_coin_fail_due_unknown_public_key ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_list_kitty_for_sale ... ok
test service_handlers::money_handler::money_servicehandler::tests::test_mint_coin_success ... ok
test service_handlers::money_handler::money_servicehandler::tests::test_get_all_coins ... ok
test service_handlers::money_handler::money_servicehandler::tests::test_owned_coins ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_get_all_td_kitty_list ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_get_td_kitty_by_dna ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_get_owned_td_kitty_list ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_delist_kitty_from_sale ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_buy_kitty ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_td_name_update ... ok
test service_handlers::kitty_handler::kitty_service_handler::tests::test_td_price_update ... ok

test result: ok. 30 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 16.85s
```

## Further wallet interactions via CLI (without web interface)

https://github.com/mlabs-haskell/Tuxedo/tree/main/webservice-wallet#readme

## Troubleshooting 

In case of this error 
> Failed to init db: Node reports a different genesis block than wallet.

The issue arises because the web service saves all blocks, including the initial genesis block, in its local storage. Restarting the web service from scratch creates a new genesis block, which then causes a discrepancy. Clearing the local DB solves the issue.

    cd /tmp/tuxedo-wallet/
    rm -rf wallet_database
