import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ["Shipped", "In Production", "Delivered", "Available"],
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