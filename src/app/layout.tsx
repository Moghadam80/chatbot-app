import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // Import the client component
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import "./globals.css";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/trace.svg" type="image/svg+xml" />
      </head>
      <body>
        <ReduxProvider>
          <SessionProviderWrapper>
            <Navbar />
            {children}
          </SessionProviderWrapper>
        </ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
