---
title: "Wintermute Rekt"
date: "2024-02-14T14:27:00.000Z"
lastmod: "2024-02-15T12:46:00.000Z"
draft: false
featuredImage: "https://cdn.nodeguardians.io/backend-production/Wintermute_Rekt\
  _part1_1200px_66fcb9642f/Wintermute_Rekt_part1_1200px_66fcb9642f.webp"
weight: 2
difficulty: "🗡🗡🗡🗡🗡"
language:
  - "Solidity"
next: "Cream-Finance-Rekt-04ac5f09eb5d42c0b28fcdd8aabdc19d"
level-url: "https://nodeguardians.io/dev-hub/quests/wintermute-rekt"
type: "docs"
skill-cat:
  - "Security"
state: "Done"
about:
  - "ctf"
prev: "Price-Oracle-Attack-48bb5fd1fcf5428e84266833aecafe4f"
NOTION_METADATA:
  object: "page"
  id: "d0fd4609-1479-41e6-af7f-cc68ef81da6a"
  created_time: "2024-02-14T14:27:00.000Z"
  last_edited_time: "2024-02-15T12:46:00.000Z"
  created_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  last_edited_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  cover:
    type: "external"
    external:
      url: "https://cdn.nodeguardians.io/backend-production/Wintermute_Rekt_part1_120\
        0px_66fcb9642f/Wintermute_Rekt_part1_1200px_66fcb9642f.webp"
  icon:
    type: "emoji"
    emoji: "✅"
  parent:
    type: "database_id"
    database_id: "67ccfb28-aa7e-4248-9272-3d9732e4a83e"
  archived: false
  properties:
    weight:
      id: "%3BQ%60q"
      type: "number"
      number: 2
    difficulty:
      id: "%3DCqv"
      type: "status"
      status:
        id: "}M?I"
        name: "🗡🗡🗡🗡🗡"
        color: "purple"
    language:
      id: "Py%7Cy"
      type: "multi_select"
      multi_select:
        - id: "d01ac056-199f-4b78-96ee-583126c15462"
          name: "Solidity"
          color: "blue"
    next:
      id: "%60Q~a"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Cream-Finance-Rekt-04ac5f09eb5d42c0b28fcdd8aabdc19d"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Cream-Finance-Rekt-04ac5f09eb5d42c0b28fcdd8aabdc19d"
          href: null
    level-url:
      id: "cjvw"
      type: "url"
      url: "https://nodeguardians.io/dev-hub/quests/wintermute-rekt"
    type:
      id: "khE_"
      type: "select"
      select:
        id: "Qq?l"
        name: "docs"
        color: "default"
    skill-cat:
      id: "n%7CzF"
      type: "multi_select"
      multi_select:
        - id: "8fe662a4-5f8b-4be9-8013-c00b51082782"
          name: "Security"
          color: "green"
    state:
      id: "sW%3AG"
      type: "status"
      status:
        id: "372c6056-56a9-4d05-861f-a165f80174eb"
        name: "Done"
        color: "green"
    about:
      id: "vf%7DG"
      type: "multi_select"
      multi_select:
        - id: "8003f5ac-a320-4dd2-8d86-081c00f91f54"
          name: "ctf"
          color: "red"
    prev:
      id: "~LUC"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Price-Oracle-Attack-48bb5fd1fcf5428e84266833aecafe4f"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Price-Oracle-Attack-48bb5fd1fcf5428e84266833aecafe4f"
          href: null
    title:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "Wintermute Rekt"
            link: null
          annotations:
            bold: true
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Wintermute Rekt"
          href: null
  url: "https://www.notion.so/Wintermute-Rekt-d0fd4609147941e6af7fcc68ef81da6a"
  public_url: null
UPDATE_TIME: "2024-02-15T12:47:14.776Z"
EXPIRY_TIME: "2024-02-15T13:47:09.259Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


