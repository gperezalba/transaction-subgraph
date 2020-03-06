pragma solidity 0.5.0;

contract GraphTransaction {
    
    mapping(address => uint) public balances;
    
    event Transfer(address sender, address receiver, uint amount, string concept);
    
    constructor() public {
        
    }
    
    function balanceOf(address _who) public view returns(uint) {
        return balances[_who];
    }
    
    function transfer(uint _value, address _to, string memory _data) public {
        balances[_to] = balances[_to] + _value;
        
        emit Transfer(msg.sender, _to, _value, _data);
    }
}