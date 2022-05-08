import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);
let status;
const role = localStorage.getItem('role');
// var admin = '';
if (role.substr(-2) === 'cd'){
    // console.log(role.substr(-2));
    // admin = 'healthcadmin'
    status = ['Arrived','Inspected','Delivered', 'Rejected']
}
else if (role.substr(-2) == '68'){
    // console.log(role.substr(-2));
    // admin = 'manufadmin'
    status = ['Manufactured','Inspected','Shipped', 'Rejected']
}
else if (role.substr(-2) === 'cf'){
    // console.log(role.substr(-2));
    // admin = 'distradmin'
    status = ['Arrived','Inspected','Shipped', 'Rejected']
}


const data = {
    labels: status,
    datasets: [{
        data: [12, 4, 3, 5],
        backgroundColor: ["red", "orange","green", "blue"],
        // borderColor:["red", "orange","green", "blue"],
        borderWidth: 2
    }],
}
const DoughnutChart = () => {

    return (
        <div>
            <div style={{width:"100%", margin: "1px auto"}}>
                <Doughnut data={data} />
            </div>
        </div>
    );
}

export default DoughnutChart;