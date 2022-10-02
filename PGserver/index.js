const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./Routes/payment")
const crypto = require("crypto");

//initialize app
const app = express();

//environment variables
dotenv.config();

//middlewires
app.use(express.json());
app.use(cors());

//routes
app.use("/api/payment/", paymentRoutes);

//verify webhook
app.post("/verify/razorpay-signature", (req, res) => {
    console.log(JSON.stringify(req.body));

    //hash
    const expectedSign = crypto
        .createHmac("sha256", "samyakkhatua")
        .update(JSON.stringify(req.body))
        .digest("hex");
      
    console.log(expectedSign);
    console.log(req.headers["x-razorpay-signature"]);
  
      if (expectedSign === req.headers["x-razorpay-signature"]) {
        return res.status(200).json({ message: " inside if: Payment verified successfully" });
      } else {
        
      }

      res.status(200).json({ message: "Payment verified successfully" });
    })

//app listening
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

