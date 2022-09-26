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
      description: "description",
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
      callback_url: "https://www.npmjs.com/package/react-razorpay",
      redirect: "true",
      prefill: {
        name: "Gaurav Kumar",
        email: "samyak.khatua@example.com",
        contact: "9999999999",
        method: "upi",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#2d2b55",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  //handle payment on button click
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
      <button onClick={handlePayment}>buy now</button>
    </div>
  );
}

export default App;
