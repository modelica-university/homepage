import React from "react";

export interface FooterProps {
    height: number | string;
}

export const Footer = (props: FooterProps) => {
    return (
        <div style={{ height: props.height }}>
            <p style={{ float: "right" }}>
                Modelica is a registered trademark of the <a href="http://www.modelica.org">Modelica Association</a>.{" "}
            </p>
        </div>
    );
};
