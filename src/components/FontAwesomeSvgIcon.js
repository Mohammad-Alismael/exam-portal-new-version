import React from "react";
import {SvgIcon} from "@mui/material";
import PropTypes from "prop-types";

export default function FontAwesomeSvgIcon() {
    const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
        const {icon} = props;

        const {
            icon: [width, height, , , svgPathData],
        } = icon;

        return (
            <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
                {typeof svgPathData === 'string' ? (
                    <path d={svgPathData}/>
                ) : (
                    svgPathData.map((d, i) => (
                        <path style={{opacity: i === 0 ? 0.4 : 1}} d={d}/>
                    ))
                )}
            </SvgIcon>
        );
    });


    return FontAwesomeSvgIcon;
}

FontAwesomeSvgIcon.propTypes = {
    icon: PropTypes.any.isRequired,
};