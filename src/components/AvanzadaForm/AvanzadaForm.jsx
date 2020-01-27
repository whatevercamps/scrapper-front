import React, { Component } from 'react'
import Checkbox from 'components/CustomCheckbox/CustomCheckbox';
export default class AvanzadaForm extends Component {


    render() {
        return (
            <div>
                <Checkbox
                    number="1"
                    isChecked={false}
                    label="Búsqueda avanzada"
                    onClick={this.props.handleChangeAvanzada}
                />
            </div>
        )
    }
}
