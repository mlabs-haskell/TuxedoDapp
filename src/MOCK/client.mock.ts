import { generateKitty } from "./kitti.mock";
import { Kitty } from "../types";

const importObject = {
    imports: {
        fetch: fetch
    }
};


// compile and store the object
function LoadWebAssembly(_fileName: RequestInfo | URL, _importObject: WebAssembly.Imports | undefined) {
    WebAssembly.instantiateStreaming(fetch(_fileName), _importObject)
        .then(obj => {
            //console.log(obj.instance.exports.obj(12, 2));

            fetch("data")
            .then(response => response.arrayBuffer())
            .then(buffer => {
              //console.log(obj.instance.exports.buffer(buffer, buffer.byteLength));

            })
            return obj;
        });
}

// global for now
//export const dec_module = LoadWebAssembly("blob.wasm", importObject)

const delay = (delayInms: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};


export const MOCK_module = {
  'show-all-kitties': async ()=>{
    await delay(300);
    return  Array.from({length: 10}, () => generateKitty());
  },
  'show-owned-kitties': async (user?: string)=>{
    await delay(300);
    return Array.from({length: 10}, () => generateKitty({owner: user}));
  },
  'show-balance': async (user?: string)=>{
    await delay(300);
    return 100;
  },
  'breed-kitty': async (mom: Partial<Kitty>, dad: Partial<Kitty>)=>{
    await delay(300);
    return generateKitty();
  },
  'breed-tradable-kitty': async (mom: Partial<Kitty>, dad: Partial<Kitty>)=>{
    await delay(300);
    return generateKitty();
  },
  'set-kitty-property': async (kitty: Partial<Kitty>)=>{
    await delay(300);
    return generateKitty()
  },
  'buy-kitty': async ()=>{
    await delay(300);
    return generateKitty();
  },
  'mint-kitty': async ()=>{
    await delay(300);
    return generateKitty();
  },
  'mint-tradable-kitty': async ()=>{
    await delay(3000);
    return generateKitty();
  },
};
