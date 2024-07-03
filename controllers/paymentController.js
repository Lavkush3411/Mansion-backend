import { v4 } from "uuid";
import createHashedString from "../utils/createHash.js";
import axios from "axios";

function initiatePayment(req, res) {
  const { transactionAmount, contactNumber, redirectPath } = req.body;
  const date = new Date();
  const paymentUUID =
    v4().substring(0, 24) +
    String(date.getDate()).padStart(2, "0") +
    String(date.getMonth() + 1).padStart(2, "0") +
    date.getFullYear();
  console.log(paymentUUID);
  const phonePayEndPoint = "/pg/v1/pay";
  const payLoad = {
    merchantId: "PGTESTPAYUAT86",
    merchantTransactionId: paymentUUID,
    merchantUserId: "MUID123d",
    amount: 100 * transactionAmount,
    redirectUrl: process.env.FRONTEND_HOME_URL + redirectPath,
    redirectMode: "REDIRECT",
    callbackUrl:
      process.env.BACKEND_HOME_URL + `/payment/status/${paymentUUID}`, //need to change
    mobileNumber: contactNumber,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payLoad)).toString("base64");
  const checksum =
    createHashedString(
      base64Payload + phonePayEndPoint + process.env.PHONEPAY_SALT_KEY
    ) +
    "###" +
    process.env.PHONEPAY_SALT_INDEX;

  const options = {
    method: "post",
    url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: base64Payload,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res
        .json({
          url: response.data.data.instrumentResponse.redirectInfo.url,
          transactionID: response.data.data.merchantTransactionId,
        })
        .status(200);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function paymentStatus(req, res) {
  console.log("request received");
  console.log(req.params);
}

export { initiatePayment, paymentStatus };
