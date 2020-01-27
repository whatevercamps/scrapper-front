import React, { Component } from 'react'




export default class CircleWithContent extends Component {

    render() {
        const {content, color, border, w, h, r, pl, pt} = this.props;
        let circleStyle = {
            paddingTop: pt || h/6 || 0,
            paddingLeft: pl || w/3 || 0,
            backgroundColor: color || "#d3d3d3",
            border: border || "0 none", 
            borderRadius: r? r+"px" : "50%",
            width: w || "25px",
            height: h || "25px",
            display: "inline-block",
            verticalAlign:"middle",
            overflow: "hidden"
        };
        return (
            <div style={circleStyle}>
                {content}
            </div>
        )
    }
}
