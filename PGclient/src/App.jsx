import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [price, setPrice] = useState(500);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_97dwCasNnK2z0t",
      amount: data.amount,
      currency: data.currency,
      name: "product name",
      description: "test transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#FFFFFF",
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: price });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <button onClick={handlePayment}>
        buy now
      </button>
    </div>
  );
}

export default App;
