import React, {FC} from 'react';
import { IMAGES } from "./kittyParts";

const dnaToAttributes = (dna: string) =>{
  let attribute = (index: number, options: number) => {
    //TODO: better algorithm for seed
    return Number(dna[index].charCodeAt(0)) % options
  };
  return {
    body: IMAGES.body[attribute(0, 15)],
    eyes: IMAGES.eyes[attribute(1, 15)],
    accessory: IMAGES.accessories[attribute(2, 20)],
    fur: IMAGES.fur[attribute(3, 10)],
    mouth: IMAGES.mouth[attribute(4, 10)]
  }
}

type Props = {
  dna: string
};

export const KittyAvatar: FC<Props> =({dna}) => {
  const outerStyle: React.CSSProperties = {height: "150px", position: 'relative', width: "150px"},
    innerStyle: React.CSSProperties = {height: "150px", position: 'absolute', top: '0%'};
  let cat = dnaToAttributes(dna);
  console.log(cat)
  return <div className="">
    <div style={outerStyle}>
      <img alt='body' src={cat.body} style={innerStyle} />
      <img alt='fur' src={cat.fur} style={innerStyle} />
      <img alt='mouth' src={cat.mouth} style={innerStyle} />
      <img alt='eyes' src={cat.eyes} style={innerStyle} />
      <img alt='accessory' src={cat.accessory} style={innerStyle} />
    </div>
  </div>
}
