import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'
export default class Tag extends Component {

    state = {
        isHover: false
    }

    stylenormal = {
        backgroundColor: '#23b8f8',
        color: 'white',
        padding: this.props.width ? '5px 5px 5px 5px' : '5px 10px 5px 10px',
        fontSize: '18px',
        margin: '15px 5px 10px 5px' ,
        maxWidth: this.props.width ? this.props.width + 'px' : '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }

    stylex = {
        backgroundColor: '#23b8f8',
        color: 'white',
        padding: '5px 5px 5px 10px',
        fontSize: '18px',
        margin: '15px 5px 10px 5px',
        maxWidth: this.props.width ? this.props.width + 'px' : '100%'
    }

    badgeTimesStyle = {
        marginLeft: '8px',
        cursor: 'pointer'
    }

    handleOver = () => {
        this.setState({isHover: true})
    }

    handleLeave = () => {
        this.setState({isHover: false})
    }

    handleClick = () => {
        console.log("matar", this.props.tag)
        this.props.removeTag(this.props.tag)
    }

    render() {
        return (
                <Badge style={this.state.isHover && this.props.tagEditable ? this.stylex : this.stylenormal} onMouseOver={this.handleOver} onMouseLeave={this.handleLeave}>
                {this.props.tag}
                {this.state.isHover && this.props.tagEditable ? <i className="fa fa-times" style={this.badgeTimesStyle} onClick={this.handleClick}/> : null }</Badge>
        )
    }
}
