import React, { useState } from 'react';

const Formualrio = ({ entityType, onSuccess }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const endpoint = entityType === 'bet' 
            ? 'http://127.0.0.1:8000/bet/' 
            : 'http://127.0.0.1:8000/betState/';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert(`${entityType === 'bet' ? 'Apuesta' : 'Estado'} guardado con éxito!`);
                setFormData({}); 
                onSuccess();     
            } else {
                alert('Error al guardar. Comprueba que los IDs existan en tu base de datos.');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h3>Añadir {entityType === 'bet' ? 'Apuesta' : 'Estado'}</h3>
            <form onSubmit={handleSubmit}>
                
                {entityType === 'betState' && (
                    <div>
                        <label>Nombre del Estado: </label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
                    </div>
                )}

                {entityType === 'bet' && (
                    <>
                        <div>
                            <label>ID del Usuario: </label>
                            <input type="number" name="idUser" value={formData.idUser || ''} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>ID del Estado (BetState): </label>
                            <input type="number" name="idBetState" value={formData.idBetState || ''} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Cantidad Apostada (€): </label>
                            <input type="number" step="0.01" name="bet_amount" value={formData.bet_amount || ''} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Evento (Tipo de apuesta): </label>
                            <input type="text" name="tipo_apuesta" value={formData.tipo_apuesta || ''} onChange={handleChange} required />
                        </div>
                    </>
                )}

                <br />
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default Formualrio;