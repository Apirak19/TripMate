import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/navigation/NavigationBar";
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

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TripMate",
  description: "Your Thailand Guide",
};