**Level**: [https://rekt.news/wintermute-rekt-2](https://rekt.news/wintermute-rekt-2/)


Here is the contract we have to break:


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UndeadHorde {

    address public constant LADY_WHITEFROST 
        = 0x0DEaD582fa84de81e5287132d70d9a296224Cf90;

    bool public isActive = true;
    mapping(address => bool) public infested;

    function infestDead(address _target) external {
        require(isActive);
        require(_fromLady(), "We only answer to our Queen Mother...");
        require(_isDead(_target), "Target is still alive...");

        infested[_target] = true;
    }

		// So we have to find a way to call this function
		// The only possible way to do that is by being LADY_WHITEFROST
		// So we have to find the private key associated with her address
    function releaseArmy() external {
        require(_fromLady(), "We only answer to our Queen Mother...");
        isActive = false;
    }

    function _fromLady() private view returns (bool) {
        return msg.sender == LADY_WHITEFROST;
    }

    function _isDead(address _target) private pure returns (bool) {
        uint160 prefix = uint160(_target) >> 140;
        return prefix == 0x0dead;
    }

}
```


First let’s take a look to the Vanity address generator that we have: `find-more-dead.js`


```javascript
const { BigNumber } = require("ethers");
const { arrayify, keccak256, zeroPad } = require("ethers/lib/utils");
const { Worker } = require("worker_threads");
const { CURVE } = require("@noble/secp256k1");

const MAX_UINT16 = 65535; // 2**16
const NUM_OF_THREADS = 3;
const K = "0xc01ddeadc01ddeadc01ddead";

// Generate a random private key `p`
const seed = Math.floor(Math.random() * MAX_UINT16); // 1 out of 65535 possible seeds
const privateKey = BigNumber.from(keccak256(seed)); // Determinitic private key generation

console.log(`Seed: ${seed}`);

// Start threads running `find-dead.js`
for (let i = 0; i < NUM_OF_THREADS; i++) {
  // Each thread is given a private key `p + (i * K)`
  const delta = BigNumber.from(K).mul(i);

	// ---- thread 0: privKey + delta0
	// |
	// ----  thread 1: privKey + delta1
	// |
  // ----  thread 2: privKey + delta2 
  const seedKey = zeroPad(arrayify(privateKey.add(delta).mod(CURVE.n)), 32);

  const thread = new Worker("./find-dead.js", {
    workerData: { seedKey: seedKey },
  });

  thread.on("message", (msg) => {
    console.log(msg);
  });
}
```


Then in each thread we have the following script: `find-dead.js`


```javascript
const { BigNumber } = require("ethers");
const {
  getAddress: checksumAddress,
  hexDataSlice,
  keccak256,
} = require("ethers/lib/utils");
const { Point } = require("@noble/secp256k1");
const { parentPort, workerData } = require("worker_threads");

// Calculate new point `P` from seed key `p`
const seedKey = workerData.seedKey;
let newPoint = Point.fromPrivateKey(seedKey); // seed pub key

for (let i = 1; ; i++) {
  // Increment new point `P` (i.e. `P <- P + G`)
  newPoint = newPoint.add(Point.BASE); // part of the set of the candidate pub key

  // Infer address of `P`
  const newAddress = hexDataSlice(
    keccak256(hexDataSlice("0x" + newPoint.toHex(), 1)),
    12,
  );

  // If address is vanity address...
  if (newAddress.startsWith("0x0dead")) {
    // Infer the private key (i.e. `p + i`)
    const deadKey = BigNumber.from(seedKey).add(i);

    // Send back to parent process to print
    parentPort.postMessage(
      `\nPrivate Key: ${deadKey.toHexString()}\
       \nAddress: ${checksumAddress(newAddress)}`,
    );
  }
}
```


We can notice that there are no more than  MAX_UINT16 per thread (3 threads) private key possible, which is a reasonable amount number of private to generate.


Once we have all the possible private keys it’s not more difficult to generate all the public key associated (aka seed public key).


Here is a script to generate all possible public key seeds:


```javascript
const fs = require("node:fs");
const { BigNumber } = require("ethers");
const { arrayify, keccak256, zeroPad } = require("ethers/lib/utils");
const { Point } = require("@noble/secp256k1");
const { CURVE } = require("@noble/secp256k1");

const MAX_UINT16 = 65535;
const K = "0xc01ddeadc01ddeadc01ddead";

const d0 = BigNumber.from(K).mul(0);
const d1 = BigNumber.from(K).mul(1);
const d2 = BigNumber.from(K).mul(2);

// let map = new Map();

// Generates all possible private keys (65535 * 3 = 196 605)
for (let i = 0; i < MAX_UINT16; i++) {
  const privateKey = BigNumber.from(keccak256(i));

  const pvKey0 = zeroPad(arrayify(privateKey.add(d0).mod(CURVE.n)), 32);
  const pvKey1 = zeroPad(arrayify(privateKey.add(d1).mod(CURVE.n)), 32);
  const pvKey2 = zeroPad(arrayify(privateKey.add(d2).mod(CURVE.n)), 32);

  // const content = `${s0}\n${s1}\n${s2}\n`;
  const seedPbKey0 = Point.fromPrivateKey(new Uint8Array(pvKey0));
  const seedPbKey1 = Point.fromPrivateKey(new Uint8Array(pvKey1));
  const seedPbKey2 = Point.fromPrivateKey(new Uint8Array(pvKey2));
  const content = `"${seedPbKey0.toHex()}": [${pvKey0}],\n"${seedPbKey1.toHex()}": [${pvKey1}],\n"${seedPbKey2.toHex()}": [${pvKey2}],\n`;
  fs.appendFileSync("./out.log", content, () => {});
}
```


Once the keys are generated we can put then into a file. My idea was to generate a mapping such that : pubKey ⇒ privKey


So that if we manage to find the seed public key of the vanity address of LADY_WHITEFROST it’s very easy to get the associated private key and so we break the level !


Once the script has finished to run we end up with a ~50Mb file that contains all the mapped keys, then we can convert the file to a js object so it will be easier to load it into memory: `map.js`


```javascript
const data = {
  "04b793ec11629accadfd51835c82654391fad3f7489af36440155403e366dc677808fa587ed7576c1274e4fcdf886789b72b52de5e1eed3907500d9d4d3f8aa1fb":
    [
      188, 54, 120, 158, 122, 30, 40, 20, 54, 70, 66, 41, 130, 143, 129, 125,
      102, 18, 247, 180, 119, 214, 101, 145, 255, 150, 169, 224, 100, 188, 201,
      138,
    ],
  "046d7e35af8d3626c3b9a4846f7a3eb7bb4da9b33dc29dbd1c0254f9ea4e25b7d64753c9655cbcd5974904b0dd51a0b5fb11a7dbd676031706472c8d794800abe0":
    [
      188, 54, 120, 158, 122, 30, 40, 20, 54, 70, 66, 41, 130, 143, 129, 125,
      102, 18, 247, 181, 55, 244, 68, 63, 191, 180, 136, 142, 36, 218, 168, 55,
    ],
		// ...
		// ...
		// ...
};

module.exports = { data };
```


Now that we are done with this part we can go back to the address:


```javascript
LADY_WHITEFROST = 0x0DEaD582fa84de81e5287132d70d9a296224Cf90;
```


We have to recover a public key from the address. The process implies that we use a transaction made by the said address. We can do that looking on Etherscan and I chose the following one:


```javascript
0xf81d53b9d2fa44bb0c31913b55eeabf38492d187fc2fe162a6359850c2320b97
```


which has the followin associated encoded data (click on `Get Raw Tx Hex` on the etherscan more button of the transaction):


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/b13540f7-a757-47fb-95ea-9ab5708f7214/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=185a770d07516d8d0683821dcdd0386b4c2d1d675e7b1907d2651997941746fb&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/b597e66d-183c-47d3-bb30-103a7908cc82/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=fd13b19a256f46f92949b37ad1181956ad1e5b7343a915957afb5946ab1088a9&X-Amz-SignedHeaders=host&x-id=GetObject)


From here we have to retrieve the r,s,v value, we can use [ABDK TollKit](https://toolkit.abdk.consulting/ethereum#recover-address) to do that from web interface:


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/ad71154e-77cb-4743-bfdb-d93e472738b5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=bdcc35fcc8bd11ec0d122700ba3c04667007949d2d54ff1bec3df0948cc990fb&X-Amz-SignedHeaders=host&x-id=GetObject)


After, that I used the following script to recover the public from the transaction details: `ransactionToPublicKey.js`


```javascript
const { ethers } = require("ethers");

async function recover(tx) {
  const expandedSig = {
    r: tx.r,
    s: tx.s,
    v: tx.v,
  };

  const signature = ethers.utils.joinSignature(expandedSig);

  const txData = {
    gasLimit: tx.gasLimit,
    value: tx.value,
    nonce: tx.nonce,
    data: tx.data,
    chainId: tx.chainId,
    to: tx.to, // you might need to include this if it's a regular tx and not simply a contract deployment
    type: tx.type,
    maxFeePerGas: tx.maxFeePerGas,
    maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
  };

  const rsTx = await ethers.utils.resolveProperties(txData);
  const raw = ethers.utils.serializeTransaction(rsTx); // returns RLP encoded tx
  const msgHash = ethers.utils.keccak256(raw); // as specified by ECDSA
  const msgBytes = ethers.utils.arrayify(msgHash); // create binary hash

  return {
    publicKey: ethers.utils.recoverPublicKey(msgBytes, signature),
    address: ethers.utils.recoverAddress(msgBytes, signature),
  };
}

recover({
  r: "0x14ad83bdfc9bb697562faf6fd876b3fcda0e08bfc91589ad7e140d6e6f7f2138",
  s: "0x36c1ad13b175a65fc23749d201fa382b5169e4f0ca0bbc041140077e19e4c803",
  v: "0xf81d53b9d2fa44bb0c31913b55eeabf38492d187fc2fe162a6359850c2320b97",
  gasLimit: 21000,
  nonce: 0,
  value: 100000000000000,
  data: "",
  chainId: 5,
  to: "0xA73dB9CFB00F43241f35d6462124C11B72C765CF",
  type: 2,
  maxFeePerGas: 5870556900,
  maxPriorityFeePerGas: 1500000000,
}).then((res) => console.log(res));
```


which gave me the following output :


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/3967a493-d450-4454-9709-5279f65c3b1e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=1ee841adafa5190b9e13b929810f5a3eff2c77ec4031873e1e9b9095b76a73ed&X-Amz-SignedHeaders=host&x-id=GetObject)


Let’s go ! We have the public key of LADY_WHITEFROST, the only thing left to do is bruteforcing the public key so that we can retrieve the seed public key which will gave us the associated private key thanks to our mapping.


Here is the bruteforce attack script:


```javascript
const { BigNumber } = require("ethers");
const { Point } = require("@noble/secp256k1");
const {
  getAddress: checksumAddress,
  hexDataSlice,
  keccak256,
} = require("ethers/lib/utils");

console.log("Loading pub/priv key pairs into memory...");

const { data: map } = require("./map.js");

console.log("Data keys has been loaded");

// We start from the public key we found
let newPoint = Point.fromHex(
  "04077029792b56144069fac2787ca35fad37f7f0634236ba02e307bff5a2f120e1c1484a687dc468e671eef339d1437d02d51949973ccfd29f33efe9aa4b9a6017",
);

for (let i = 1; ; i++) {
	// Then we do the opposite operation made to find the Vanity address (add -> substract)
  newPoint = newPoint.subtract(Point.BASE);
  const hexNewPoint = newPoint.toHex();

	// if the public key exist in the db then it's the public key seed used
	// to generate the vanity public key!
  if (map[hexNewPoint] !== undefined) {
    const seedKey = new Uint8Array(map[hexNewPoint]);
    console.log(seedKey);
    const deadKey = BigNumber.from(seedKey).add(i);
		
		// We print out the private key found
    console.log(
      `i = ${i}\nPrivate Key: ${deadKey.toHexString()}\nPublic key: ${hexNewPoint}`,
    );
    break;
  }
}
```


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/57fe8d28-b53a-4afe-b0f5-e2d9b826b510/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=1149ab577892315c3e2a79aea4acae9e0853c27c07f07be67500fa2eb1447bb6&X-Amz-SignedHeaders=host&x-id=GetObject)


Here we have it!


<u>**Usefull links:**</u>

- [A vulnerability disclosed in Profanity, an Ethereum vanity address tool](https://blog.1inch.io/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool/)
- [Private key safety](https://github.com/johguse/profanity/issues/61?ref=blog.1inch.io)
- [It took the wintermute hacker 5 days to brute force an ETH Vanity Address...](https://www.reddit.com/r/ethfinance/comments/xjaq6t/it_took_the_wintermute_hacker_5_days_to_brute/)
- [Profanity-brute-force](https://github.com/rebryk/profanity-brute-force)
- [The Profanity Address Hack — How are Vanity Addresses Generated?](https://medium.com/coinmonks/the-profanity-address-hack-how-are-vanity-addresses-generated-cce40ba5ed39)
- [https://vast.ai/](https://vast.ai/)
- [A Deep Dive of HOW Profanity Caused Wintermute to Lose $160M](https://blog.safeheron.com/blog/insights/safeheron-originals/a-deep-dive-of-how-profanity-caused-wintermute-to-lose-usd160m)
- [Get public key of any ethereum account](https://ethereum.stackexchange.com/questions/13778/get-public-key-of-any-ethereum-account)
- [ECDSA: Elliptic Curve Signatures](https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages)
- [How to get sender’s Ethereum address and public key from signed transaction](https://scrapbox.io/piyopiyo/How_to_get_sender%E2%80%99s_Ethereum_address_and_public_key_from_signed_transaction)
- [ethers.js Recover public key from contract deployment via v,r,s values](https://ethereum.stackexchange.com/questions/78815/ethers-js-recover-public-key-from-contract-deployment-via-v-r-s-values)
- [Can we generate public key from ethereum public address?](https://stackoverflow.com/questions/57802131/can-we-generate-public-key-from-ethereum-public-address)

<u>**Some screen shot from my research during the quest:**</u>


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/6bb075f4-fbe6-47d6-9009-d08cefa8ab49/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=744766ff515f73a8cb507d6e645ec28aeb218daf3e5fcad88124c0aec6775990&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/5f896cbd-b61b-43fa-8bbd-e68c8e287de6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=a7455b4240e2c6b3b1c40905960cf6f32259fb61ebbfbc108154f690dec05f0d&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/d8816adc-72fb-42a6-8d8f-0e8c61639ec2/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=08f1cb9ae113b3a0a18fb0404ff8891c8a16a6f7002d15c7dc9ee14f784db906&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/df0e6e95-e2b1-40ae-a3be-74f6b1974daf/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=78b14b041f31ac5c0205b509e623070dc2d01f5ca6b5976568412a9392fcd273&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/1897b71a-84d2-4668-ab07-846c21840b57/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=abbf7d394c13e1aaa9740f581cdae9ba4ccc82ee5269bf62052039b78339c2b3&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/2ef5764e-eb17-415f-9411-64d0ac450ec1/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=887726a0b1e3afd649dd61f11a731543fe64491a5081c2e20257c434ffd548b6&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/932426b9-1f57-47b7-aab6-18bff19f1360/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=953edccbf54e248a95a15575159020dafd7309744aa7678bb3015e80999a3645&X-Amz-SignedHeaders=host&x-id=GetObject)


```bash
Tx = 0x02f87105808459682f0085015de996e482520894a73db9cfb00f43241f35d6462124c11b72c765cf865af3107a400080c001a014ad83bdfc9bb697562faf6fd876b3fcda0e08bfc91589ad7e140d6e6f7f2138a036c1ad13b175a65fc23749d201fa382b5169e4f0ca0bbc041140077e19e4c803
From = 0x0DEaD582fa84de81e5287132d70d9a296224Cf90
To = 0xA73dB9CFB00F43241f35d6462124C11B72C765CF
r = 0x14ad83bdfc9bb697562faf6fd876b3fcda0e08bfc91589ad7e140d6e6f7f2138
s = 0x36c1ad13b175a65fc23749d201fa382b5169e4f0ca0bbc041140077e19e4c803
v = 0xf81d53b9d2fa44bb0c31913b55eeabf38492d187fc2fe162a6359850c2320b97
```


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/0cb37632-2928-440c-96c3-8bba3f1c7666/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124709Z&X-Amz-Expires=3600&X-Amz-Signature=3bfa118434418f1313dee9912925dcdca3b02de00074f6c8e24cc5026e315c02&X-Amz-SignedHeaders=host&x-id=GetObject)

