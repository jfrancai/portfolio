---
title: "Force"
date: "2024-02-02"
lastmod: "2024-02-12T14:43:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Delegation-0c005c8b167c4966926771bad0ff918c"
weight: 7
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/7"
next: "Vault-d8ba3eafb273440f9a492b042e65f214"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "79bc7512-8abc-41f2-b25e-56b521833ab6"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-12T14:43:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel7.svg"
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
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-02"
        end: null
        time_zone: null
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
      url: "https://ethernaut.openzeppelin.com/level/7"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Vault-d8ba3eafb273440f9a492b042e65f214"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Vault-d8ba3eafb273440f9a492b042e65f214"
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
            content: "Force"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Force"
          href: null
  url: "https://www.notion.so/Force-79bc75128abc41f2b25e56b521833ab6"
  public_url: null
UPDATE_TIME: "2024-02-14T14:49:35.300Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


Some contracts will simply not take your money `¯\_(ツ)_/¯`


The goal of this level is to make the balance of the contract greater than zero.


Things that might help:

- Fallback methods
- Sometimes the best way to attack a contract is with another contract.
- See the ["?"](https://ethernaut.openzeppelin.com/help) page above, section "Beyond the console"

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}
```


> 💡 In solidity, for a contract to be able to receive ether, the fallback function must be marked `payable`.  
> However, there is no way to stop an attacker from sending ether to a   
> contract by self destroying. Hence, it is important not to count on the   
> invariant `address(this).balance == 0` for any contract logic.

