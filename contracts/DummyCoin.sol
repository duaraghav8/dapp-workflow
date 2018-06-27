pragma solidity 0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract DummyCoin is MintableToken {
    string public name = "DUMMY COIN";
    string public symbol = "DMC";
    uint8 public decimals = 18;
}
