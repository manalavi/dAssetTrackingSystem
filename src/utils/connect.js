import Contract_abi from '../Contract_abi.json';
import {ethers} from 'ethers';

export default function connect() {
    // connectSmartContract();
    // const role = localStorage.getItem("role");
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    // const accounts = await tempProvider.listAccounts();
    const signer = tempProvider.getSigner();
    const contractAddress = "0x16ee43328E0f7C59838a5b29315a0205BAbB3FEC";
    // const network = await tempProvider.getNetwork();
    const my_contract = new ethers.Contract(contractAddress, Contract_abi, signer);        
    return (my_contract);
}
