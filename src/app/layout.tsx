import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // Import the client component
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SessionProviderWrapper>
            <Navbar />
            {children}
          </SessionProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
