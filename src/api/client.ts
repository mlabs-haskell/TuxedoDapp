import { Kitty, wallet } from "../types";
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
    //const signedTransaction = await sign(transaction);

    // return await apiCall('breed-kitty', 'POST',{},{
    //   'signed_transaction': signedTransaction
    // });
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
  'set-name': async (kitty: Kitty, key: string, accounts: wallet[]) => {
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
    const signedTransaction = await sign(transaction, accounts);
    return await apiCall(updateHandle, 'PATCH', {}, signedTransaction);
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