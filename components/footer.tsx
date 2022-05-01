import React from "react";
import { libraryTheme, ThemeProps } from "../pages/theme";

export interface FooterProps {
  height: number | string;
  theme: ThemeProps;
}

export const Footer = (props: FooterProps) => {
  return (
    <div
      style={{
        height: props.height,
        backgroundColor: props.theme.headerBackgroundColor,
      }}
    >
      <p
        style={{
          marginLeft: "1em",
          color: props.theme.headerColor,
          float: "left",
        }}
      >
        Background photo by{" "}
        <a className="footer" href={props.theme.backgroundCreditLink}>
          {props.theme.backgroundCredit}
        </a>
      </p>
      <p
        style={{
          color: props.theme.headerColor,
          float: "right",
          marginRight: "1em",
        }}
      >
        Modelica is a registered trademark of the{" "}
        <a className="footer" href="http://www.modelica.org">
          Modelica Association
        </a>
        .{" "}
      </p>
    </div>
  );
};
