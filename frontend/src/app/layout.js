import "./globals.css";

export const metadata = {
  title: "WildNature Volunteers",
  description: "Volunteer event registration and certificate management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}