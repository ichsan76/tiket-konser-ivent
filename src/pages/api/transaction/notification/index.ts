import transactionServices from "@/services/transaction";
import {
  responseApi,
  responseApiMethodNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";

import crypto from "crypto";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const updateStatusBasedOnMidtransStatus = async (
    transaction_id: string,
    data: any
  ) => {
    const MINDTRANS_SERVER_KEY = process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY;
    const hash = crypto
      .createHash("sha512")
      .update(
        `${transaction_id}${data.status_code}${data.gross_amount}${MINDTRANS_SERVER_KEY}`
      )
      .digest("hex");

    if (data.signature_key !== hash) {
      return responseApi(res, false, 400, "invalid signature key");
    }

    let responseData = null;
    let transactionStatus = data.transaction_status;
    let fraudStatus = data.fraud_status;

    if (transactionStatus == "capture") {
      if (fraudStatus == "accept") {
        const params = {
          status: "PAID",
          payment_method: data.payment_type,
        };

        const transaction = await transactionServices.updateTransactionStatus(
          transaction_id,
          params
        );

        responseData = transaction;
      }
    } else if (transactionStatus == "settlement") {
      const params = {
        status: "PAID",
        payment_method: data.payment_type,
      };

      const transaction = await transactionServices.updateTransactionStatus(
        transaction_id,
        params
      );

      responseData = transaction;
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      const params = {
        status: "CANCELED",
      };

      const transaction = await transactionServices.updateTransactionStatus(
        transaction_id,
        params
      );

      responseData = transaction;
    } else if (transactionStatus == "pending") {
      const params = {
        status: "PENDING PAYMENT",
        payment_method: data.payment_type,
      };

      const transaction = await transactionServices.updateTransactionStatus(
        transaction_id,
        params
      );
      responseData = transaction;
    }

    responseApiSuccess(res, responseData);
  };

  if (req.method === "POST") {
    const data = req.body;

    transactionServices
      .getTransactionById({ id: data.order_id })
      .then((transaction) => {
        if (transaction) {
          updateStatusBasedOnMidtransStatus(data.order_id, data).then(
            (result) => {
              console.log("result", result);
            }
          );
        }
      });
    // res.status(200).json({ status: true, statusCode: 200, message: "success" });
    responseApiSuccess(res);
  } else {
    responseApiMethodNotAllowed(res);
  }
}
