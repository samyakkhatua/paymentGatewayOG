const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

//create orders
router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    //API request and response for creating an order
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went Wrong!" });
      }

      // console.log({ data: order });
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "creating Order Internal Server Error!" });
    console.log(error);
  }
});

//verify payment
// router.post("/verify", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSign = crypto
//       .createHmac("sha256", process.env.KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (razorpay_signature === expectedSign) {
//       // res.redirect(
//       //   `http://localhost:5173/thank-you?reference=${razorpay_payment_id}`
//       //   // `http://localhost:5173/`
//       // );

//       return res.status(200).json({ message: "Payment verified successfully" });
//       // return;


//     } 
//     else {
//       return res.status(400).json({ message: "Verify: Invalid signature sent!!!" });
//     }

//   } catch (error) {

//     console.log(error);
//     res.status(500).json({ message: "verify: Internal Server Error!" });

//   }
//   return;
// });

// //verify webhook
// router.post("verify/razorpay-signature", (req, res) => {
//   console.log(JSON.stringify(req.body));

//   // const sign = razorpay_order_id + "|" + razorpay_payment_id;

//   //hash
//   const expectedSign = crypto
//       .createHmac("sha256", "samyakkhatua")
//       .update(JSON.stringify(req.body))
//       .digest("hex");
    
//   console.log(expectedSign);
//   console.log(req.headers["x-razorpay-signature"]);

//     // if (expectedSign === req.headers["x-razorpay-signature"]) {
      
//     // } else {
      
//     // }
  
//   res.status(200);
// })

module.exports = router;
