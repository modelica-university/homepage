import React from "react";
import App, { Container } from "next/app";

import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "./document.css";

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}
