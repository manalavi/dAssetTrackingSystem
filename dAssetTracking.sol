// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ISupplyChainDataPoints{
    // function addManufacturerDetails(bytes32 _roleAccess, string calldata _name, uint _phno) external;
    function addManufacturerDetails(bytes32 _roleAccess, string calldata _manufhash) external;
    // function addDistriutorDetails(bytes32 _roleAccess, string calldata _name, uint _phno) external;
    function addDistriutorDetails(bytes32 _roleAccess, string calldata _distrhash) external;
    // function addHealthCareCenterDetails(bytes32 _roleAccess, string calldata _name, uint _phno) external;
    function addHealthCareCenterDetails(bytes32 _roleAccess, string calldata _healthChash) external;
    // function addVaccineDeliveryDetails(address _account, string calldata _name, uint _phno, uint _age, string calldata _gender, uint _aadharNo) external;    
    function addVaccineDeliveryDetails(bytes32 _roleAccess, string calldata _vaccDelvhash) external;
    // function orderVaccineBatch(bytes32 _roleAccess, string calldata _vaccineType, address _to, uint _dosesCount) external;    
    function orderVaccineBatch(bytes32 _roleAccess, string calldata _orderHash, address _accountFrom, uint dosesCount, address _accountTo) external payable;

    function generateReceipt(bytes32 _roleAccess, uint _vaccineId, address _account) external;

}

abstract contract ManufacturerContract{
    struct Manufacturers{string manufacturerDetailsHash;}        
    mapping(bytes32 => mapping(address => Manufacturers)) public manufdetails;    
    
}

abstract contract DistributorContract{
    struct Distributors{string distributordetailsHash;}
    mapping(bytes32 => mapping(address => Distributors)) public distrdetails;
}

abstract contract HealthCareCenterContract{
    struct HealthCareCenters{string healthcarecenterdetailsHash;}
    mapping(bytes32 => mapping(address => HealthCareCenters)) public healthcdetails;
}

abstract contract VaccineDeliveryContract{
    struct VaccineDeliveries{string vaccinedeliverydetailsHash;}
    struct VaccineBatches{string vaccinebatchesdetailsHash;}
    struct Receipts{string receiptHash;}
    
    VaccineBatches[] public vaccinetxdetails;
    mapping(uint => mapping(address => VaccineDeliveries)) public vaccinedeliverydetails;
    mapping(uint => mapping(address => VaccineBatches)) public vaccinebatchesdetails;
    
    mapping(uint => mapping(address => Receipts)) public receiptdetails;

    // function addVaccineBatch(bytes32 _roleAccess, string calldata _vaccineType, address _to, uint _dosesCount) virtual internal returns(bytes32 hashIndexed);
    // function generateReceipt(bytes32 _roleAccess, address _from, address _to, bytes32 _hashIndexed) virtual internal returns(address ordered_from, address ordered_to, address transaction, uint dateOfOrdered, string memory vaccineOrdered);

    function addVaccineBatch(bytes32 _roleAccess, string calldata _vaccBatchhash) virtual internal;
    function storeReceipt(bytes32 _roleAccess, uint _vaccineId, address _healthAcc) virtual internal returns(VaccineBatches memory);
}

