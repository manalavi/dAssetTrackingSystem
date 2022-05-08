import React from 'react';
import { Form, Button, Card, Row, Col, RangeSlider } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange';
import { data } from '../components/BarChart';
import HeaderAdmin from '../components/HeaderAdmin';
import connect from '../utils/connect';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

export default function ManufOrderUpdate(){    

    const fetchCurrentStage = () => {
        document.getElementById('staged').value = 'Arrived';        
    }

    const udpateOrderStatus = () => {
        console.info("updateOrderStatus");
    }

    return (
        <div>
            <div><HeaderAdmin /></div>
            <div style={{ margin: '0 15%' }}>
                <Card>
                    <Card.Title>
                        <h3>Order Stage Update</h3>
                    </Card.Title>
                    <Card.Body>
                        <Form >
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
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
                                    <Form.Control type="text" placeholder="order hash" disabled/>
                                </Col>
                            </Form.Group>
                                                        
                            <h5>Current Stage <Button onClick={fetchCurrentStage}>Fetch</Button></h5>
                            <div>
                            <h4><input id="staged" style={{textAlign:'center'}} disabled /></h4>
                            </div>

                            <div style={{marginTop:'3em'}}>                            
                                {/* <Form.Group as={Row} controlId="formHorizontalEmail"> */}
                                    <h6>*Note: Kindly check the stage clearance type twice before updating the order status.</h6>
                                {/* </Form.Group> */}
                            </div>
                            <h6 className="mt-3" >Select Stage Clearance</h6>
                            <Form.Group className="mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option value="-1">None</option>
                                    <option value="1">Manufactured</option>
                                    <option value="2">Inspected</option>
                                    <option value="3">Shipped</option>
                                    <option value="0">Rejected</option>
                                    
                                    {/* {manufaccounts.map((acc) => (
                                        <option value={acc[1]}>{`${acc[0]} - ${acc[1]}`}</option>
                                        // console.log(acc);
                                    ))} */}                                    
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" onClick={udpateOrderStatus}>                                
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}