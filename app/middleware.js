/* import { getSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function checkSession() {
  const session = await getSession();
  if (session) {
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    redirect("/login");
  }
}
checkSession();

export { default } from "next-auth/middleware";
export const config = { matcher: ["/"] };
 */
