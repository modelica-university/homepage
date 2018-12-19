import React from "react";

export interface FooterProps {}

export const Footer = (props: FooterProps) => {
    return (
        <div>
            <p style={{ float: "right" }}>
                Modelica is a registered trademark of the <a href="http://www.modelica.org">Modelica Association</a>.{" "}
            </p>
        </div>
    );
};
