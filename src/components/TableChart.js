import '../App.css'
import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import UpdateOrderStatus from './UpdateOrderStatus';
import connect from '../utils/connect';
import ModalMap from './ModalMap';
const { create } = require('ipfs-http-client');
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default function TableChart() {
    var stages = ['Manufactured', 'Inspected', 'Shipped', 'Arrived', 'Inspected', 'Shipped', 'Arrived', 'Inspected', 'Shipped', 'Rejected']    
    const [modalShow, setModalShow] = useState(false);
    const [modalMapShow, setModalMapShow] = useState(false);
    const [data, setData] = useState({})
    const [txDetails, setTxDetails] = useState([]);

    const selectOrderStatus = (e) => {
        const data = {};
        e.target.parentElement.classList.toggle('selected')
        console.log("selected", e.target.parentElement.id);
        const status = document.getElementById(e.target.parentElement.id);
        // console.log(status.dataset);
        data['id'] = e.target.parentElement.id;
        data['origin'] = status.dataset.origin
        data['destn'] = status.dataset.destn
        data['startCoord'] = status.dataset.startcoord
        data['endCoord'] = status.dataset.endcoord
        data['currentStatus'] = status.dataset.currentstatus
        data['dosesCount'] = status.dataset.dosecount
        data['deliveredBy'] = status.dataset.deliveredby
        data['temp'] = status.dataset.temp
        data['orderedAt'] = status.dataset.orderedat
        data['orderHash'] = status.dataset.orderhash
        console.log(data);
        setData(data);
    }

    const fetchTxDetails = async () => {
        const txs = [];
        const details = await connect().getVaccineBatchDetails();
        // console.info(details)
        for (const chunk of details) {
            if (chunk[0]) {
                // console.info(chunk[0]);
                for await (const buf of ipfs.cat(chunk[0])) {
                    const data = JSON.parse(String.fromCharCode.apply(null, buf))
                    data['orderHash'] = chunk[0].toString()                    
                    const currStage = await fetchCurrentStage(data['orderHash'])                                        
                    data['currStage'] = currStage
                    // console.log(data['currStage']); 
                    txs.push(data)                    


                }
            }
        }
        console.log(txs);
        setTxDetails([...txs]);
    }

    const fetchCurrentStage = async(orderHash) => {
        const stages = ['Manufactured','Inspected','Shipped','Arrived','Inspected','Shipped','Arrived','Inspected','Shipped','Rejected']
        const currentIntStage = await connect().getCurrentStage(orderHash);                
        console.log(stages[currentIntStage.toString()-1],currentIntStage.toString()-1)
        return stages[currentIntStage.toString()-1]
        // console.log(currentIntStage);
        // if (stages[currentIntStage])
    }

    return (
        <div>
            <div>
                <h4 style={{ textAlign: 'left' }}>Freight Details </h4>
                <Button style={{ padding: '0.4rem' }} onClick={fetchTxDetails} >Fetch Details</Button>
            </div>
            <div style={{ textAlign: 'left', marginBottom: '0.5em' }}>
                <Button style={{ padding: '0.2rem', marginLeft: '0.5em' }} onClick={() => { setModalShow(true) }} >Update Status</Button>
                <Button style={{ padding: '0.2rem', marginLeft: '0.5em' }} onClick={() => { setModalMapShow(true) }}>Show Map </Button>
                <UpdateOrderStatus
                    show={modalShow}
                    data={data}
                    onHide={() => { setModalShow(false) }}
                />
                <ModalMap
                    show={modalMapShow}
                    data={data}
                    onHide={() => { setModalMapShow(false) }}
                />
            </div>
            <Table stipped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Frieght Id</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>Batch Count</th>
                        <th>Ordered At</th>
                        <th>Delivered By</th>                        
                        <th>Temperature</th>                        
                    </tr>
                </thead>
                <tbody>
                    {txDetails.map((tx, i) => (
                        <tr
                            id={i}
                            data-origin={tx.orderMadeBy}
                            data-destn={tx.orderedTo}
                            // data-currentStatus= 
                            data-dosecount={tx.dosesCount}
                            data-orderedat={tx.orderedDate}
                            data-deliveredby={tx.deliveryDate}
                            data-temp={tx.temperature}                            
                            data-orderHash = {tx.orderHash}
                            data-startcoord='[17.665335777641037, 78.60462888205676]'
                            data-endcoord='[18.941161114051003, 72.82725365323981]'                                                        

                            onClick={selectOrderStatus}>                            
                            {/* <td><b>{ethers.utils.formatEther(tx.amount) + ' ETH'}</b></td>*/}
                            <td>{i}</td>
                            <td >{tx.orderMadeBy}</td>
                            <td >{tx.orderedTo}</td>
                            {/* <td>17.66, 78.60</td>
                            <td>18.94, 72.82</td> */}
                            <td >{tx.currStage}</td>
                            <td >{tx.dosesCount}</td>
                            <td >{tx.orderedDate}</td>
                            <td >{tx.deliveryDate}</td>
                            <td >{tx.temperature}</td>                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
