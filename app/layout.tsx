/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";

export const metadata = {
  title: "YouTube Sentiment Analysis Dashboard",
  description: "Dashboard untuk analisis sentimen komentar YouTube.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body
        style={{ backgroundColor: "#f4f4f9", fontFamily: "Roboto, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
