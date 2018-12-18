import React from "react";
import { useState } from "react";

export default () => {
    const [on, setOn] = useState(false);
    return (
        <div>
            <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>
        </div>
    );
};
