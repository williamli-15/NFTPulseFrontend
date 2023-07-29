import "@styles/globals.css";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "NFT Pulse",
  description: "Real-Time Crypto Data",
};

const RootLayout = ({ children }) => {
  return (
    <html Lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
