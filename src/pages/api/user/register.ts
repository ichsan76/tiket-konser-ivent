import { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        responseApiSuccess(res);
      } else {
        responseApiFailed(res);
      }
    });
  } else {
    responseApiMethodNotAllowed(res);
  }
}
