import React, { Component } from 'react'




export default class Circle extends Component {

    render() {
        const {r} = this.props;
        let circleStyle = {
            padding: 0,
            marginLeft: -r/2,
            marginTop: -r/2,
            display: "inline-block",
            backgroundColor: "hsla(0, 100%, 90%, 0.5)",
            border: '1px solid hsla(0, 50%, 70%, 0.9)', 
            borderRadius: "50%",
            width: r,
            height: r,
        };
        return (
            <div style={circleStyle}>
            </div>
        )
    }
}
