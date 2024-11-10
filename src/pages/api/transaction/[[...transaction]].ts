import {
  responseApi,
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";
import createTransaction from "@/lib/midtrans/transaction";
import {
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { customerName, email, phone, gross_amount, itemDetails, orderId } =
      req.body;

    if (
      !customerName ||
      !email ||
      !phone ||
      !gross_amount ||
      !Array.isArray(itemDetails)
    ) {
      return responseApi(
        res,
        false,
        400,
        "Missing required fields or itemDetails is not an array"
      );
    }

    const mappedItemDetails = itemDetails.map(
      (item: {
        id: string;
        price: number;
        quantity: number;
        name: string;
        category: string;
      }) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
        category: item.category,
      })
    );

    const params = {
      transaction_details: {
        order_id: orderId,
        gross_amount: parseInt(gross_amount, 10),
      },
      customer_details: {
        first_name: customerName,
        email: email,
        phone: phone,
      },
      item_details: mappedItemDetails,
    };

    createTransaction(
      params,
      (transaction: { token: string; redirect_url: string }) => {
        responseApiSuccess(res, transaction);
      }
    );
  } else if (req.method === "GET") {
    const { transaction } = req.query;

    if (transaction && transaction[0]) {
      const data = async () => {
        await retrieveDataById("transactions", transaction[0]);
        return data;
      };

      responseApiSuccess(res, data);
    } else {
      const data = async () => {
        await retrieveData("transactions");
        return data;
      };

      responseApiSuccess(res, data);
    }
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { transaction }: any = req.query;
      const { data } = req.body;
      await updateData(
        "transactions",
        transaction[0],
        data,
        (status: boolean) => {
          if (status) {
            responseApiSuccess(res);
          } else {
            responseApiFailed(res);
          }
        }
      );
    });
  } else {
    responseApiMethodNotAllowed(res);
  }
}
