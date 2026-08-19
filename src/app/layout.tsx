import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import MotionProvider from "@/components/motion/MotionProvider";
import "./globals.css";

const switzer = localFont({
  variable: "--font-switzer",
  src: [
    { path: "./fonts/switzer/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/switzer/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/switzer/Switzer-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/switzer/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Diego Saltarin — Web & Product Development",
  description:
    "Diego Saltarin builds web apps, MVPs and technical products for founders and companies that need to move fast.",
  openGraph: {
    title: "Diego Saltarin — Web & Product Development",
    description:
      "Diego Saltarin builds web apps, MVPs and technical products for founders and companies that need to move fast.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${switzer.variable} h-full antialiased`}>
      <head>
        {/* Motion is an enhancement: without JS the curtain never lifts and
            the reveal targets never un-hide, so opt out of both. */}
        <noscript>
          <style>{`#preloader{display:none!important}[data-anim]{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="grain flex min-h-full flex-col bg-bg-100 font-sans text-txt-300">
        <MotionProvider />
        {children}
      </body>
    </html>
  );
}
