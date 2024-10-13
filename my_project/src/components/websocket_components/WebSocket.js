import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function WebSocket() {
    const [stompClient, setStompClient] = useState(null);
    const [smartMeterDataList, setSmartMeterDataList] = useState([]);
    const [forceRerender, setForceRerender] = useState(false);

    useEffect(() => {
        const initializeWebSocket = () => {
            const socket = new SockJS('http://localhost:8084/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, frame => {
                console.log("Connected: " + frame);

                stompClient.subscribe("/topic/smartMeterData", smartMeterDataMessage => {
                    const smartMeterData = JSON.parse(smartMeterDataMessage.body);

                    setSmartMeterDataList(prevSmartMeterDataList => {
                        const exists = prevSmartMeterDataList.some(
                            data => data.timestamp === smartMeterData.timestamp
                        );

                        if (!exists) {
                            return [...prevSmartMeterDataList, smartMeterData];
                        }

                        return prevSmartMeterDataList;
                    });

                    setForceRerender(prev => !prev);
                    console.log('Updated state:', smartMeterDataList);
                });

                setStompClient(stompClient);
            });
        };

        initializeWebSocket();

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
                console.log('Disconnected');
            }
        };
    }, [forceRerender]);

    const barChartData = {
        labels: smartMeterDataList.map(data => new Date(data.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Measurement Value (Bar)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: smartMeterDataList.map(data => data.measurement_value),
            },
        ],
    };

    const lineChartData = {
        labels: smartMeterDataList.map(data => new Date(data.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Measurement Value (Line)',
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75,192,192,1)',
                data: smartMeterDataList.map(data => data.measurement_value),
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false, // Set this property to false
    };
   
    return (
        <div>
            <div style={{ width: '100%' }}>
                {/* Set the Bar chart to take up 25% height and 100% width */}
                <div style={{ height: '30vh', width: '100%' }}>
                    <Bar data={barChartData} options={chartOptions} />
                </div>

                {/* Set the Line chart to take up 25% height and 100% width */}
                <div style={{ height: '30vh', width: '100%' }}>
                    <Line data={lineChartData} options={chartOptions} />
                </div>
            </div>
            <ul>
                {smartMeterDataList.slice(0).reverse().map((smartMeterData, index) => (
                    <li key={index}>
                        Timestamp: {smartMeterData.timestamp}, Device ID: {smartMeterData.device_id}, Measurement Value: {smartMeterData.measurement_value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WebSocket;
