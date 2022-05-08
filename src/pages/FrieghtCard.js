import '../App.css'
import blueC from '../images/blueC.png'
import greenC from '../images/greenC.png'
import darkgreenC from '../images/darkgreen.png'
import React, { useState } from 'react';
import { Button, Table, Form, Card } from 'react-bootstrap';
// import UpdateOrderStatus from './UpdateOrderStatus';
import connect from '../utils/connect';
import { propTypes } from 'react-bootstrap/esm/Image';
// import ModalMap from './ModalMap';
const { create } = require('ipfs-http-client');
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default function FreightCard(props) {

    // const [data, setData] = useState({})
    const [txDetails, setTxDetails] = useState([]);
    const [shipments, setShipments] = useState([props.data]);
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

    const fetchCurrentStage = async (orderHash) => {
        const stages = ['Manufactured', 'Inspected', 'Shipped', 'Arrived', 'Inspected', 'Shipped', 'Arrived', 'Inspected', 'Shipped', 'Rejected']
        const currentIntStage = await connect().getCurrentStage(orderHash);
        console.log(stages[currentIntStage.toString() - 1], currentIntStage.toString() - 1)
        return stages[currentIntStage.toString() - 1]
        // console.log(currentIntStage);
        // if (stages[currentIntStage])
    }

    return (
        <div>
            <h5>Shipments <Button onClick={fetchTxDetails}>Fetch</Button></h5>
            {txDetails.map((tx, i) => (
                <Card border="primary" style={{ width: 'inherit', textAlign: 'left', marginTop: '1em' }}>
                    <Card.Header>Freight: {i}</Card.Header>
                    <Card.Body>
                        <Card.Text style={{ listStyle: 'none' }}>
                            <li>Order Stage: <b>{tx.currStage}</b></li>
                            <li>Start: {tx.orderedTo}</li>
                            <li>Destination: {tx.orderMadeBy}</li>
                            <li>Batch Count: {tx.dosesCount}</li>
                            <li>Vaccine Temp: {tx.temperature}</li>
                            <li>Order at: {tx.orderedDate}</li>
                            <li>Delivery Date: {tx.deliveryDate}</li>
                            {/* Delivery details and delivery status with delivery color marker */}
                            {shipments.map((d, idx) => (
                                (i % 3 === 0) ? <Card.Text><li>delivery Id: d2</li><li>status: true</li><li>marked by:<img style={{marginLeft:'1em',width:'30px'}}src={greenC} alt="green marker" /></li></Card.Text>
                                    : (i % 2 === 0) ? <Card.Text><li>delivery Id: d1</li><li>status: true</li><li>marked by: <img style={{marginLeft:'1em',width:'30px'}} src={blueC} alt="blue marker" /></li></Card.Text> : <Card.Text><li>delivery Id: d3</li><li>status: true</li><li>marked by: <img style={{marginLeft:'1em',width:'30px'}} src={darkgreenC} alt="darkgreen marker" /></li></Card.Text>
                            ))}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}