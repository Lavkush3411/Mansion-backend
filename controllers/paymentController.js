import { v4 } from "uuid";
import createHashedString from "../utils/createHash.js";
import axios from "axios";
import updateOrder from "../middlewares/updateOrder.middleware.js";

function initiatePayment(req, res) {
  const { totalAmount, contactNumber, redirectPath, paymentUUID } = req.body;
  const phonePayEndPoint = "/pg/v1/pay";
  const payLoad = {
    merchantId: process.env.PHONEPAY_MERCHENTID,
    merchantTransactionId: paymentUUID,
    merchantUserId: "MUID123d",
    amount: 100 * totalAmount,
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

async function paymentStatus(req, res) {
  const { transactionID } = req.params;
  const checksum =
    createHashedString(
      `/pg/v1/status/${process.env.PHONEPAY_MERCHENTID}/${transactionID}` +
        process.env.PHONEPAY_SALT_KEY
    ) +
    "###" +
    process.env.PHONEPAY_SALT_INDEX;
  const options = {
    method: "get",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.PHONEPAY_MERCHENTID}/${transactionID}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": process.env.PHONEPAY_MERCHENTID,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response);

    if (response.data === "") {
      throw new Error("Error in getting status update of order");
    }
    req.status = response.status;
    req.data = response.data;
    updateOrder(req, res);
  } catch (error) {
    req.error = error;
    res.status(400).send("Error in getting status update of order");
  }
}

export { initiatePayment, paymentStatus };
