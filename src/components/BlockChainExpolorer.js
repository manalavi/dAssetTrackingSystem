import { render } from '@testing-library/react';
// import { ethers } from 'ethers';
import { Table } from 'react-bootstrap';

export default function BlockChainExplorer(props) {    
    return (
            // <div></div>        
            <div>
                Explorer
                <Table>
                    <thead>
                        <tr>
                            <th>Block</th>
                            <th>Transaction Account</th>
                            {/* <th>TimeStamp</th> */}
                            <th>Gas Used</th>
                            <th>Transaction Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>                            
                            <td>{props.blockNo}</td>
                            <td>{props.txAccount}</td>                            
                            <td>{props.gasPrice}</td>
                            <td>{props.mined}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
}