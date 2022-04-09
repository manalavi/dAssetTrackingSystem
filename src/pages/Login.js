import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { set, ref, onValue, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Header from '../components/Header';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('');

    const [loggedIn, setLoggedIn] = useState(null);

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    // const updateDetailsFirebase = () => {
    //     const updates = {};
    //     updates["/" + `${id}` + "/" + `${name}` + "/" + "id"] = uuidv4();

    //     return update(ref(db), updates);
    // }

    // const createLoginDetails = () => {
    //     set(ref(db, `/manufacturers/${name}`), {
    //         name: name,
    //         password: pass,
    //         role: role
    //     })        
    // }

    const fetchLoginDetails = (e) => {
        e.preventDefault();
        onValue(ref(db, `/${role}/${name}`), snapshot => {
            const data = snapshot.val();
            if (data !== null) {
                if (pass === data.pass) {
                    localStorage.setItem("token", data.name);
                    localStorage.setItem("id", data.id);
                    localStorage.setItem("role", data.role);
                    let role = localStorage.getItem('role')

                    if (role.substr(-2) === 'cd') {
                        // console.log(role.substr(-2));
                        navigate(`/healthcadmin/${data.id}/dashboard`);
                    }
                    else if (role.substr(-2) === '68') {
                        // console.log(role.substr(-2));
                        navigate(`/manufadmin/${data.id}/dashboard`);
                    }
                    else if (role.substr(-2) === 'cf') {
                        // console.log(role.substr(-2));
                        navigate(`/distradmin/${data.id}/dashboard`);
                    }
                    else if (role.substr(-2) === '1a') {
                        // console.log(role.substr(-2));
                        navigate(`/admin/${data.id}/dashboard`);
                    }
                    else {
                        // console.log(role.substr(-2));
                        navigate('/login');
                    }
                    // navigate(`/admin/${data.id}`);
                } else {
                    console.log("password do not match");
                }
            } else {
                console.log("No data available", data);
            }
        });
    }

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token === null) {
            setLoggedIn(false);
        }
        console.log(token);
        console.log("logout", loggedIn);
    }, [])


    // if (loggedIn === true){
    //     navigate("/admin");
    // }

    return (
        <div>
            <div><Header /></div>
            <div className="bgLogin" style={{ padding: '8em' }}>
                <Card style={{border:'inherit', backgroundColor:'inherit'}}>
                    <Card.Title style={{color:'white'}}>Admin Login</Card.Title>
                    <Card.Body>
                        <Card.Text>
                            <div><input style={{ marginTop: '1em' }} type='text' onChange={handleNameChange} value={name} placeholder='Enter User Name' required /></div>
                            <div><input style={{ marginTop: '1em' }} type='password' onChange={handlePassChange} value={pass} placeholder='Enter Password' required /></div>
                            <div><input style={{ marginTop: '1em' }} type='text' onChange={handleRoleChange} value={role} placeholder='Enter Role' required /></div>
                            <div><Button style={{ marginTop: '1em' }} onClick={fetchLoginDetails}>Login</Button></div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            {/* <Button onClick={updateDetailsFirebase}>Uuidv4</Button> */}
        </div>
    )

}

export default Form;