pragma solidity ^0.4.0;

contract HelloWorld {
    string public myStateVariable = "Hello World :D";

    function modifyVariable(string newValue) {
        myStateVariable = newValue;
    }
}
