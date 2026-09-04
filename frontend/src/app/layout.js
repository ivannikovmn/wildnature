import "./globals.css";
import ReduxProvider from './store/provider'

export const metadata = {
  title: "WildNature Volunteers",
  description: "Volunteer event registration and certificate management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}