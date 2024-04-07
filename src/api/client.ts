import { Kitty } from "../types";
import { apiCall, cut0x, Handlers, sign, transformKittyForUi } from "./utils";

export const api = {
  'show-all-kitties': async ()=>{
    return await apiCall('get-all-kitty-list','GET');
  },
  'show-owned-kitties': async (user: string)=>{
    return await apiCall('get-owned-kitty-list', 'GET',
      {'owner_public_key': cut0x(user) })
  },
  'get-kitty': async (dna: string) =>{
    //its either tradable or non-tradable kitty
    const response = await Promise.allSettled([
      apiCall('get-kitty-by-dna', 'GET', {'kitty-dna': cut0x(dna!)}),
      apiCall('get-tradable-kitty-by-dna', 'GET', {'td-kitty-dna': cut0x(dna!)})
    ])
    //return results of successful API call
    const kitty = response.reduce((res, acc)=> {
      if (res.status === 'fulfilled') acc = res;
      return acc;
    })
    return transformKittyForUi(kitty)
  },
  'breed-kitty': async (mom: Kitty['dna'], dad: Kitty['dna'], name: string, user: string)=>{
    //$ curl -X GET -H "Content-Type: application/json" -H "mom-dna: e9243fb13a45a51d221cfca21a1a197aa35a1f0723cae3497fda971c825cb1d6" -H "dad-dna: 9741b6456f4b82bb243adfe5e887de9ce3a70e01d7ab39c0f9f565b24a2b059b" -H "child-kitty-name: jram" -H "owner_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-txn-and-inpututxolist-for-breed-kitty
    const transaction = await apiCall('get-txn-and-inpututxolist-for-breed-kitty', 'GET',{
      'mom-dna': mom,
      'dad-dna': dad,
      'child-kitty-name': name,
      'owner_public_key': user,
    });
    // sign
    // TODO
    const signedTransaction = await sign(transaction);
    //$ curl -X POST
    // -H "Content-Type: application/json"
    // -d '{"signed_transaction": {
    //  "inputs":[{
    //    "output_ref":{
    //      "tx_hash":"0x8f83929cfc36c5ea445787421278f0688a2e7b482e71bd75d5ac7f36028c575b",
    //      "index":0
    //     },
    //     "redeemer":[238, 126, 35, 95, 5, 149, 96, 160, 143, 172, 139, 56, 130, 116, 141, 93, 52, 181, 62, 9, 81, 32, 56, 199, 30, 48, 28, 186, 247, 72, 180, 125, 163, 197, 198, 5, 254, 86, 113, 164, 20, 112, 49, 37, 217, 91, 175, 248, 183, 126, 250, 169, 118, 165, 213, 242, 27, 47, 249, 32, 158, 89, 232, 141]
    //    },{
    //     "output_ref":{
    //      "tx_hash":"0x6bb11e2df46081e9252787342116b0b32be9d3302ca1dac535df85642ba46242",
    //      "index":0
    //     },
    //     "redeemer":[112, 18, 73, 37, 101, 45, 254, 161, 83, 84, 12, 135, 125, 65, 6, 235, 200, 84, 16, 109, 12, 247, 240, 52, 116, 11, 46, 109, 86, 241, 69, 26, 223, 154, 215, 190, 247, 110, 248, 75, 246, 71, 126, 223, 23, 180, 233, 209, 98, 9, 178, 82, 46, 52, 110, 251, 52, 223, 232, 182, 82, 226, 5, 143]
    //    }],
    //    "peeks":[],
    //    "outputs":[{
    //      "payload":{
    //        "data":[0,1,1,0,0,0,0,0,0,0,233,36,63,177,58,69,165,29,34,28,252,162,26,26,25,122,163,90,31,7,35,202,227,73,127,218,151,28,130,92,177,214,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97,109,105,116],
    //        "type_id":[75,105,116,116]
    //       },
    //       "verifier":{
    //        "Sr25519Signature":{
    //          "owner_pubkey":"0xd2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67"
    //        }
    //       }
    //      },{
    //      "payload":{
    //        "data":[1,1,1,0,0,0,0,0,0,0,151,65,182,69,111,75,130,187,36,58,223,229,232,135,222,156,227,167,14,1,215,171,57,192,249,245,101,178,74,43,5,155,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97,109,116,105],
    //        "type_id":[75,105,116,116]},
    //        "verifier":{
    //          "Sr25519Signature":{
    //            "owner_pubkey":"0xd2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67"}
    //           }
    //          },{
    //            "payload":{
    //              "data":[0,0,2,0,0,0,0,0,0,0,191,64,163,127,195,246,227,90,81,218,5,243,219,78,156,51,82,162,4,192,66,249,180,130,64,229,219,239,136,216,243,153,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,106,114,97,109],
    //              "type_id":[75,105,116,116]
    //             },
    //             "verifier":{
    //              "Sr25519Signature":{
    //                "owner_pubkey":"0xd2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67"
    //               }
    //              }
    //             }
    //            ],
    //            "checker":{"FreeKitty":"Breed"}
    //           }
    //          }' \http://localhost:3000/breed-kitty

    return await apiCall('breed-kitty', 'POST',{},{
      'signed_transaction': signedTransaction
    });
  },
  'set-kitty-property': async (kitty: Partial<Kitty>)=>{



    //price
    //$ curl -X GET -H "Content-Type: application/json" -H "kitty-dna: 394bd079207af3e0b1a9b1eb1dc40d5d5694bd1fd904d56b96d6fad0039b1f7c" -H "kitty-new-name: jbbl" -H "owner_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-txn-and-inpututxolist-for-td-kitty-name-update

    //list for sale
    //$ curl -X GET -H "Content-Type: application/json" -H "kitty-dna:
    // 394bd079207af3e0b1a9b1eb1dc40d5d5694bd1fd904d56b96d6fad0039b1f7c" -H "kitty-price: 100" -H "owner_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-txn-and-inpututxolist-for-listkitty-forsale

    //delist for sale
    //$ curl -X GET -H "Content-Type: application/json" -H "kitty-dna:95b951b609a4434b19eb4435dc4fe3eb6f0102ff3448922d933e6edf6b14f6de" -H "owner_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-txn-and-inpututxolist-for-delist-kitty-from-sale
  },
  'set-name': async (kitty: Kitty, key: string) => {
    if (!kitty) return;
    let txHandle: Handlers;
    let updateHandle: Handlers;
    //name
    // tradable and basic kitty have different apis
    if (kitty.forSale){
      //tradable
      txHandle = 'get-txn-and-inpututxolist-for-td-kitty-name-update';
      updateHandle = 'patch-update-td-kitty-name';
    } else {
      //basic
      txHandle = 'get-txn-and-inpututxolist-for-kitty-name-update';
      updateHandle = 'patch-update-kitty-name';
    }
    const transaction = await apiCall(txHandle, 'GET', {
      'kitty-dna': cut0x(kitty.dna!),
      'kitty-new-name': kitty.name,
      'owner_public_key': cut0x(key)
    });
    const signedTransaction = await sign(transaction);
    return await apiCall(updateHandle, 'PATCH', {}, {
      'signed_transaction': signedTransaction
    });
  },
  'buy-kitty': async ()=>{
    //$ curl -X GET -H "Content-Type: application/json" -H "kitty-dna: bc147303f7d0a361ac22a50bf2ca2ec513d926a327ed678827c90d6512feadd6" -H "input-coins: 4d732d8b0d0995151617c5c3beb600dc07a9e1be9fc8e95d9c792be42d65911000000000" -H "output_amount: 200" -H "buyer_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" -H "seller_public_key: fab33c8c12f8df78fa515faa2fcc4bbf7829804a4d187984e13253660a9c1223"http://localhost:3000/get-txn-and-inpututxolist-for-buy-kitty
  },
  'mint-kitty': async (name: string, user: string)=>{
    // should be called on first entry
    // check if this is reentry by checking for kitties?
    return await apiCall('post-create-kitty', 'POST', {}, {
      'name': name,
      'owner_public_key': cut0x(user)
    });
  },
  'get-coins': async (user: string)=>{
    //$ curl -X GET -H "Content-Type: application/json" -H "owner_public_key:
    // d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-owned-coins
    const res = await apiCall('get-owned-coins', 'GET', {'owner_public_key': cut0x(user)})
    if (res.message.toLowerCase().includes('error')){
      throw new Error(res.message);
    }
    return res.coins;
  },
  'mint-coins': async (user: string, amount: number)=>{
    //should be called on first account connect
    return await apiCall('post-mint-coin', 'POST', {}, {'amount': amount, 'owner_public_key': cut0x(user)});
  },
};
