import { NextApiRequest, NextApiResponse } from "next";
import { deleteData, retrieveDataById } from "@/lib/firebase/service";
import { updateData } from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const user: any = await retrieveDataById("users", decoded.id);
      if (user) {
        user.id = decoded.id;
        if (user.carts) {
          responseApiSuccess(res, user.carts);
        } else {
          responseApiSuccess(res, []);
        }
      } else {
        responseApiNotFound(res);
      }
    });
  } else if (req.method === "PUT") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const { data } = req.body;
      await updateData("users", decoded.id, data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(req, res, true, async () => {
      const { cart }: any = req.query;
      await deleteData("carts", cart[0], (result: boolean) => {
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

export const config = {
  api: {
    externalResolver: true,
  },
};
