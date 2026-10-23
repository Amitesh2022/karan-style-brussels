import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://karan-saloon-brussels.amiteshthecoder.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Karan Saloon | Barbier & Coiffeur à Ixelles, Bruxelles", template: "%s | Karan Saloon" },
  description: "Karan Saloon, barbier et coiffeur à Ixelles, Bruxelles. Coupes homme, barbe, contours et conseils personnalisés. Réservez par WhatsApp au +32 466 07 60 80.",
  keywords: ["barbier Bruxelles", "coiffeur Ixelles", "barber Brussels", "coupe homme Bruxelles", "barbier Rue Longue Vie", "Karan Saloon"],
  alternates: { canonical: siteUrl, languages: { "fr-BE": `${siteUrl}?lang=fr`, "nl-BE": `${siteUrl}?lang=nl`, "en-BE": `${siteUrl}?lang=en`, "es-BE": `${siteUrl}?lang=es` } },
  openGraph: { title: "Karan Saloon — Barbier & Coiffeur à Ixelles", description: "Votre style, notre signature. Réservez votre coupe ou service barbe à Bruxelles.", url: siteUrl, siteName: "Karan Saloon", locale: "fr_BE", type: "website", images: [{ url: "/assets/karan-saloon-interior.png", width: 1672, height: 941, alt: "Karan Saloon à Bruxelles" }] },
  twitter: { card: "summary_large_image", title: "Karan Saloon Bruxelles", description: "Barbier & coiffeur à Ixelles. Réservation rapide par WhatsApp.", images: ["/assets/karan-saloon-interior.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const localBusiness = {
  "@context": "https://schema.org", "@type": ["HairSalon", "LocalBusiness"], "@id": `${siteUrl}/#business`, name: "Karan Saloon", url: siteUrl,
  image: `${siteUrl}/assets/karan-saloon-interior.png`, telephone: "+32466076080",
  description: "Barbier et coiffeur à Ixelles, Bruxelles, spécialisé dans les coupes homme, la barbe et les contours.",
  address: { "@type": "PostalAddress", streetAddress: "Rue Longue Vie 44-22", postalCode: "1050", addressLocality: "Ixelles", addressRegion: "Brussels-Capital", addressCountry: "BE" },
  areaServed: ["Ixelles", "Bruxelles", "Elsene", "Brussels"],
  contactPoint: { "@type": "ContactPoint", telephone: "+32466076080", contactType: "reservations", availableLanguage: ["French", "Dutch", "English", "Spanish"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr-BE"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} /></body></html>;
}
