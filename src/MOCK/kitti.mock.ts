import { Kitty } from "../types";

export const generateKitty = ():Kitty => {
  return {
    owner: `0x${makeid(18)}`,
    dna: makeid(30),
    name: makeid(4),
    gender: 'male',
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
  };
};

export const makeid = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};