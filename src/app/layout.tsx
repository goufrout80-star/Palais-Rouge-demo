import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { PropertiesProvider } from "@/context/PropertiesContext";
import { I18nProvider } from "@/context/I18nContext";
import { AdminToolbar } from "@/components/admin/AdminToolbar";
import { CookieConsent } from "@/components/CookieConsent";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Palais Rouge Immobilier | L'Excellence Immobilière",
  description: "Découvrez des propriétés d'exception avec Palais Rouge Immobilier. Maisons de luxe, appartements et villas à vendre et à louer.",
  keywords: "immobilier luxe, maisons à vendre, appartements location, propriétés prestige, Palais Rouge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <AuthProvider>
          <I18nProvider>
            <PropertiesProvider>
              <SiteConfigProvider>
                <AdminToolbar />
                {children}
                <CookieConsent />
              </SiteConfigProvider>
            </PropertiesProvider>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
