import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // Import the client component
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import "./globals.css";
import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading';

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
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </SessionProviderWrapper>
        </ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
