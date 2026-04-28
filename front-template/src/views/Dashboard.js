import React, { useState, useEffect } from 'react';
import Lista from '../components/Lista';
import Formulario from '../components/Formulario';

const Dashboard = () => {
    const [bets, setBets] = useState([]);
    const [betStates, setBetStates] = useState([]);

    const fetchBets = async () => {
        const res = await fetch('http://127.0.0.1:8000/bet/'); 
        const data = await res.json();
        setBets(data);
    };

    const fetchBetStates = async () => {
        const res = await fetch('http://127.0.0.1:8000/betState/');
        const data = await res.json();
        setBetStates(data);
    };

    useEffect(() => {
        fetchBets();
        fetchBetStates();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Sistema de Gestión de Apuestas</h2>
            
            {}
            <div style={{ display: 'flex', gap: '50px', marginTop: '20px' }}>
                
                {}
                <div style={{ flex: 1 }}>
                    <Lista 
                        title="Historial de Apuestas" 
                        items={bets} 
                        attributesToShow={['bet_oid', 'idUser', 'idBetState', 'bet_amount', 'tipo_apuesta']} 
                    />
                    <Formulario 
                        entityType="bet" 
                        onSuccess={fetchBets} 
                    />
                </div>

                {}
                <div style={{ flex: 1 }}>
                    <Lista 
                        title="Estados Disponibles" 
                        items={betStates} 
                        attributesToShow={['betState_oid', 'name']} 
                    />
                    <Formulario 
                        entityType="betState" 
                        onSuccess={fetchBetStates} 
                    />
                </div>
                
            </div>
        </div>
    );
};

export default Dashboard;