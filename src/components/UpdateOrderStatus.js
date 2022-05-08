import React, { useState } from 'react'
import { ethers } from 'ethers';
import connect from '../utils/connect';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

export default function UpdateOrderStatus(props) {
    const admin = localStorage.getItem('admin');
    console.log(admin, "Admin")
    var data = props.data;
    var stages = ['Manufactured', 'Inspected Stage1', 'Shipped Stage1', 'Arrived Stage1', 'Inspected Stage2', 'Shipped Stage2', 'Arrived Stage2', 'Inspected Stage3', 'Delivered Accepted', 'Rejected']
    var adminStages = [];
    var currentStage = 1;
    if (admin === 'distradmin') {
        // console.log(role.substr(-2));
        // admin = 'distradmin'
        adminStages = stages.slice(3, 6)
        adminStages.push(stages.slice(-1))
        // console.log(adminStages);
    }
    else if (admin === 'manufadmin') {
        // console.log(role.substr(-2));
        // admin = 'manufadmin'
        adminStages = stages.slice(0, 3)
        adminStages.push(stages.slice(-1))
        // console.log(adminStages);
    }
    else if (admin === 'healthcadmin') {
        // console.log(role.substr(-2));
        // admin = 'healthcadmin'
        adminStages = stages.slice(6, 10)
        // console.log(adminStages);
        // adminStages.push(stages[-1])
    }
    const fetchCurrentStage = async () => {
        console.log(data)
        currentStage = await connect().getCurrentStage(data.orderHash);
        currentStage = parseInt(currentStage.toString()) - 1
        // currentStage = 4
        // console.log(currentStage,"currentstage from getmethod..")
        console.log("Current Stage", currentStage);
        document.getElementById('staged').value = stages[currentStage];
        if (stages[currentStage] < stages.length) {
            document.getElementById('warning').innerText = `Suggestion: Current stage clearance shoule be selected: ${stages[currentStage]}...`;
        }
    }

    const checkUpdateStage = async () => {
        const role = document.getElementById('fetchRole').value;
        const orderHash = data.orderHash
        const select = document.getElementById('selectedStage').value;

        let overrides = {
            value: ethers.utils.parseEther("0.1")     // ether in this case MUST be a string
        }

        if (select == 'Rejected') {
            console.log("Order Rejected..");
        } else {
            console.log(currentStage, (stages.indexOf(select)-1));
            if ((stages.indexOf(select) - 1) !== currentStage) {
                document.getElementById('warning').innerText = 'Warning: Do not attempt to stage clearance, the order may be rejected.'
                console.log("Not valid credentilas to update the stage clearance...")
            } else {
                console.log(admin)
                let valid = false;
                let nextStage;
                if (select === 'Rejected') {
                    nextStage = 0
                    console.log("Order is rejected..");
                }
                if (admin === 'manufadmin' && role) {
                    if (select === 'Manufactured') nextStage = 1
                    else if (select === 'Inspected Stage1') nextStage = 2
                    else if (select === 'Shipped Stage1') nextStage = 3
                    valid = true
                    console.log(nextStage, "manufadmin");
                }
                else if (admin === 'distradmin' && role) {
                    if (select === 'Arrived Stage1') nextStage = 4
                    else if (select === 'Inspected Stage2') nextStage = 5
                    else if (select === 'Shipped Stage2') nextStage = 6
                    if (select === 'Rejected') nextStage = 0
                    valid = true
                    console.log(nextStage, "distradmin");
                }
                else if (admin === 'healthcadmin' && role) {
                    if (select === 'Arrived Stage2') nextStage = 7
                    else if (select === 'Inspected Stage3') nextStage = 8
                    else if (select === 'Delivered Accepted') nextStage = 9
                    if (select === 'Rejected') nextStage = 0
                    valid = true
                    console.log(nextStage, "healthcadmin");
                    }
                else {
                    console.log("Check the role and admin role logged in...")
                }
                if (valid) {                    
                    console.log(nextStage);
                    const ch = await connect().setOrderStatus(role, orderHash, nextStage)
                    ch.wait()
                    document.getElementById('warning').innerText = 'Updation successfull'                
                }                
            }
        }
    }    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Freight Status - {data.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                <Form >
                    <Form.Group as={Row} className="mb-3" controlId="fetchRole">
                        <Form.Label column sm={2}>
                            Enter Role:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Role" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Order Hash:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder={data.orderHash} value={data.orderHash} disabled />
                        </Col>
                    </Form.Group>

                    <h5>Current Stage <Button onClick={fetchCurrentStage}>Fetch</Button></h5>
                    <div>
                        <h4><input id="staged" style={{ textAlign: 'center' }} disabled /></h4>
                    </div>

                    <div style={{ marginTop: '3em' }}>
                        {/* <Form.Group as={Row} controlId="formHorizontalEmail"> */}
                        <h6>*Note: Kindly check the stage clearance type twice before updating the order status.</h6>
                        <h5 id="warning"></h5>
                        {/* </Form.Group> */}
                    </div>
                    {/* <h6 className="mt-3" >Select Stage Clearance</h6> */}
                    <Form.Group className="mb-3">
                        <Form.Select id="selectedStage" aria-label="Select stage clearance">
                            <option className="mt-3" >Select Stage Clearance</option>
                            {adminStages.map((stg) => (
                                <option value={stg}>{stg}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" onClick={checkUpdateStage} >
                        Verify & Submit
                    </Button>                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}