import React from 'react';
import { db } from './firebase'
import {ref, onValue} from "firebase/database";

export const delivery = {};

onValue(ref(db, 'freightTracker/d1/'), snapshot => {
    const data = snapshot.val();
    //console.log(data);
    delivery.d1 = data;
});
onValue(ref(db, 'freightTracker/d2/'), snapshot => {
    const data = snapshot.val();
    //console.log(data);
    delivery.d2 = data;
});
onValue(ref(db, 'freightTracker/d3/'), snapshot => {
    const data = snapshot.val();
    //console.log(data);
    delivery.d3 = data;
});

    // console.info(delivery) 
