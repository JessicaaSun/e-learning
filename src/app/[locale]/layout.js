import "./globals.css";
// import {useLocale} from 'next-intl';
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { LayoutProvider } from "./layoutProvider";
import { Suspense } from "react";
import Loading from "./loading";
import Providers from "@/store/Provider";
import AuthProvider from "./AuthProvider";
import { AOSInit } from "./aos";

export const metadata = {
  title: "ISTADemy",
  description: "Generated by create next app",
};

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "km" }];
// }

export default async function RootLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // notFound();
  }

  return (
    <html lang={locale}>
      <AOSInit/>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <LayoutProvider>
                <div>
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </div>
            </LayoutProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
