import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    //extract current user from serverAuth
    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
}