contract Main is ManufacturerContract, DistributorContract, HealthCareCenterContract, VaccineDeliveryContract,ISupplyChainDataPoints {

    // Get the current block count;
    uint public blockCount = 0;
    uint public superadminsCount = 0;
    uint public manufacturersCount = 0;
    uint public distributorsCount = 0;
    uint public healthCareCentersCount = 0;    
    uint public vaccinesOrderedCount = 0;
    uint public vaccineDeliveryPersonsCount = 0;

    
    event GrantRole(bytes32 indexed roleAccess, address indexed account, uint datatime);
    event RevokeRole(bytes32 indexed roleAccess, address indexed account, uint datatime);
    event DetailsAdded(bytes32 indexed roleAccess, address indexed account, string indexed name, uint datatime);
    event OrderedVaccineBatch(bytes32 indexed _roleAccess, address indexed account, string indexed name,uint datatime);
    event ReceiptStored(bytes32 roleAccess, address indexed account, address indexed to, uint datatime);
    event ReceiptGenerated(bytes32 roleAccess, address indexed account, address indexed to, uint datatime);
    event Receipt(bytes32 roleAccess, address indexed account, uint indexed vaccineId, uint indexed datetime);   

    event orderStatusSet(string indexed _orderHash, uint indexed stage);
    event StageClearanceNotValid(string indexed _orderHash, uint indexed _stage);
    event ValidateStagePassed(bytes32 indexed checkTag, bytes32 indexed toMatchTag, bool indexed check);
    event ValidateStageFailed(bytes32 indexed checkTag, bytes32 indexed toMatchTag, bool indexed check);
    event OrderRejected(string indexed _orderHash,uint indexed _stage);                    
    event NotAuthorized(string indexed description, string indexed _orderHash, bytes32 indexed _roleAccess); 


    struct SuperAdmin {string AdminName; uint phno; string emailId;}
    struct Account{string accName; address account; uint dosesAvailable;}
    mapping(address => SuperAdmin[]) public admindetails;    
    mapping(bytes32 => mapping(address => bool)) public rolesAccess;
    // mapping(bytes32 => Account) public getAccounts;    
    Account[] public ManufacturersAccounts;
    mapping(bytes32 => mapping(address => Account)) public getAccounts;

    uint[10] public stages = [1,2,3,4,5,6,7,8,9,0];  
    struct OrderDetails{uint currentStage; bytes32[] tags;}

    mapping(string => OrderDetails) public orderMap;

    
    constructor() {
        _grantRole(SUPERADMIN, msg.sender);
    }

    // 0xe4041c13a985afece8aab653f7b77a1e7f312381bd7738ead7806eee6c03bb1a
    bytes32 private constant SUPERADMIN = keccak256(abi.encodePacked("SUPERADMIN")); 
    // 0xd0a4b400be36d6659138e3f30e547c7f56c77a95815f2613c74058c4e8623168   
    bytes32 private constant MANUFADMIN = keccak256(abi.encodePacked("MANUFADMIN")); 
    // 0xdb5ec683ba2b7c85636003961c38cc98a1974c678bc41adee4b99e1619850ccf
    bytes32 private constant DISTRADMIN = keccak256(abi.encodePacked("DISTRADMIN"));
    // 0x5c44f32bf683e06b41e3879fe4a95055d303045b4a3e9ecfdc820b5eb9d854cd
    bytes32 private constant HEALTHCADMIN = keccak256(abi.encodePacked("HEALTHCADMIN"));

    // MANU 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    //HEALTH 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db

// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db - health

    // string val;

    modifier onlyAuthorized(bytes32 _roleAccess) {
        require(rolesAccess[_roleAccess][msg.sender], "Account Not Authorized");
        _;
    }
    

    // admin data retrieve pending if statement function ..
    function getProfileDetails(bytes32 _roleAccess, address _account) view external returns(string memory profile) {
        if (_roleAccess == MANUFADMIN) {
            profile = manufdetails[_roleAccess][_account].manufacturerDetailsHash;            
        } else if (_roleAccess == DISTRADMIN) {
            profile = distrdetails[_roleAccess][_account].distributordetailsHash;
        } else if (_roleAccess == HEALTHCADMIN) {
            profile = healthcdetails[_roleAccess][_account].healthcarecenterdetailsHash;
        } 
    }

    function _grantRole(bytes32 _roleAccess, address _account) internal{
        rolesAccess[_roleAccess][_account] = true;
        admindetails[_account].push(SuperAdmin('Vinay',8888888888, 'mm@eductech.com'));
        emit GrantRole(_roleAccess, _account, block.timestamp);
    }

    function grantRole(bytes32 _roleAccess, address _account, string calldata _name) external onlyAuthorized(SUPERADMIN){
        uint dosesCount = 0;
        if (_roleAccess == DISTRADMIN){                   
             distributorsCount ++;                  
             dosesCount = 0;
        } else if (_roleAccess == MANUFADMIN){
            manufacturersCount ++;
            dosesCount = 500;
        } else if (_roleAccess == HEALTHCADMIN){
            healthCareCentersCount++;
            dosesCount = 0;
        }        
        rolesAccess[_roleAccess][_account] = true;                
        Account memory newAccount = (Account(_name, _account, dosesCount));
        getAccounts[_roleAccess][_account] = newAccount;
        if (_roleAccess == MANUFADMIN){
            ManufacturersAccounts.push(newAccount);
        }
        
        emit GrantRole(_roleAccess, _account, block.timestamp);
    }    

    function revokeRole(bytes32 _roleAccess, address _account) external onlyAuthorized(SUPERADMIN){
        rolesAccess[_roleAccess][_account] = false;
        emit RevokeRole(_roleAccess, _account, block.timestamp);        
    }

    function addManufacturerDetails(bytes32 _roleAccess, string calldata _manufhash) override external onlyAuthorized(MANUFADMIN) {
        if (_roleAccess == MANUFADMIN){            
            manufdetails[_roleAccess][msg.sender].manufacturerDetailsHash = _manufhash;            
            emit DetailsAdded(_roleAccess, msg.sender, "Manufacturer", block.timestamp);
        }        
    }
    
    function getManuAccounts() public view returns(Account[] memory) {
        return ManufacturersAccounts;        
    }    

    function addDistriutorDetails(bytes32 _roleAccess, string calldata _distrhash) override external onlyAuthorized(DISTRADMIN) {
        if (_roleAccess == DISTRADMIN){            
            distrdetails[_roleAccess][msg.sender].distributordetailsHash = _distrhash;
            emit DetailsAdded(_roleAccess, msg.sender, "Distributor", block.timestamp);
        }        
    }

    function addHealthCareCenterDetails(bytes32 _roleAccess, string calldata _healthChash) override external onlyAuthorized(HEALTHCADMIN) {
        if (_roleAccess == HEALTHCADMIN){            
            healthcdetails[_roleAccess][msg.sender].healthcarecenterdetailsHash = _healthChash;

            emit DetailsAdded(_roleAccess, msg.sender, "HealthCareCenter", block.timestamp);
        }        
    }

    function addVaccineDeliveryDetails(bytes32 _roleAccess, string calldata _vaccDelvhash) override external onlyAuthorized(SUPERADMIN) {
        if (_roleAccess == SUPERADMIN){            
            vaccinedeliverydetails[vaccineDeliveryPersonsCount][msg.sender].vaccinedeliverydetailsHash = _vaccDelvhash;
            
            emit DetailsAdded(_roleAccess, msg.sender, "Vaccine Delivery Details", block.timestamp);
        }        
    }
    // when the healthcarecenter ordered the vacinebatch will send the notification and inside it pass the vaccinesOrderedCount to the manufacturersCount
    //  to get the index and store the receipt.    
    function addVaccineBatch(bytes32 _roleAccess, string calldata _vaccBatchhash) override internal onlyAuthorized(HEALTHCADMIN){
        if (_roleAccess == HEALTHCADMIN){            
            vaccinesOrderedCount ++;     
            VaccineBatches memory newbatch = VaccineBatches(_vaccBatchhash);            
            vaccinetxdetails.push(newbatch);       
            vaccinebatchesdetails[vaccinesOrderedCount][msg.sender].vaccinebatchesdetailsHash = _vaccBatchhash;
            _setOrderStatus(_vaccBatchhash ,1);            
            // bytes32 _roleAccess, bytes32 _orderHash, uint _stage)

            // return (msg.sender, vaccinesOrderedCount);
        }        
    }
    
    function getVaccineBatchDetails() external view returns(VaccineBatches[] memory txdetails) {        
        txdetails = vaccinetxdetails;
    }
    // when the maufacturer will receive the notification then he will acknowledge and pass the credential as index to store the receipt.
    function storeReceipt(bytes32 _roleAccess, uint _vaccineId, address _healthAcc) override view internal onlyAuthorized(MANUFADMIN) returns(VaccineBatches memory vaccinereceipt){
        if (_roleAccess == MANUFADMIN){                         
            // receiptdetails[_vaccineId][msg.sender] = temphash;
            vaccinereceipt = vaccinebatchesdetails[_vaccineId][_healthAcc];
            return (vaccinereceipt);
            // emit ReceiptStored(_roleAccess, _healthAcc, msg.sender, block.timestamp);
        }        
    }    

    function getManufDoseCount(address _accountTo) external view returns(uint){
        return getAccounts[MANUFADMIN][_accountTo].dosesAvailable;
    }

    function orderVaccineBatch(bytes32 _roleAccess, string calldata _orderHash, address _accountFrom, uint dosesCount, address _accountTo) override external payable onlyAuthorized(HEALTHCADMIN) {
        // uint txg = tx.gasprice;
        // uint txn = block.number;
        getAccounts[_roleAccess][_accountFrom].dosesAvailable += dosesCount;
        getAccounts[MANUFADMIN][_accountTo].dosesAvailable -= dosesCount;
        addVaccineBatch(_roleAccess, _orderHash);                        
        // emit Ordered(txn,txg);
        // storeReceipt(_roleAccess, _vaccineId, _healthAcc);

        emit OrderedVaccineBatch(_roleAccess, msg.sender, "Vaccine Batch Ordered", block.timestamp);
    }

    function generateReceipt(bytes32 _roleAccess, uint _vaccineId, address _account) override external  onlyAuthorized(MANUFADMIN){
        // receiptgenhash = vaccinebatchesdetails[_vaccineId][_account];
        storeReceipt(_roleAccess, _vaccineId, _account);

        emit Receipt(_roleAccess, msg.sender, _vaccineId, block.timestamp);
    }

    function _setOrderStatus(string calldata _orderHash, uint _stage) internal {
        orderMap[_orderHash].currentStage = _stage;
        bytes32 hash = keccak256(abi.encodePacked(_orderHash, _stage));
        orderMap[_orderHash].tags.push(hash);

    }

    function setOrderStatus(bytes32 _roleAccess, string calldata _orderHash, uint _stage) external {
        bool valid = checkOrderStatus(_roleAccess, _orderHash, _stage-1);
        if (valid){
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
    }
            

    function getCurentOrderStatus( string calldata _orderHash, uint _i) external view returns(bytes32){
        return orderMap[_orderHash].tags[_i];
    }        

    function getCurrentStage(string calldata _orderHash) external view returns(uint){
        return orderMap[_orderHash].currentStage;
    }    

    function validateOrderStatus(string calldata _orderHash, uint _stage, uint _clearancePoint) internal returns(bool){
        // require(_stage <= _clearancePoint);
        bool check = false;
        if (_stage <= _clearancePoint){            
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
        return check;
    }

    function checkOrderStatus(bytes32 _roleAccess, string calldata _orderHash, uint _stage) internal returns(bool){                        
        bool valid = false;
        if (_stage >= stages.length){
            emit StageClearanceNotValid(_orderHash, _stage);
            revert();
        } else 
        {            
            if (_roleAccess == MANUFADMIN)
            {    
                if (_stage == 0){
                    // emit OrderRejected(_orderHash, _stage);
                } else {
                    valid = validateOrderStatus( _orderHash, _stage, 3);
                }
                
            } else if (_roleAccess == DISTRADMIN){
                if (_stage == 0){
                    // emit OrderRejected(_orderHash, _stage);                    
                } else {
                    valid = validateOrderStatus( _orderHash, _stage, 6);
                }

            } else if (_roleAccess == HEALTHCADMIN) {
                if (_stage == 0){
                    // emit OrderRejected(_orderHash, _stage);
                } else {
                    valid = validateOrderStatus( _orderHash, _stage, 9);
                }
            }
            
        }
        return valid;
    }

}
