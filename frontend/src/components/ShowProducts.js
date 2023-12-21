import React, { useEffect, useState } from "react";

export function ShowProducts({ tokens, getProductDetails, transfer }) { 
    if (typeof getProductDetails !== 'function') {
        console.error('getProductDetails is not a function');
        return <div>Error: getProductDetails is not available</div>;
    }
    return (
        <>
            <h4>Here is a list of all products</h4>
            {tokens.map(token => (
                <ProductDetail key={token} token={token} getProductDetails={getProductDetails} transfer={transfer} />
            ))}
        </>
    )    
}

function ProductDetail({token, getProductDetails, transfer}){
    
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
            <form
                onSubmit={(event) => {
                // This function just calls the transferTokens callback with the
                // form's data.
                event.preventDefault();

                const formData = new FormData(event.target);
                const to = formData.get("to");

                if (to) {
                    transfer(token, to);
                }
                }}
            >
                <div className="form-group">
                <label>Recipient address</label>
                <input className="form-control" type="text" name="to" required />
                </div>
                <div className="form-group">
                <input className="btn btn-primary" type="submit" value="Transfer" />
                </div>
            </form>
        </>
    )
}
