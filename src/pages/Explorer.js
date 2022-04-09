import React, { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { Button, Card, Table } from 'react-bootstrap';
import connect from '../utils/connect';
import HeaderAdmin from '../components/HeaderAdmin';
const { create } = require('ipfs-http-client');
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });



export default function Explorer() {
    const [txDetails, setTxDetails] = useState([]);
    let val = ethers.utils.formatEther("0x01f4");
    console.log(val);

    const fetchTxDetails = async () => {
        const txs = [];
        const details = await connect().getVaccineBatchDetails();
        console.info(details)
        for (const chunk of details) {
            if (chunk[0]) {
                console.info(chunk[0]);
                for await (const buf of ipfs.cat(chunk[0])) {
                    const data = JSON.parse(String.fromCharCode.apply(null, buf))                    
                    txs.push(data);
                }
            }
        }
        console.log(txs);
        setTxDetails([...txs]);
        
    }

    return (
        <div>
            <div><HeaderAdmin /></div>
            <div>
                <Card>
                    <Card.Title><h4>Explorer <span><Button onClick={fetchTxDetails}>Fetch Transactions</Button></span></h4></Card.Title>
                    <Card.Body>
                        <Table bordered responsive>
                            <thead>
                                <tr>                                    
                                    <th>From</th>                                    
                                    <th>To</th>
                                    <th>TimeStamp</th>
                                    <th>Amount</th>
                                    <th>DosesCount</th>
                                    <th>VaccinesOrdered</th>

                                </tr>
                            </thead>
                            <tbody>
                                {txDetails.map((tx) => (                                    
                                    <tr>                                    
                                        <td>{tx.orderMadeBy}</td>
                                        <td>{tx.orderedTo}</td>
                                        <td>{tx.orderedDate}</td>                                        
                                        <td><b>{ethers.utils.formatEther(tx.amount) + ' ETH'}</b></td>
                                        <td>{tx.dosesCount}</td>
                                        <td>{tx.vaccineType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}