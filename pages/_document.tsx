import React from "react";
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
  DefaultDocumentIProps,
} from "next/document";

export default class MyDocument extends Document<{}> {
  render() {
    return (
      <html>
        <Head>
          <link
            href="https://unpkg.com/normalize.css@^7.0.0"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css"
            rel="stylesheet"
          />
          <link
            href="http://fonts.googleapis.com/css?family=Cormorant:400,700"
            rel="stylesheet"
            type="text/css"
          ></link>
          <link
            href="http://fonts.googleapis.com/css?family=Dancing Script:400,700"
            rel="stylesheet"
            type="text/css"
          ></link>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
