import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // Import the client component
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/trace.svg" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ReduxProvider>
            <SessionProviderWrapper>
              <Navbar />
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </SessionProviderWrapper>
          </ReduxProvider>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
