---
title: Force
weight: 8
type: docs
next: vault
prev: delegation
---

[Level7](https://ethernaut.openzeppelin.com/level/7) - ⭐⭐⭐

---

Some contracts will simply not take your money `¯\_(ツ)_/¯`

The goal of this level is to make the balance of the contract greater than zero.

Things that might help:

- Fallback methods
- Sometimes the best way to attack a contract is with another contract.
- See the ["?"](https://ethernaut.openzeppelin.com/help) page above, section "Beyond the console"

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}
```

<aside>
💡 In solidity, for a contract to be able to receive ether, the fallback function must be marked `payable`.

However, there is no way to stop an attacker from sending ether to a
contract by self destroying. Hence, it is important not to count on the
invariant `address(this).balance == 0` for any contract logic.

</aside>
