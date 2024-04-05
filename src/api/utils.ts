import { Kitty } from "../types";

type Handlers = 'get-all-kitty-list'
  | 'get-kitty-by-dna'
  | 'get-tradable-kitty-by-dna'
  | 'get-owned-kitty-list'
  | 'get-owned-coins'
  | 'mint-coins'
  | 'create-kitty'
  | 'get-txn-and-inpututxolist-for-breed-kitty'
  | 'breed-kitty'
  | 'get-block'
  | 'list-kitty-for-sale';
type Methods = 'POST' | 'PUT' | 'DELETE' | 'GET';
type Headers = {};
type Body = {};
export const apiCall = async (handle: Handlers, method: Methods, headers?: Headers, body?: Body) => {
  const url = `/${handle}`;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: body && JSON.stringify(body),
    });
    if (response.status === 400) {
      return {
        error: true,
        data: 'Not found'
      }
    }
    if (!response.ok) {
      return {
        error: true,
        data: 'Network response was not OK',
      }
    }
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.error(error)
  }
}
export const transformKittyForUi = (data: any): Kitty => {
  return {
    ...data,
    forSale: !!data.price,
    gender: data.parent.Mom ? "female" : "male",
    status: data.parent.Mom || data.parent.Dad,
    breedings: data.num_breedings,
    name: String.fromCharCode(...data.name),
  }
}
export const sign = (transaction: unknown): unknown => {
  return transaction;
}
export const cut0x = (key: string): string => {
  if (key[0] === '0' && key[1] === 'x') return key.slice(2);
  return key;
};
