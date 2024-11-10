import {
  addData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteData } from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // const data = await retrieveData("products");
    // res
    //   .status(200)
    //   .json({ status: true, statusCode: 200, message: "success", data });
    // jika tidak ada kode diatas, bagian admin produk error get data nya

    const { product }: any = req.query;
    if (product && product[0]) {
      const data = await retrieveDataById("products", product[0]);
      responseApiSuccess(res, data);
    } else {
      const data = await retrieveData("products");
      responseApiSuccess(res, data);
    }
  } else if (req.method === "POST") {
    verify(req, res, true, async () => {
      let data = req.body;
      data.created_at = new Date();
      data.updated_at = new Date();
      data.prices.filter((price: any) => {
        price.idr = parseInt(price.idr);
      });
      data.stocks.filter((stock: any) => {
        stock.qty = parseInt(stock.qty);
      });
      await addData("products", data, (status: boolean, result: any) => {
        if (status) {
          responseApiSuccess(res, { id: result.id });
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { product }: any = req.query;
      const { data } = req.body;
      await updateData("products", product[0], data, (status: boolean) => {
        if (status) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(req, res, true, async () => {
      const { product }: any = req.query;
      await deleteData("products", product[0], (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    responseApiMethodNotAllowed(res);
  }
}
