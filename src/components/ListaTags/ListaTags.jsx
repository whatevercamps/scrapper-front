import React, { Component } from 'react'
import Tag from './Tag'
import { DropdownButton, MenuItem } from "react-bootstrap";
export default class ListaTags extends Component {

    state = {
        connectors: this.props.connectors
    }

    handleClickAnd = (index) => { 
        let connector = {connector:"y (and)", forJoin: " "}
        this.props.changeConnector(index, connector)
    }

    handleClickOr = (index) => { 
        let connector = {connector:"o (or)", forJoin: ";"}
        this.props.changeConnector(index, connector)
    }

    render() {
        return (
            <div>
                {this.props.tags.map((d, index) => {
                    return !d.connector ? 
                    (<Tag tag={d} key={index} removeTag={() => this.props.removeTag(index)} tagEditable={true} />)
                    :
                        index < this.props.tags.length - 1 ?    
                        (<DropdownButton
                                id="dropdown-size-small"
                                title={d.connector}>
                                <MenuItem eventKey="1" onClick={() => this.handleClickAnd(index)}>y (and)</MenuItem>
                                <MenuItem eventKey="2" onClick={() => this.handleClickOr(index)}>o (or)</MenuItem>
                            </DropdownButton>
                        ) : (<></>)
                })}
            </div>
        )
    }
}
