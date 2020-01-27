import React, { Component } from 'react'
import {FormControl, InputGroup } from 'react-bootstrap';
import './Ranger.css'
export default class Ranger extends Component {

    state = {
        radInput: (this.props.rad / 2).toFixed(0)
    }

    onChange = ({ target: { value: value } }) => {
        this.setState({radInput: value/4})
        this.props.handleChangeRad(value)
    }

    onChangeDirecto = ({ target: { value: value } }) => {
        this.setState({radInput: value})
        this.props.handleChangeRad(value*4)
    }

    handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <form className="form_range" onSubmit={this.handleSubmit}>
                    <input type="range" step={1} min={100} max={1500} value={(this.props.rad)} onChange={this.onChange} className={'form-control'} />
                    {/* <label className='labelRange'>{(this.props.rad / 2).toFixed(0) + 'km'}</label> */}
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={this.state.radInput}
                            placeholder={(this.props.rad / 2).toFixed(0)}
                            onChange={this.onChangeDirecto}
                        />
                        <InputGroup.Addon>Km</InputGroup.Addon>
                    </InputGroup>
                </form>
            </div>
        )
    }
}
