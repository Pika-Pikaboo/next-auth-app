import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "NexAuth App",
  description: "NexAuth App implementation with beautiful front-end",
};

export default function RootLayout({ session, children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
