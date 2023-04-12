import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prismadb";
const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  // Check if user is logged in
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // find the user by email
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("not signed in");
  }

  // return the user to be used

  return { currentUser };
};

export default serverAuth;
