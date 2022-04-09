import Contract_abi from '../Contract_abi.json';
import {ethers} from 'ethers';

export default function connect() {
    // connectSmartContract();
    // const role = localStorage.getItem("role");
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    // const accounts = await tempProvider.listAccounts();
    const signer = tempProvider.getSigner();
    const contractAddress = "0x9598B813eBB39A9ef77e842593cD1594ACd5DEf7";
    // const network = await tempProvider.getNetwork();
    const my_contract = new ethers.Contract(ethers.utils.getAddress(contractAddress), Contract_abi, signer);        
    return (my_contract);
}
