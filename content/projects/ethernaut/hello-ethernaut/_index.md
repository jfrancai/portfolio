---
title: Hello Ethernaut
type: docs
next: fallback
---

Difficulty: ⭐

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled.png)

Here we can see the player address, do `ctrl + shift + i` to open your browser console.

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%201.png)

After requesting a new contract instance I got the following:

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%202.png)

![what is smart contract compilation.png](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/what_is_smart_contract_compilation.png)

Here is how I solved the it:

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%203.png)

Here is the source code after submiting the instance of the contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Instance {

  string public password;
  uint8 public infoNum = 42;
  string public theMethodName = 'The method name is method7123949.';
  bool private cleared = false;

  // constructor
  constructor(string memory _password) {
    password = _password;
  }

  function info() public pure returns (string memory) {
    return 'You will find what you need in info1().';
  }

  function info1() public pure returns (string memory) {
    return 'Try info2(), but with "hello" as a parameter.';
  }

  function info2(string memory param) public pure returns (string memory) {
    if(keccak256(abi.encodePacked(param)) == keccak256(abi.encodePacked('hello'))) {
      return 'The property infoNum holds the number of the next info method to call.';
    }
    return 'Wrong parameter.';
  }

  function info42() public pure returns (string memory) {
    return 'theMethodName is the name of the next method.';
  }

  function method7123949() public pure returns (string memory) {
    return 'If you know the password, submit it to authenticate().';
  }

  function authenticate(string memory passkey) public {
    if(keccak256(abi.encodePacked(passkey)) == keccak256(abi.encodePacked(password))) {
      cleared = true;
    }
  }

  function getCleared() public view returns (bool) {
    return cleared;
  }
}
```

Let’s create a PoC using Foundry. A proof of concept (PoC) exploit is **a non-harmful attack against a computer or network**. PoC exploits are not meant to cause harm, but to show security weaknesses within software.

Let’s configure Forge to deploy our PoC to the Sepolia testnet.

> Solidity scripts are like the scripts you write when working with tools like Hardhat; what makes Solidity scripting different is that they are written in Solidity instead of JavaScript, and they are run on the fast Foundry EVM backend, which provides dry-run capabilities.

First thing first, we have to initialize the forge repository using the following command:

```bash
forge init solidity-scripting
```

Once this is done we end up with the following directory structure and git initiliazied project:

```bash
.
├── .env
├── foundry.toml
├── .git
├── .github
├── .gitignore
├── .gitmodules
├── lib
├── README.md
├── script
├── src
└── test
```

Inside the `.env` file, you have to configure your environment variables :

```solidity
SEPOLIA_RPC_URL=...
PRIVATE_KEY=...
ETHERSCAN_API_KEY=...
```

Then, we can clean the default example code provided by forge with the following command:

```bash
rm script/* src/* test/*
```

Now we have settle our environment, we can start creating our Forge script.

Following the [documentation](https://book.getfoundry.sh/tutorials/solidity-scripting) our script should be written inside the script folder (what a surprise)

The script for the first challenge, which is Hello Ethernaut, is written under the `script/00.s.sol` file. We will use the same naming convention for the following challenges.

Here is the first (incomplete) version of our script:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

contract PoC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        vm.stopBroadcast();
    }
}
```

I’m just going to highlight the part of the documentation that are relevent in the case of this script by quoting them. Make sure you go by yourself into the documentation. Those notes are not meant to be exaustive.

Now let’s read through the code and figure out what it actually means and does.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
```

Remember even if it’s a script it still works like a smart contract,
but is never deployed, so just like any other smart contract written in
Solidity the `pragma version` has to be specified.

```solidity
import "forge-std/Script.sol";
```

Just like we may import Forge Std to get testing utilities when
writing tests, Forge Std also provides some scripting utilities that we
import here.

```solidity
contract PoC is Script {
```

We create a contract called `PoC` and it inherits `Script` from Forge Std.

```solidity
function run() external {
```

By default, scripts are executed by calling the function named `run`, our entrypoint.

```solidity
uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
```

This loads in the private key from our `.env` file. **Note:** you must be careful when exposing private keys in a `.env`
file and loading them into programs. This is only recommended for use
with non-privileged deployers or for local / test setups. For production
setups please review the various [wallet options](https://book.getfoundry.sh/reference/forge/forge-script.html#wallet-options---raw) that Foundry supports.

```solidity
vm.startBroadcast(deployerPrivateKey);

```

This is a special cheatcode that records calls and contract creations made by our main script contract. We pass the `deployerPrivateKey`
in order to instruct it to use that key for signing the transactions.
Later, we will broadcast these transactions to deploy our PoC contract.

## How to interact with a smart contract that you don’t have the code

In order to do that, we have to create an interface of the contract we want to interact with.

From the Ethernaut guidelines we see that their is an `info` method available on the contract instance.

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%204.png)

Looking into the console, we see that there are multiple other method available.

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%205.png)

Let’s begin with the interface for the `info` method:

```solidity
interface Callee {
  function info() external pure;
}
```

From what we can see in the data object from the console, the state mutability of the function is `pure` . But we have no idea if the function takes parameters or what is its return type.

Let’s try to find out by expending the object:

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%206.png)

And there it is!

There are no inputs and one output type: a `string`

So, here is what our final interafce looks like:

```solidity
interface Callee {
  function info() external pure returns (string memory);
}
```

Now, we can use this interface inside our script, create a contract instance and call the info function:

```solidity
interface Callee {
  function info() external pure returns (string memory);
}

contract POC is Script {
    Callee level0 = Callee(0x1548f3154bbB9439762435f7526B6CEbB921B66B);
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        level0.info();
        vm.stopBroadcast();
    }
}
```

Perfect, let’s run our script:

```solidity
forge script ./script/00.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv
```

Don’t forget to `source .env` if you haven’t done it yet, so you can use env variable.

Command Breakdown:

1. **forge script:** This is the main command indicating the use of the Forge tool for smart contract-related operations.
2. **./script/00.s.sol:** Specifies the path to the smart contract file (00.s.sol) that is to be deployed. Developers can replace this with the path to their own Solidity smart contract file.
3. —**rpc-url $SEPOLIA_RPC_URL:** Defines the RPC (Remote Procedure Call) URL, which is crucial for interacting with the blockchain network. The `$SEPOLIA_RPC_URL` variable holds the URL of the blockchain node or network to which the smart contract will be deployed.
4. —**broadcast:** This flag indicates that the deployment transaction should be broadcasted to the network. Broadcasting is an essential step in the process of making the smart contract part of the blockchain.
5. —**verify:** This flag triggers a verification process, ensuring that the smart contract's bytecode matches the one provided in the source code. Verification is a crucial step for ensuring the integrity and security of the deployed smart contract.
6. **vvvv:** These flags represent the verbosity level of the output. In this case, the use of five 'v' flags (`vvvv`) indicates a high level of verbosity, providing detailed information about each step of the deployment process. This can be helpful for developers to closely monitor and troubleshoot the deployment.

And here is the output we got:

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%207.png)

## How to decypher the return value ?

Do you recall that we are supposed to return a string from our function, but here is the output we got: `0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000027596f752077696c6c2066696e64207768617420796f75206e65656420696e20696e666f3128292e00000000000000000000000000000000000000000000000000`

One way to interpret this is by using the cast tooling solution that comes with foundry:

```solidity
cast to-ascii 0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000027596f752077696c6c2066696e64207768617420796f75206e65656420696e20696e666f3128292e00000000000000000000000000000000000000000000000000
```

which output the following result:

```solidity
'You will find what you need in info1().
```

A more systematic approach consist maybe to console log the result from within our script:

```solidity
...
string memory result = level0.info();
console.logString(result);
...
```

Now we have access to the logs directly within the ouput of our script:

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%208.png)

So, let’s call the next function `info1()` don’t forget to add the `info1()` function to the interface as we did for `info()` :

```solidity
interface Callee {
  function info() external pure returns (string memory);
  function info1() external pure returns (string memory);
}
```

We got the following logs:

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%209.png)

Let’s continue the process until we find something interesting…

OK after several method calls we finally got the password to pass the level:

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%2010.png)

Here is the code to get the password:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

interface Callee {
  function info() external pure returns (string memory);
  function info1() external pure returns (string memory);
  function info2(string calldata) external pure returns (string memory);
  function infoNum() external pure returns (uint8);
  function info42() external pure returns (string memory);
  function theMethodName() external pure returns (string memory);
  function method7123949() external pure returns (string memory);
  function password() external pure returns (string memory);
}

contract POC is Script {
    Callee level0 = Callee(0x1548f3154bbB9439762435f7526B6CEbB921B66B);
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        string memory result = level0.info();
        console.logString(result);

        result = level0.info1();
        console.logString(result);

        result = level0.info2("hello");
        console.logString(result);

        uint8 numRes = level0.infoNum();
        console.logUint(numRes);

        result = level0.info42();
        console.logString(result);

        result = level0.theMethodName();
        console.logString(result);

        result = level0.method7123949();
        console.logString(result);

        result = level0.password();
        console.logString(result);

        vm.stopBroadcast();
    }
}
```

Now the last thing to do is to call the authenticate method with the correct password as parameter. With the same method we look at the abi from the js console of the browser the correct method interface:

![Untitled](Hello%20Ethernaut%20dc1fda50a6554dd982628c35f95b8498/Untitled%2011.png)

We can see that there is one `passKey` input param and no outputs. Also, we see that the method state mutability is `nonpayable`.

Let’s create the correct interface in our Callee contract interface:

```solidity
interface Callee {
	//...
	function authenticate(string calldata) external;
}
```

and call the method from within our script:

```solidity
contract POC is Script {
    Callee level0 = Callee(0x1548f3154bbB9439762435f7526B6CEbB921B66B);
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        //...

        result = level0.password();
        console.logString(result);

        level0.authenticate(result);

        vm.stopBroadcast();
    }
}
```

After few seconds (this correspond to the time that the transaction get verified), we can see the following logs to the console:

```solidity
## Setting up 1 EVM.
==========================
Simulated On-chain Traces:

  [50038] 0x1548f3154bbB9439762435f7526B6CEbB921B66B::authenticate("ethernaut0")
    └─ ← ()

==========================

Chain 11155111

Estimated gas price: 117.520983462 gwei

Estimated total gas used for script: 65049

Estimated amount required: 0.007644622453219638 ETH

==========================

###
Finding wallets for all the necessary addresses...
##
Sending transactions [0 - 0].
⠁ [00:00:00] [###################################################################################################################] 1/1 txes (0.0s)
Transactions saved to: /home/jfrancai/repos/ethernaut/broadcast/00.s.sol/11155111/run-latest.json

Sensitive values saved to: /home/jfrancai/repos/ethernaut/cache/00.s.sol/11155111/run-latest.json

##
Waiting for receipts.
⠉ [00:00:54] [###############################################################################################################] 1/1 receipts (0.0s)
##### sepolia
✅  [Success]Hash: 0x4fbf988e4bdb9179bc921ed3286db5adf546ba0a66fdeaea05c8e339db262973
Block: 5095792
Paid: 0.003921810816665045 ETH (47095 gas * 83.274462611 gwei)

Transactions saved to: /home/jfrancai/repos/ethernaut/broadcast/00.s.sol/11155111/run-latest.json

Sensitive values saved to: /home/jfrancai/repos/ethernaut/cache/00.s.sol/11155111/run-latest.json

==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 0.003921810816665045 ETH (47095 gas * avg 83.274462611 gwei)
##
Start verification for (0) contracts
All (0) contracts were verified!

Transactions saved to: /home/jfrancai/repos/ethernaut/broadcast/00.s.sol/11155111/run-latest.json

Sensitive values saved to: /home/jfrancai/repos/ethernaut/cache/00.s.sol/11155111/run-latest.json
```

Now you can submit the instance through the Ethernaut web interface to validate the level.

Congrats ! You finished the first level of Ethernaut using the Foundry tool chain !🥳
