import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DATA, isDemoMode } from "@/lib/data/site-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#F8F9F6",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sumaqcentergym.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sumaq Center Gym | Gimnasio en Cercado de Lima",
    template: "%s | Sumaq Center Gym",
  },
  description:
    "Gimnasio en el Cercado de Lima, a pasos de la Plaza de Armas. Jr. Callao 126. Musculación, cardio, entrenamiento funcional, horarios continuos de lunes a viernes y promociones.",
  authors: [{ name: "Sumaq Center Gym" }],
  // En modo prototipo la indexación está estrictamente deshabilitada
  robots: isDemoMode
    ? {
        index: false,
        follow: false,
        nocache: true,
      }
    : {
        index: true,
        follow: true,
      },
  openGraph: {
    title: "Sumaq Center Gym | Gimnasio en Cercado de Lima",
    description:
      "Fuerza, salud y disciplina en el centro histórico de Lima. Jr. Callao 126, a pasos de la Plaza de Armas.",
    url: siteUrl,
    siteName: "Sumaq Center Gym",
    locale: "es_PE",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Marcado estructurado Schema.org JSON-LD oficial tipo HealthClub
 * Serializado de forma segura escapando caracteres < para prevenir inyecciones XSS.
 * Solo incluye datos verificados (cero ratings ficticios, cero testimonios inventados).
 */
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "Sumaq Center Gym",
  description:
    "Centro de acondicionamiento físico, fuerza y salud en el Cercado de Lima, a pasos de la Plaza de Armas.",
  url: siteUrl,
  telephone: SITE_DATA.phoneInternational,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_DATA.street,
    addressLocality: SITE_DATA.city,
    addressRegion: "Lima",
    postalCode: SITE_DATA.postalCode,
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE_DATA.coordinates.lat,
    longitude: SITE_DATA.coordinates.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "23:00",
    },
  ],
  sameAs: [SITE_DATA.instagramUrl, SITE_DATA.facebookUrl],
};

const safeJsonLd = JSON.stringify(jsonLdSchema).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-PE"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8F9F6] text-[#17211D] selection:bg-[#176B48] selection:text-white">
        {children}
      </body>
    </html>
  );
}
