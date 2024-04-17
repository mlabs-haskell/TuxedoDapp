import { Kitty, wallet } from "../types";
import { hexToU8a, u8aToHex } from "@polkadot/util";

export type Handlers =
  | "get-all-kitty-list"
  | "get-all-tradable-kitty-list"
  | "get-kitty-by-dna"
  | "get-tradable-kitty-by-dna"
  | "get-owned-kitty-list"
  | "get-owned-coins"
  | "post-mint-coin"
  | "get-txn-and-inpututxolist-for-buy-kitty"
  | "patch-buy-kitty"
  | "post-create-kitty"
  | "get-txn-and-inpututxolist-for-breed-kitty"
  | "get-txn-and-inpututxolist-for-kitty-name-update"
  | "get-txn-and-inpututxolist-for-td-kitty-name-update"
  | "patch-update-kitty-name"
  | "patch-update-td-kitty-name"
  | "breed-kitty"
  | "get-block"
  | "list-kitty-for-sale"
  | "get-txn-and-inpututxolist-for-delist-kitty-from-sale"
  | "put-delist-kitty-from-sale"
  | "get-txn-and-inpututxolist-for-td-kitty-price-update"
  | "get-txn-and-inpututxolist-for-listkitty-forsale"
  | "put-listkitty-for-sale"
  | "patch-update-td-kitty-price";
type Methods = "POST" | "PUT" | "DELETE" | "GET" | "PATCH";
type Headers = {};
type Body = {};
export const apiCall = async (
  handle: Handlers,
  method: Methods,
  headers?: Headers,
  body?: Body,
) => {
  const url = `/${handle}`;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body && JSON.stringify(body),
    });
    if (response.status === 400) {
      return {
        error: true,
        data: "Not found",
      };
    }
    if (!response.ok) {
      return {
        error: true,
        data: "Network response was not OK",
      };
    }
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.error(error);
  }
};
export const transformKittyForUi = (data: any): Kitty => {
  return {
    ...data,
    forSale: !!data.kitty.price,
    gender: data.kitty.parent.Mom ? "female" : "male",
    status: data.kitty.parent.Mom || data.kitty.parent.Dad,
    breedings: data.kitty.num_breedings,
    name: String.fromCharCode(...data.kitty.name),
    owner: data.owner_pub_key,
    dna: data.kitty.dna,
    price: data.kitty.price,
  };
};

export const sign = async (data: any, accounts: wallet[]) => {
  const constructRedeemer = async (data: any, key: string) => {
    const address = getAddressByKey(key, accounts);

    if (!address) return;

    // @ts-ignore
    const wallet = window.accounts.find((acc) => acc.address === address);

    const { signature } = await wallet?.signer.signRaw({
      data: u8aToHex(data),
      type: "bytes",
      address: address,
    });
    return Array.from(hexToU8a(signature));
  };

  const tx = {
    signed_transaction: {
      ...data.transaction,
      // inputs: await Promise.all(
      //   data.transaction.outputs.map(async (output: any, index: number) => {
      //     const redeemer = await constructRedeemer(
      //       data.encoded,
      //       output.verifier.Sr25519Signature.owner_pubkey,
      //     );
      //     return {
      //       output_ref: data.transaction.inputs[index].output_ref,
      //       redeemer: redeemer,
      //     };
      //   }),
      // ),
      outputs: [...data.transaction.outputs],
    },
    input_utxo_list: [...data["input_utxo_list"]],
  };
  return tx;
};
export const getAddressByKey = (
  key: string,
  accounts: wallet[],
): string | undefined => {
  const account = accounts.find((acc) => {
    return cut0x(acc.key) === cut0x(key);
  });
  return account?.address;
};
export const cut0x = (key: string): string => {
  if (key[0] === "0" && key[1] === "x") return key.slice(2);
  return key;
};
