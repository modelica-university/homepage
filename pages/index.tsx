import React from "react";
import { useState } from "react";
import { Item } from "../components";

export default (props: {}) => {
    const [on, setOn] = useState(false);
    return (
        <div>
            <Item />
            <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>
        </div>
    );
};
