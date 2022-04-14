//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract StageClearances {

    event SetOrderStatus(bytes32 indexed _orderHash, uint indexed stage);
    event StageClearanceNotValid(bytes32 indexed _orderHash, uint indexed _stage);
    event ValidateStagePassed(bytes32 indexed checkTag, bytes32 indexed toMatchTag, bool indexed check);
    event ValidateStageFailed(bytes32 indexed checkTag, bytes32 indexed toMatchTag, bool indexed check);
    event OrderRejected(bytes32 indexed _orderHash,uint indexed _stage);                    
    event NotAuthorized(string indexed description, bytes32 indexed _orderHash, bytes32 indexed _roleAccess);
    
    


    // 0xe4041c13a985afece8aab653f7b77a1e7f312381bd7738ead7806eee6c03bb1a
    bytes32 private constant SUPERADMIN = keccak256(abi.encodePacked("SUPERADMIN")); 
    // 0xd0a4b400be36d6659138e3f30e547c7f56c77a95815f2613c74058c4e8623168   
    bytes32 private constant MANUFADMIN = keccak256(abi.encodePacked("MANUFADMIN")); 
    // 0xdb5ec683ba2b7c85636003961c38cc98a1974c678bc41adee4b99e1619850ccf
    bytes32 private constant DISTRADMIN = keccak256(abi.encodePacked("DISTRADMIN"));
    // 0x5c44f32bf683e06b41e3879fe4a95055d303045b4a3e9ecfdc820b5eb9d854cd
    bytes32 private constant HEALTHCADMIN = keccak256(abi.encodePacked("HEALTHCADMIN"));

    // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

    // enum Stages{
    //     Manufactured, 
    //     ManufInspected, 
    //     ManufShipped, 
    //     DistrArrived, 
    //     DistrInspected, 
    //     DistrShipped,
    //     HealthcArrived,
    //     HealthcInspected,
    //     HealthcDelivered,
    //     Rejected
    //     }

    uint[10] public stages = [1,2,3,4,5,6,7,8,9,0];  
    struct OrderDetails{uint currentStage; bytes32[] tags;}

    mapping(bytes32 => OrderDetails) public orderMap;


    function setOrderStatus(bytes32 _roleAccess, bytes32 _orderHash, uint _stage) external {
        if (_roleAccess == MANUFADMIN){
            if (_stage <= 3){
                orderMap[_orderHash].currentStage = _stage;
                bytes32 hash = keccak256(abi.encodePacked(_orderHash, _stage));
                orderMap[_orderHash].tags.push(hash);
            } else {
                emit NotAuthorized("not authorized to update the current stage clearance.", _orderHash, _roleAccess);
                revert();
            }
            
        } else if (_roleAccess == DISTRADMIN){
            if (3 < _stage && _stage <= 6){
                orderMap[_orderHash].currentStage = _stage;
                bytes32 hash = keccak256(abi.encodePacked(_orderHash, _stage));
                orderMap[_orderHash].tags.push(hash);
            } else {
                emit NotAuthorized("not authorized to update the current stage clearance.", _orderHash, _roleAccess);
                revert();
            }
            
        } else if (_roleAccess == HEALTHCADMIN){
            if (6 < _stage && _stage <= 9){
                orderMap[_orderHash].currentStage = _stage;
                bytes32 hash = keccak256(abi.encodePacked(_orderHash, _stage));
                orderMap[_orderHash].tags.push(hash);
            } else{
                emit NotAuthorized("not authorized to update the current stage clearance.", _orderHash, _roleAccess);
                revert();
            }            
        }
    }
            

    function getCurentOrderStatus( bytes32 _orderHash, uint _i) external view returns(bytes32){
        return orderMap[_orderHash].tags[_i];
    }

    function getCurrentStage(bytes32 _orderHash) external view returns(uint){
        return orderMap[_orderHash].currentStage;
    }

    function validateOrderStatus(bytes32 _orderHash, uint _stage, uint _clearancePoint) internal {
        require(_stage <= _clearancePoint);
                bool check = false;
                bytes32 checkTag;
                bytes32 toMatchTag;                
                uint i = _stage;
                while (i != 0)
                {
                    checkTag = keccak256(abi.encodePacked(_orderHash, stages[i-1]));
                    
                    toMatchTag = orderMap[_orderHash].tags[i-1];
                    if (checkTag == toMatchTag)
                    {
                        check = true;
                        emit ValidateStagePassed(checkTag, toMatchTag, check);
                        // emit ValidateStagePassed(checkTag, toMatchTag, check);
                    } else 
                    {
                        emit ValidateStageFailed(checkTag, toMatchTag, check);                        
                        revert();                        
                    }
                    i --;
                }                
    }

    function checkOrderStatus(bytes32 _roleAccess, bytes32 _orderHash, uint _stage)external{                        
        if (_stage >= stages.length){
            emit StageClearanceNotValid(_orderHash, _stage);
            revert();
        } else 
        {
            if (_roleAccess == MANUFADMIN)
            {    
                if (_stage == 0){
                    emit OrderRejected(_orderHash, _stage);
                } else {
                    validateOrderStatus( _orderHash, _stage, 3);
                }
                
            } else if (_roleAccess == DISTRADMIN){
                if (_stage == 0){
                    emit OrderRejected(_orderHash, _stage);                    
                } else {
                    validateOrderStatus( _orderHash, _stage, 6);
                }

            } else if (_roleAccess == HEALTHCADMIN) {
                if (_stage == 0){
                    emit OrderRejected(_orderHash, _stage);
                } else {
                    validateOrderStatus( _orderHash, _stage, 9);
                }
            }
            else {
                revert();
            }
            
        }
    }

}







