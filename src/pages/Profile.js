import { ethers } from 'ethers';
import React, { useState } from 'react';
// import { ethers } from 'ethers';
import { Card, FormControl, Col, Row, Button, InputGroup } from 'react-bootstrap';
import connect from '../utils/connect';
import HeaderAdmin from '../components/HeaderAdmin'

const role = localStorage.getItem("role");
const roleName = localStorage.getItem("roleName");

export default function Profile() {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [data, setData] = useState({
        txAccount: "",
        mined: "",
        gasPrice: "",
        blockNo: "",
    });    
    const [manufprofile, setManufProfile] = useState({
        name: "",
        location: "",
        vaccinesProduced: ""
    });
    // const [roleName, setRoleName] = useState(null);    
    // (async () => {        
    // })();

    const fetchProfile = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        setDefaultAccount(accounts[0]);
        setContract(connect());
        // setContract(conn);
        // const res = await contract.admindetails(defaultAccount,0);            
        // console.log(res);
        contract.addHealthCareCenterDetails("0x5c44f32bf683e06b41e3879fe4a95055d303045b4a3e9ecfdc820b5eb9d854cd", "bafkreibvruivj5r5tec7a7fa5ugbp23ndtqzmjfe5uxfhlmsaiop5h5dfu")
            .then(r => {
                setData({
                    txAccount: r.from,
                    mined: r.hash,
                    gasPrice: (r.gasPrice).toString(),
                    blockNo: 1
                });
                console.log(r.gasPrice);
                console.log(data);
            })
        console.log(data);
        // contract.grantRole("0x5c44f32bf683e06b41e3879fe4a95055d303045b4a3e9ecfdc820b5eb9d854cd",accounts[0])
        // .then(r => {
        //     console.log(r);
        //     {<BlockChainExplorer blockNo={1} txAccount={r.from} gasPrice={parseInt(r.gasPrice)} mined={r.hash}/>}        
        // });
        // const res = await contract.getProfileDetails("0xd0a4b400be36d6659138e3f30e547c7f56c77a95815f2613c74058c4e8623168",defaultAccount);
        // let json = await ipfs.cat(res);
        // const p = JSON.parse(json);
        // console.log(p);
        // setManufProfile({
        //     name: p.name,            
        //     location: p.location,
        //     vaccinesProduced: p.vaccineProduced
        // })
        // {<BlockChainExplorer blockNo={1} txAccount={data.name} gasPrice={parseInt(data.location)} mined={data.vaccineProduced}/>}
        // 0x16D93488202bf37BF9952ccF31b80935DB90E067
    }

    return (
        <div>            
            <HeaderAdmin />
            <Card>
                <Card.Body>
                    <Card.Title>{roleName} Details <Button onClick={fetchProfile}>Fetch Profile</Button> </Card.Title>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Manufacturer :</InputGroup.Text>
                                        <FormControl
                                            placeholder="SII Pune"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            disabled
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>RoleID :</InputGroup.Text>
                                        <FormControl
                                            placeholder={manufprofile.name}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            disabled
                                        />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Vaccines Produced: </InputGroup.Text>
                                        <FormControl
                                            placeholder={manufprofile.vaccinesProduced}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            disabled
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>Address: </InputGroup.Text>
                                        <FormControl
                                            placeholder={manufprofile.location}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            disabled
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    );
}