import "./globals.css";

export const metadata = {
  title: "Sabbir Hosen Joy | Portfolio",
  description: "Portfolio of Sabbir Hosen Joy — Computer Science & Engineering student, software developer and technology enthusiast.",
  authors: [{ name: "Sabbir Hosen Joy" }],
  keywords: ["Sabbir Hosen Joy", "Portfolio", "Computer Science", "Software Development", "Projects"],
  icons: { icon: "/photo/profile/logo.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
