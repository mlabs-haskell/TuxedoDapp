import { Kitty } from "../types";
import { makeid } from "./utils";

export const generateKitty = (setKitty: Partial<Kitty> = {}):Kitty => {
  return Object.assign({
    owner: `0x${makeid(18)}`,
    dna: makeid(30),
    name: makeid(4),
    gender: ['male', 'female'][Math.floor(Math.random() * 2)],
    mom: {
      dna: makeid(30),
      name: makeid(4),
    },
    dad: {
      dna: makeid(30),
      name: makeid(4)
    },
    breedings: 1,
    forSale: Math.floor(Math.random() * 2) === 1,
    status: ['ready to bread', 'tired', 'had birth recently'][Math.floor(Math.random() * 3)],
    price: Math.floor(Math.random() * 100)
  },setKitty);
};


