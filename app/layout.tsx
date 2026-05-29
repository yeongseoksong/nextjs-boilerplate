import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../framework/ui/theme";
import { MainLayout } from "../framework/ui";
import { navItems } from "../framework/example/example";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
         <MainLayout navItems={navItems}>{children}</MainLayout>;
        </MantineProvider>
      </body>
    </html>
  );
}
