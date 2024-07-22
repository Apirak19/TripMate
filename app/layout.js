import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/navigation/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TripMate",
  description: "Your Thailand Guide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
