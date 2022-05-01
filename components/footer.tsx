import React from "react";

export interface FooterProps {
  height: number | string;
  color: string;
}

export const Footer = (props: FooterProps) => {
  return (
    <div
      style={{ height: props.height, backgroundColor: "rgba(255,255,255,0.4)" }}
    >
      <p style={{ color: props.color, float: "right" }}>
        Modelica is a registered trademark of the{" "}
        <a href="http://www.modelica.org">Modelica Association</a>.{" "}
      </p>
    </div>
  );
};
