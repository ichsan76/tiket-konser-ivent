import { NextApiResponse } from "next";

export const responseApi = (
  res: NextApiResponse,
  status: boolean,
  statusCode: number,
  message: string,
  data: any = {}
) => {
  res.status(statusCode).json({
    status,
    statusCode,
    message,
    data,
  });
};

export const responseApiSuccess = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, true, 200, "success", data);
};

export const responseApiFailed = (res: NextApiResponse) => {
  responseApi(res, false, 400, "failed");
};

export const responseApiNotFound = (res: NextApiResponse) => {
  responseApi(res, false, 404, "Not Found");
};

export const responseApiAccessDenied = (res: NextApiResponse) => {
  responseApi(res, false, 403, "Access Denied");
};

export const responseApiMethodNotAllowed = (res: NextApiResponse) => {
  responseApi(res, false, 405, "Method Not Allowed");
};
