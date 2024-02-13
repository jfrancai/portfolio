---
title: "Gatekeeper One"
date: "2024-02-10"
lastmod: "2024-02-12T14:46:00.000Z"
draft: false
difficulty: "⭐⭐⭐⭐"
prev: "Privacy-0141c59931824d74a8311099eb338d5d"
weight: 13
state: "En cours"
level-url: "https://ethernaut.openzeppelin.com/level/13"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "9bbda6ef-a6c2-4367-aa64-3eb73ae92a6a"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-12T14:46:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/level/13"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text: []
    type:
      id: "s%7DKc"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "docs"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "docs"
          href: null
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
UPDATE_TIME: "2024-02-13T10:43:48.009Z"

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

