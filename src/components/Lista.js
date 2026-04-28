import React from 'react';
import { Table } from "reactstrap";

const Lista = ({ title, items, attributesToShow }) => {
    
    if (!items || items.length === 0) {
        return <p className="text-white mt-3">No hay datos disponibles para {title}.</p>;
    }

    return (
        <div className="list-container text-left mb-5">
            {}
            <h4 className="title text-white">{title}</h4>
            
            {}
            <Table responsive striped dark>
                <thead className="text-primary">
                    <tr>
                        {attributesToShow.map((attr, index) => (
                            <th key={index}>{attr.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            {attributesToShow.map((attr) => (
                                <td key={attr}>{item[attr]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Lista;