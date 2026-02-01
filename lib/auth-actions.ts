"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => { // async means do not wait until this is finished to run the code below
  await signIn("github", {redirectTo: "/"});
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};