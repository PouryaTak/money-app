import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/dist/client/components/headers";
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin", "latin-ext"],
  weight: ["400", "200", "700"],
});

export const metadata: Metadata = {
  title: "Money App",
  description: "Keep track of your money",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const lang = cookies().get("language")?.value || "en-US";
  return (
    <html lang={lang}>
      <body className={vazir.className}>{children}</body>
    </html>
  );
}
