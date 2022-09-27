import axios from "axios";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ThankYouPage from "./pages/ThankYouPage";
import "./App.css";

function App() {
  const [price, setPrice] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [phone, setPhone] = useState("");

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
      callback_url: "https://google.com",
      redirect: "true",
      prefill: {
        name: name,
        email: email,
        contact: `+${countryCode}${phone}`,
        method: "upi",
      },
      notes: {
        name: name,
        email: email,
        phone: `+${countryCode}${phone}`,
      },
      theme: {
        color: "#f17272",
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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <input
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <input
                type="number"
                placeholder="country code"
                onChange={(e) => setCountryCode(e.target.value)}
              />
              <input
                type="phone"
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
              <br />
              <input
                type="number"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <button type="submit" onClick={handlePayment}>
                buy now
              </button>
            </div>
          }
        />

        <Route path="/thank-you" exact element={<ThankYouPage/>}/>
      </Routes>
    </>
  );
}

export default App;
