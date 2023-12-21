import React, { useEffect, useState } from "react";

export function ShowProducts({ tokens, getProductDetails }) { 
    if (typeof getProductDetails !== 'function') {
        console.error('getProductDetails is not a function');
        return <div>Error: getProductDetails is not available</div>;
    }
    return (
        <>
            <h4>Here is a list of all products</h4>
            {tokens.map(token => (
                <ProductDetail key={token} token={token} getProductDetails={getProductDetails} />
            ))}
        </>
    )    
}

function ProductDetail({token, getProductDetails}){
    
    const [brand, setBrand] = useState('Loading');
    const [serialNumber, setSerialNumber] = useState('Loading');

    useEffect(() => {
        getProductDetails(token).then(({brand, serialNumber}) => {
            console.log('received ', brand)
            setBrand(brand);
            setSerialNumber(serialNumber);
        });
    }, [token, getProductDetails]); // Add dependencies here

    return (
        <>
            <div>Brand: {brand}</div>
            <div>SerialNumber: {serialNumber}</div>
        </>
    )
}
