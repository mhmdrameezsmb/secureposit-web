import "@/data-tables-css.css";
import "@/globals.css";
import "@radix-ui/themes/styles.css";

import "react-toastify/dist/ReactToastify.css";

import "@radix-ui/themes/styles.css";

import { Metadata } from "next";
import Main from "./common/Layout/Main";
export const metadata: Metadata = {
  title: "SecurePosit Admin",
  description: "This is SecurePosit admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
