"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { SdErrorView, theme } from "@framework/ui";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: Props) {
  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <SdErrorView.Page
            error={error}
            onReset={reset}
            onHome={() => { window.location.href = "/"; }}
          />
        </MantineProvider>
      </body>
    </html>
  );
}
