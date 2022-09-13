import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function LoadCheckBoxOptions({options,index}) {
    return (
        <>
            <FormControlLabel
                key={index}
                value={index}
                control={<Checkbox id={options[index]["id"]} />}
                label={options[index]["optionValue"]}
            />
            {options[index]["img"] != null ? (
                <img
                    style={{ maxWidth: "100%", outline: "1px solid" }}
                    src={options[index]["img"]["preview"]}
                    alt={"question"}
                />
            ) : null}
        </>
    );
}

export default LoadCheckBoxOptions;