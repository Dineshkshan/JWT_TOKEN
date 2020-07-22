import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function MainPage(props) {

    const [items, setItems] = useState([]);
    const header = {
        'auth': JSON.parse(localStorage.getItem('auth'))
    }
    console.log(header);
    useEffect(() => {
        axios.get('http://localhost:5000/get', {
            headers: { auth: JSON.parse(localStorage.getItem('auth')) }
        })
            .then(resp => {
                setItems(resp.data);
            });
    }, [])

    function deletevalue()
    {
        localStorage.removeItem('auth');
        props.history.push("/");
    }
    return (
        <>
        <ul>
            {
                items.map((item) =>
                    <li>{item._id} &emsp;          
                    {item.Username} &emsp;
                    {item.Email}</li> 
                )
            }
        </ul>
        <button className="btn btn-primary" onClick={deletevalue}>Signout</button>
        </>
    );
}
