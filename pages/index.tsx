import React from "react";
import { Item, Header, Footer } from "../components";

interface IndexProps {
    language: string;
}

const Index = (props: IndexProps) => {
    return (
        <div>
            <Header height={80} title="Modelica University" logo="/static/logo.png" />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundImage: "linear-gradient(#076ee1, #84E5F9)",
                    minHeight: "calc(100vh - 80px)",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-around", color: "#eeeeee" }}>
                    <h1 style={{ fontSize: "36px", marginBottom: 0 }}>Modelica Educational Resources</h1>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", color: "#eeeeee" }}>
                    <h2 style={{ marginTop: 0 }}>A curated collection of resources to help you learn Modelica</h2>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", paddingTop: 30, flexWrap: "wrap", flexGrow: 1 }}>
                    <Item
                        title={<img style={{ marginBottom: -4 }} height="32" src="/static/ModelicaByExample.png" />}
                        audience="beginner"
                        href="http://book.xogeny.com"
                    >
                        <div>
                            <p>A book that teaches Modelica from the bottom up</p>
                        </div>
                    </Item>
                    <Item title="Quick Reference" audience="intermediate" href="http://book.xogeny.com">
                        <p>A cheatsheet that lists common Modelica constructs on a single page</p>
                    </Item>
                    <Item title="Will There be a Whiteboard?" audience="intermediate" href="http://blog.xogeny.com">
                        <p>
                            Dr. Michael Tiller's blog in which he discusses various topics related to modeling,
                            simulation, engineering and software
                        </p>
                    </Item>
                    <Item
                        title="Modelica Questions on StackOverflow"
                        audience="intermediate"
                        href="https://stackoverflow.com/questions/tagged/modelica"
                    >
                        <p>
                            A collection of questions on <a href="http://stackoverflow.com">StackOverflow</a> with the{" "}
                            <code>modelica</code> tag associated with them
                        </p>
                    </Item>
                </div>
                <div style={{ width: "100%" }}>
                    <Footer height={"2em"} />
                </div>
            </div>
        </div>
    );
};

Index.getInitialProps = async ({ query }) => {
    return { ...query };
};

export default Index;
