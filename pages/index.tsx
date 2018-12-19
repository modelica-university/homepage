import React from "react";
import { useState } from "react";
import { Item } from "../components";
import { Button } from "@blueprintjs/core";

interface IndexProps {
    language: string;
}

const Index = (props: IndexProps) => {
    const [on, setOn] = useState(false);
    return (
        <div>
            <h1>{props.language}</h1>
            <Button icon="refresh">Test</Button>
            <Item />
            <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>
        </div>
    );
};

Index.getInitialProps = async ({ query }) => {
    return { language: query.lang };
};

export default Index;
