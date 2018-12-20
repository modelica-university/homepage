import React from "react";

export interface HeaderProps {
    title: string;
    logo: string;
    height: number;
}

export const Header = (props: HeaderProps) => {
    return (
        <div
            style={{
                borderBottom: "1px solid #84E5F9",
                paddingTop: 10,
                height: props.height,
                color: "white",
                backgroundColor: "#076EE1",
                display: "flex",
                width: "100%",
            }}
        >
            <h1 style={{ margin: "auto" }}>
                {/* <img style={{ position: "relative" }} src={props.logo} width="32" height="32" /> */}
                <span style={{ position: "relative", bottom: 5, right: -10 }}>{props.title}</span>
            </h1>
        </div>
    );
};
