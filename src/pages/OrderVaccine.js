import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, RangeSlider } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange';
import { data } from '../components/BarChart';
import HeaderAdmin from '../components/HeaderAdmin';
import connect from '../utils/connect';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
const {create} = require('ipfs-http-client');
const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})



export default function OrderVaccine() {
    const [userRole, setUserRole] = useState('');
    const [ischecked, setIsChecked] = useState(false);
    const [vaccines, setVaccines] = useState([]);
    const [manufaccounts, setManufAccounts] = useState([]);
    const [toAccount, setToAccount] = useState(null);
    const [dosesCount, setDoseCount] = useState();
    const [vaccineCount, setVaccineCount] = useState([]);    

    const navigate = useNavigate()

    // localStorage.setItem("token",data.name);
    // localStorage.setItem("id", data.id);
    // localStorage.setItem("role", data.role);    
    const handleDoseCount = (e) => {
        const vaccine = e.target.name;        
        const doseCount = e.target.id;
        const vaccinesDoseCount = vaccineCount;
        vaccines.map((dose) => {
            console.log(dose, vaccine);
            if (dose == vaccine) { 
                const idx = vaccines.indexOf(vaccine);
                if (vaccinesDoseCount.indexOf(idx)){
                    vaccinesDoseCount[idx] = doseCount
                } else {
                    vaccinesDoseCount.push(doseCount)
                }
                setVaccineCount(vaccinesDoseCount)  
            }
        })
        console.log(vaccineCount);
    }


    const handleChange = (e) => {
        const isChecked = e.target.checked;
        console.log(e.target.id, e.target.checked);
        const value = e.target.id;
        const data = vaccines;
        if (isChecked) {
            data.push(value)
            setVaccines(data)
        } else {
            let index = data.indexOf(value);
            data.splice(index, 1)
            console.log(data);
            setVaccines(data);
        }

    }
    //0xe9Af5B0cDEed0a2C863481e553B09f6E341F6865 - manu acc
    const fetchManufAccounts = async (e) => {
        // setContract(connect());
        // const manufacturerCount = await contract.manufacturersCount();        
        const accounts = await connect().getManuAccounts("0xd0a4b400be36d6659138e3f30e547c7f56c77a95815f2613c74058c4e8623168");
        setManufAccounts(accounts);
        setToAccount(e.target.value);        

    }

    const orderVaccineBatch = async () => {

        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        const address = await tempProvider.listAccounts();
        const totalDoseCount = vaccineCount.reduce((sum, a) => parseInt(sum) + parseInt(a), 0)

        let overrides = {
            value: ethers.utils.parseEther("0.1")     // ether in this case MUST be a string
        }

        let date = new Date();
        const stringDate = `${date.getMonth()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;
        {/* <td>{(tx.date).getMonth() +'-'+(tx.date).getMonth()+ '-'+(tx.date).getFullYear()+', '+(tx.date).getHours()+':'+(tx.date).getMinutes()+':'+ (tx.date).getMilliseconds()}</td> */}
        const data = JSON.stringify({
            roleAccess: localStorage.getItem("role"),
            orderMadeBy: localStorage.getItem("token"),
            orderedTo: manufaccounts[0][0],
            vaccineType: vaccines,
            to: toAccount,
            from: address[0],
            date: stringDate,
            amount: overrides.value,
            dosesCount: totalDoseCount,            
            covishield: vaccineCount[0],
            covaxin: vaccineCount[1],
            sputnik: vaccineCount[2],            
        })        
        const orderHash = await ipfs.add(data);        
        console.info(orderHash.path)
        const orderverifyHash = orderHash.path
        const tx = await connect().orderVaccineBatch(localStorage.getItem('role'), orderverifyHash, overrides);
        console.log(tx);        
        navigate(`/admin/${localStorage.getItem("id")}/explorer`)
    }

    return (
        <div>
            <div><HeaderAdmin /></div>
            <div style={{ margin: '0 15%' }}>
                <Card>
                    <Card.Title>
                        <h3>Order Vaccine Batch</h3>
                    </Card.Title>
                    <Card.Body>
                        <Form >
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Enter Role
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Role" />
                                </Col>
                            </Form.Group>
                            <h5>Select Vaccine</h5>
                            <div style={{ margin: '0 40%' }}>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    {['Covishield', 'Covaxin', 'Sputnik'].map((type) => (
                                        <div key={`${type}`} className="mt-3">
                                            <Form.Check
                                                type="checkbox"
                                                id={`${type}`}
                                                label={`${type}`}
                                                title={`${type}`}
                                                // checked={ischecked}
                                                onChange={handleChange}
                                            />

                                            {[50, 100, 150].map((dcount) => (
                                                <Form.Check
                                                    key={dcount}
                                                    id={dcount}
                                                    inline
                                                    name={`${type}`}
                                                    type="radio"
                                                    aria-label="radio"
                                                    label={`${dcount}`}
                                                    title={`${type}`}
                                                    onChange={handleDoseCount}
                                                />

                                            ))}
                                        </div>
                                    ))}
                                </Form.Group>
                            </div>
                            {/* <div className='mt-5' >
                                <h6>Select Doses Count</h6>
                                <span>Note: prefer dose count to be round of 100</span>
                                <Form.Group as={Row}>
                                    <Col xs="9">
                                        <FormRange
                                            value={dosesCount}
                                            onChange={e => setDoseCount(e.target.value)}
                                            min={50}
                                            max={500}
                                        />
                                    </Col>
                                    <Col xs="3">
                                        <Form.Control value={dosesCount} />
                                    </Col>
                                </Form.Group></div> */}
                            <h6 className="mt-3" >Select Manufacturer Account</h6>
                            <Form.Group className="mb-3">
                                <Form.Select aria-label="Default select example" onClick={fetchManufAccounts}>
                                    <option>Select Manufacturer's Account</option>
                                    {manufaccounts.map((acc) => (
                                        <option value={acc[1]}>{`${acc[0]} - ${acc[1]}`}</option>
                                        // console.log(acc);
                                    ))}

                                    {/* <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option> */}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            </Form.Group>
                            <Button variant="primary" onClick={orderVaccineBatch}>
                                {/* on submit connect with ipfs and pass tx data to explorer */}
                                {/* generate receipt function to be added */}
                                {/* add the generate receipt button to the explorer */}
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>)
}