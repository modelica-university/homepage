import React from "react";

import { Card, Elevation, Button } from "@blueprintjs/core";

export interface ItemProps {
    title: string | JSX.Element;
    audience: string;
    children: JSX.Element;
    href: string;
}

export const Item = (props: ItemProps) => {
    return (
        <Card
            style={{ margin: 10, width: "30vw", minWidth: 375, height: "16em" }}
            interactive={true}
            elevation={Elevation.ZERO}
            onClick={() => (window.location.href = props.href)}
        >
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <h5
                    style={{
                        marginTop: 0,
                        marginBottom: 5,
                        borderBottom: "1px solid #eeeeee",
                        fontSize: "200%",
                        paddingBottom: "4px",
                    }}
                >
                    {props.title}
                </h5>
                <h5 style={{ marginTop: 0, color: "#008800" }}>Audience: {props.audience}</h5>
                <div style={{ overflowY: "scroll", flexGrow: 1 }}>{props.children}</div>
                <a className="bp3-button" role="button" href={props.href}>
                    View
                </a>
            </div>
        </Card>
    );
};
