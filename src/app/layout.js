import { Open_Sans } from "next/font/google";
import "./styles/globals.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Providers } from "./components/Provider/Provider";// Make sure this is the correct import path

const openSans = Open_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-open-sans'
});

export const metadata = {
  title: "Doctor",
  description: "Completed U.S. Medical Licensing Examination (essential).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}