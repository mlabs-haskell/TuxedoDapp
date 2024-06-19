# Testing Guide for Tuxedo dApp
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

**Note**: Make sure you have Rust, Node.js, and Yarn installed on your system before proceeding with the setup.

Build environment used to run the tests:
- Rust: 1.77.2
- Node.js: 22.3.0
- yarn: 1.22.22

#### Testing the dApp functionality
1. Make a `POST` request to `http://localhost:3000/debug-generate-key` to generate a key in the local keystore in the wallet-cli
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
2. Copy the `phrase` from the output of the command above and import it to Talisman (Settings -> Account -> Add New Account -> Import -> Import via Recovery Phrase -> Polkadot)
3. Access the DApp on `http://localhost:3006/` to test out the dapp features that are available:
  - Search for kitties
  - Breed a new kitty by specifying male and female parent kitties
  - Update the name for an existing kitty owned by the wallet
  - Fetching owned kitties under `http://localhost:3006/my-kitties`
  - List the kitty for sale by specifying the listing price
  - Update price for a kitty that is already listed
  - Delist a listed kitty
  - Buy a listed kitty from another wallet by specifying the UXTO input tokens

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
