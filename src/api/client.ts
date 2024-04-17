import { Kitty, wallet } from "../types";
import { apiCall, cut0x, Handlers, sign, transformKittyForUi } from "./utils";

export const api = {
  "show-all-kitties": async () => {
    const basicKitties = await apiCall("get-all-kitty-list", "GET");

    const tradableKitties = await apiCall("get-all-tradable-kitty-list", "GET");
    const kittyList = tradableKitties["td_kitty_list"] || [];
    const kittiesToAdd = kittyList.map((tdKitty: any) => ({
      kitty: {
        ...tdKitty["td_kitty"]["kitty_basic_data"],
        price: tdKitty["td_kitty"]["price"],
      },
      owner_pub_key: tdKitty["owner_pub_key"],
    }));

    return {
      ...basicKitties,
      owner_kitty_list: [...basicKitties.owner_kitty_list, ...kittiesToAdd],
    };
  },
  "show-owned-kitties": async (user: string) => {
    const ownedKitties = await apiCall("get-owned-kitty-list", "GET", {
      owner_public_key: cut0x(user),
    });
    return {
      owner_kitty_list: ownedKitties["kitty_list"].map((kittyData: any) => ({
        kitty: kittyData,
        owner_pub_key: cut0x(user),
      })),
    };
  },
  "get-kitty": async (dna: string) => {
    //its either tradable or non-tradable kitty
    const response = await Promise.allSettled([
      apiCall("get-kitty-by-dna", "GET", { "kitty-dna": cut0x(dna!) }),
      apiCall("get-tradable-kitty-by-dna", "GET", {
        "td-kitty-dna": cut0x(dna!),
      }),
    ]);
    //return results of successful API call
    const kitty = response.reduce((res, acc) => {
      if (res.status === "fulfilled") acc = res;
      return acc;
    });
    return transformKittyForUi(kitty);
  },
  "breed-kitty": async (
    mom: Kitty["dna"],
    dad: Kitty["dna"],
    name: string,
    user: string,
  ) => {
    //$ curl -X GET -H "Content-Type: application/json" -H "mom-dna: e9243fb13a45a51d221cfca21a1a197aa35a1f0723cae3497fda971c825cb1d6" -H "dad-dna: 9741b6456f4b82bb243adfe5e887de9ce3a70e01d7ab39c0f9f565b24a2b059b" -H "child-kitty-name: jram" -H "owner_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-txn-and-inpututxolist-for-breed-kitty
    const transaction = await apiCall(
      "get-txn-and-inpututxolist-for-breed-kitty",
      "GET",
      {
        "mom-dna": mom,
        "dad-dna": dad,
        "child-kitty-name": name,
        owner_public_key: user,
      },
    );
    // sign
    // TODO
    //const signedTransaction = await sign(transaction);

    // return await apiCall('breed-kitty', 'POST',{},{
    //   'signed_transaction': signedTransaction
    // });
  },
  "set-kitty-property": async (kitty: Partial<Kitty>) => {
    //price
    //$ curl -X GET -H "Content-Type: application/json" -H "kitty-dna: 394bd079207af3e0b1a9b1eb1dc40d5d5694bd1fd904d56b96d6fad0039b1f7c" -H "kitty-new-name: jbbl" -H "owner_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-txn-and-inpututxolist-for-td-kitty-name-update
    //list for sale
    //$ curl -X GET -H "Content-Type: application/json" -H "kitty-dna:
    // 394bd079207af3e0b1a9b1eb1dc40d5d5694bd1fd904d56b96d6fad0039b1f7c" -H "kitty-price: 100" -H "owner_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-txn-and-inpututxolist-for-listkitty-forsale
    //delist for sale
    //$ curl -X GET -H "Content-Type: application/json" -H "kitty-dna:95b951b609a4434b19eb4435dc4fe3eb6f0102ff3448922d933e6edf6b14f6de" -H "owner_public_key: d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-txn-and-inpututxolist-for-delist-kitty-from-sale
  },
  "set-name": async (kitty: Kitty, key: string, accounts: wallet[]) => {
    if (!kitty) return;
    let txHandle: Handlers;
    let updateHandle: Handlers;
    //name
    // tradable and basic kitty have different apis
    if (kitty.forSale) {
      //tradable
      txHandle = "get-txn-and-inpututxolist-for-td-kitty-name-update";
      updateHandle = "patch-update-td-kitty-name";
    } else {
      //basic
      txHandle = "get-txn-and-inpututxolist-for-kitty-name-update";
      updateHandle = "patch-update-kitty-name";
    }
    const transaction = await apiCall(txHandle, "GET", {
      "kitty-dna": cut0x(kitty.dna!),
      "kitty-new-name": kitty.name,
      owner_public_key: cut0x(key),
    });
    const signedTransaction = await sign(transaction, accounts);
    return await apiCall(updateHandle, "PATCH", {}, signedTransaction);
  },
  "set-price": async (kitty: Kitty, key: string, accounts: wallet[]) => {
    if (!kitty) return;
    let txHandle: Handlers =
      "get-txn-and-inpututxolist-for-td-kitty-price-update";
    let updateHandle: Handlers = "patch-update-td-kitty-price";

    const transaction = await apiCall(txHandle, "GET", {
      "kitty-dna": cut0x(kitty.dna!),
      "kitty-price": kitty.price,
      owner_public_key: cut0x(key),
    });
    const signedTransaction = await sign(transaction, accounts);
    return await apiCall(updateHandle, "PATCH", {}, signedTransaction);
  },
  list: async (kitty: Kitty, key: string, accounts: wallet[]) => {
    if (!kitty) return;
    let txHandle: Handlers = "get-txn-and-inpututxolist-for-listkitty-forsale";
    let updateHandle: Handlers = "put-listkitty-for-sale";

    const transaction = await apiCall(txHandle, "GET", {
      "kitty-dna": cut0x(kitty.dna!),
      "kitty-price": kitty.price,
      owner_public_key: cut0x(key),
    });
    const signedTransaction = await sign(transaction, accounts);
    return await apiCall(updateHandle, "PUT", {}, signedTransaction);
  },
  delist: async (kitty: Kitty, key: string, accounts: wallet[]) => {
    console.log("kitty", kitty);
    if (!kitty) return;
    let txHandle: Handlers =
      "get-txn-and-inpututxolist-for-delist-kitty-from-sale";
    let updateHandle: Handlers = "put-delist-kitty-from-sale";

    const transaction = await apiCall(txHandle, "GET", {
      "kitty-dna": cut0x(kitty.dna!),
      owner_public_key: cut0x(key),
    });
    const signedTransaction = await sign(transaction, accounts);
    return await apiCall(updateHandle, "PUT", {}, signedTransaction);
  },
  "buy-kitty": async (
    kitty: Kitty,
    key: string,
    accounts: wallet[],
    outputAmount: number,
    coin: string,
  ) => {
    const buyTxBody = {
      "kitty-dna": cut0x(kitty.dna!),
      "input-coins": coin,
      output_amount: outputAmount,
      buyer_public_key: cut0x(key),
      seller_public_key: cut0x(kitty.owner!),
    };
    if (!kitty) return;
    let txHandle: Handlers = "get-txn-and-inpututxolist-for-buy-kitty";
    let updateHandle: Handlers = "patch-buy-kitty";

    const transaction = await apiCall(txHandle, "GET", buyTxBody);
    const signedTransaction = await sign(transaction, accounts);
    return await apiCall(updateHandle, "PATCH", {}, signedTransaction);
  },
  "mint-kitty": async (name: string, user: string) => {
    // should be called on first entry
    // check if this is reentry by checking for kitties?
    return await apiCall(
      "post-create-kitty",
      "POST",
      {},
      {
        name: name,
        owner_public_key: cut0x(user),
      },
    );
  },
  "get-coins": async (user: string) => {
    //$ curl -X GET -H "Content-Type: application/json" -H "owner_public_key:
    // d2bf4b844dfefd6772a8843e669f943408966a977e3ae2af1dd78e0f55f4df67" http://localhost:3000/get-owned-coins
    const res = await apiCall("get-owned-coins", "GET", {
      owner_public_key: cut0x(user),
    });
    if (res.message.toLowerCase().includes("error")) {
      throw new Error(res.message);
    }
    return res.coins;
  },
  "mint-coins": async (user: string, amount: number) => {
    //should be called on first account connect
    return await apiCall(
      "post-mint-coin",
      "POST",
      {},
      { amount: amount, owner_public_key: cut0x(user) },
    );
  },
};
