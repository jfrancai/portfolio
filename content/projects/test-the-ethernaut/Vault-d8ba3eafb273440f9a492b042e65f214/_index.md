---
title: "Vault"
date: "2024-02-02"
lastmod: "2024-02-12T14:45:00.000Z"
draft: false
difficulty: "⭐⭐"
prev: "Force-79bc75128abc41f2b25e56b521833ab6"
weight: 8
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/8"
next: "King-8338a297a2b447b3b40166c68586199d"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "d8ba3eaf-b273-440f-9a49-2b042e65f214"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-12T14:45:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel8.svg"
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
      number: 8
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
      url: "https://ethernaut.openzeppelin.com/level/8"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "King-8338a297a2b447b3b40166c68586199d"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "King-8338a297a2b447b3b40166c68586199d"
          href: null
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
            content: "Vault"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Vault"
          href: null
  url: "https://www.notion.so/Vault-d8ba3eafb273440f9a492b042e65f214"
  public_url: null
UPDATE_TIME: "2024-02-13T10:44:57.234Z"
EXPIRY_TIME: "2024-02-13T11:44:50.936Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vault {
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}
```


Unlock the vault to pass the level!


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/13409f0d-cf98-499c-92f7-e5f7df0852ad/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240213T104450Z&X-Amz-Expires=3600&X-Amz-Signature=0f992f414772c9875df580ee1b3433ea41841da9e73c82cf31816e4c027d1aee&X-Amz-SignedHeaders=host&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/88b316f9-391f-422d-967a-94391194a992/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240213T104450Z&X-Amz-Expires=3600&X-Amz-Signature=7aea317416019da8a46e69ea92ac9901e70ead8f885b0953d3c5645414c8509d&X-Amz-SignedHeaders=host&x-id=GetObject)


> 💡 It's important to remember that marking a variable as private only prevents   
> other contracts from accessing it. State variables marked as private and  
>  local variables are still publicly accessible.  
> To ensure that data is private, it needs to be encrypted before being  
>  put onto the blockchain. In this scenario, the decryption key should   
> never be sent on-chain, as it will then be visible to anyone who looks   
> for it. [zk-SNARKs](https://blog.ethereum.org/2016/12/05/zksnarks-in-a-nutshell/) provide a way to determine whether someone possesses a secret parameter, without ever having to reveal the parameter.

