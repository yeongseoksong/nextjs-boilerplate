import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "@framework/ui";
import { MainLayout } from "@framework/ui";
import { navItems,companyInfo } from "../data";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
         <MainLayout navItems={navItems} companyInfo={companyInfo}>{children}</MainLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
