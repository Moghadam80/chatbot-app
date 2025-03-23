import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // Import the client component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper> 
      </body>
    </html>
  );
}
