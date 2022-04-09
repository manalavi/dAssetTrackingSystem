import React, { useState } from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import Map from '../components/MainRouteMap'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { delivery } from '../utils/getFirebase'
import FreightCard from './FrieghtCard'


export default function RouteMap() {

    const [deliveries, setDeliveries] = useState(delivery);

    return (
        <div>
            <div>
                <HeaderAdmin />
            </div>
            <div>
                {/* <Map/> */}
                <Card>
                    <Card.Title>Freight Details with Route</Card.Title>
                    <Card.Body>
                        <Container fluid style={{ margin: '0' }}>
                            {/* <Row fluid xl={12} md={12} style={{ margin: '0', textAlign: 'center' }}><h4></h4></Row> */}
                            <Row xl={12} md={12} style={{ margin: '0' }} >
                                <Col xl={3} md={3} style={{ marginRight: '0em', height: '100vh'}} responsive>
                                    <div style={{ overflowY: 'scroll' }}>                                                                                
                                        <FreightCard data={deliveries}/>
                                        {/* <Card border="primary" style={{ width: 'inherit', textAlign: 'left', marginTop: '1em' }}>
                                    <Card.Header>Freight: 01</Card.Header>
                                    <Card.Body>
                                        <Card.Text style={{ listStyle: 'none' }}>
                                            <li>Order Status: Arrived</li>
                                            <li>Start: SII Pune</li>
                                            <li>Destination: General Hospital</li>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>                                
                                <Card border="primary" style={{ width: 'inherit', textAlign: 'left', marginTop: '1em' }}>
                                    <Card.Header>Freight: 01</Card.Header>
                                    <Card.Body>
                                        <Card.Text style={{ listStyle: 'none' }}>
                                            <li>Order Status: Arrived</li>
                                            <li>Start: SII Pune</li>
                                            <li>Destination: General Hospital</li>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>                                
                                <Card border="primary" style={{ width: 'inherit', textAlign: 'left', marginTop: '1em' }}>
                                    <Card.Header>Freight: 01</Card.Header>
                                    <Card.Body>
                                        <Card.Text style={{ listStyle: 'none' }}>
                                            <li>Order Status: Arrived</li>
                                            <li>Start: SII Pune</li>
                                            <li>Destination: General Hospital</li>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card border="primary" style={{ width: 'inherit', textAlign: 'left', marginTop: '1em' }}>
                                    <Card.Header>Freight: 01</Card.Header>
                                    <Card.Body>
                                        <Card.Text style={{ listStyle: 'none' }}>
                                            <li>Order Status: Arrived</li>
                                            <li>Start: SII Pune</li>
                                            <li>Destination: General Hospital</li>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>                                 */}
                                    </div>
                                </Col>
                                <Col xl={9} md={9} style={{ marginRight: '0em', padding: '0' }}>
                                    <Map data={deliveries} />
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}