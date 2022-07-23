import React, { useState } from "react";
import axios from "axios";

const ORDER_REST_API_URL = "http://localhost:8080/api/order"

interface Props{
    
}

const OrderService:React.FunctionComponent<Props> = props => {
    const [orderId, setOrderId] = useState(null);

    const handleSubmit = () => {
            // POST request using axios inside useEffect React hook
            const order = { 
                date : "12.03.2001. 22:33:12",   
                priceWithNoPdvIncluded : 155.3,   
                total : 200.80,
                paymentMethod : 2,
                creditCardNumber : "1111222233334444",
                email : "whatever@gmail.com",
                phoneNumber : 231231311,
                deliveryAddress : "Maple Avenue 31"
             };
            axios.post(ORDER_REST_API_URL, order)
                .then(response => setOrderId(response.data.id));
        
        console.log("set");
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    return (
        <div className="card text-center m-3">
            <h5 className="card-header">POST Request with React Hooks</h5>
            <div className="card-body">
                Returned Id: {orderId}
            </div>
            <button onClick={handleSubmit}>Send data</button>
        </div>
    );
}

export { OrderService };