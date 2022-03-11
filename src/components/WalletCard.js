import React, {useState} from "react";
import {ethers, providers} from 'ethers';
import {Button} from 'react-bootstrap';
import Contract_abi from '../Contract_abi.json';
// import {ipfs} from 'nano-ipfs-store';

const WalletCard = () => {
    
    // const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Metamask');   
    const [errorMessage, setErrorMessage] = useState("");
    
    // const [signer, setSigner] = useState('');
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    // provider = new ethers.providers.Web3Provider(window.ethereum, "any");    

    const connectWalletHandler = async() => {    
    
    // await provider.send('eth_requestAccounts',[]);
    // // console.log(useraccount);
    // const signer = provider.getSigner();

    //     (async function(){
    //         let userAddress = await signer.getAddress();
    //         accountChangedHandler(userAddress);                
    //     })();
        if (window.ethereum && window.ethereum.isMetaMask) {
            // metamask is here
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(res => {
                accountChangedHandler(res[0]);
                setConnButtonText("Wallet Connected");
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
        }else {
            setErrorMessage("Install Metamask");
        }    

        // connectSmartContract();
    }

    const accountChangedHandler = (newAccount) => {
        // account = newAccount;
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
    }

    const getUserBalance = async(account) => {
        window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
        })
        // let balance = await provider.getBalance(account);
        // balance = ethers.utils.formatEther(balance);
        // console.log(balance);
        // console.log(await provider.getBlockNumber());
        // console.log(ethers.utils.parseEther("1.0"));
        // setUserBalance(balance);
    }

    const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);
    
    // var accounts = null;
    // const connectSmartContract = async() => {
    //     const tempProvider = new ethers.providers.Web3Provider(window.ethereum);                
    //     setProvider(tempProvider);
    //     // accounts = await tempProvider.listAccounts();
    //     const signer =  tempProvider.getSigner();
    //     const contractAddress = "0x86bAe948b1946Ac54644692da9C88ccF7Bc772b3";
    //     // const network = await tempProvider.getNetwork();
    //     const my_contract = new ethers.Contract(contractAddress, Contract_abi, signer);
    //     setContract(my_contract);
    // }

    // const setStorage = (event) => {              
    //     event.preventDefault();
    //     const v = document.getElementById("storagevalue").value;
    //     // console.log(v);
    //     contract.setName(v);        
    // }

    // const [value, setValue] = useState(null);

    // const fetchStorage = async() => {
    //     const accounts = await provider.listAccounts();
    //     const val = await contract.admindetails(accounts[0],0);
    //     console.log(val.emailId);
    //     // setValue(val);
    // }

    
    

    return(
        <div className="WalletCard">
            <h4>{"Connection to metamask with window.ethereum.methods"}</h4>
            <Button onClick={connectWalletHandler}>{connButtonText}</Button>
            <div>
                <br></br>
            <input placeholder="enter value" id="storagevalue"></input>
            {/* <Button onClick={setStorage}>SetName</Button>    
            <Button onClick={fetchStorage}>GetName</Button> */}
            {/* <h3>Value: {value}</h3>                 */}
            </div>
            <div className="accountDisplay">
                <h3>Address: {defaultAccount}</h3>                
            </div>
            <div className="accountBalance">
                <h3>Balance: {userBalance}</h3>
                <h2>{errorMessage}</h2>                                
            </div>            
        </div>
    )

}

export default WalletCard;