import { Coin } from "../types";
import { makeid } from "./utils";

export const generateCoins = (amount: number) => {
  return Array.from({length: amount}, () => generateCoin());
};
export const generateCoin = ():Coin => {
  return {
    hash: makeid(10),
    value: Math.floor(Math.random() * 100),
  }
};
