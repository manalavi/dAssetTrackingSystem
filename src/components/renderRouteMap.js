import React, { useState } from 'react'
import {delivery} from '../utils/getFirebase'
import Map from './MainRouteMap'

export default function RenderRouteMap(){
    const [deliveries, setDeliveries] = useState(delivery);

    return(
        <Map data={deliveries}/>
    )
}