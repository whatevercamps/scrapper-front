import React, { Component } from 'react'
import { Form, FormGroup, InputGroup, FormControl, Button, ControlLabel, HelpBlock } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox";
import Radio from 'components/CustomRadio/CustomRadio';
export default class BusquedaPorLugar extends Component {
    state = {
        searching: false,
        place: ""
    }


    handleChange = e => {
        this.setState({ place: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.place) {
            this.setState({ searching: true });
            fetch("https://tweepy-places.herokuapp.com/" + this.state.place.trim()).then(res => {
                if (res.status == 200)
                    res.json().then(data => {
                        this.setState({searching: false });
                        this.props.setPlaces(data);
                    })
            });
        }
    }


    handleSelectPlace = index => {
        this.props.setPlaceIndex(index);
        this.props.setPlace(this.props.places[index])
    };

    render() {
        return (
            <div style={{ margin: "20px" }}>
                <div className="section1" style={{ marginTop: "30px", marginBottom: "40px" }}>
                    <Checkbox
                        number="1"
                        isChecked={true}
                        label="  Buscar lugares"
                        disabled />
                    <hr style={{ marginTop: "0", marginBottom: '20px', height: "1px" }} />

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup style={{ width: '100%' }}>
                            <ControlLabel> Ingrese el nombre del la ciudad, departamento o país </ControlLabel>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    value={this.state.place}
                                    placeholder="Ingrese lugar..."
                                    onChange={this.handleChange}
                                    disabled={this.state.searching}
                                />
                                <InputGroup.Button>
                                    <Button onClick={this.handleSubmit} disabled={this.state.place.trim() == '' || this.state.searching}>Buscar</Button>
                                </InputGroup.Button>
                            </InputGroup>
                            <HelpBlock>{this.state.searching ? "Buscando lugares en Twitter..." : ""}</HelpBlock>
                        </FormGroup>
                    </Form>
                </div>

                <div className="section2" style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <Checkbox
                        number="2"
                        isChecked={true}
                        label="  Seleccionar resultados"
                        disabled />
                    <hr style={{ marginTop: "0", marginBottom: '20px', height: "1px" }} />
                    {
                        this.props.places.map((d, index) => {
                            return <Radio
                                key={index}
                                number={index + 1200}
                                option={index}
                                name="radio"
                                onChange={() => this.handleSelectPlace(index)}
                                checked={this.props.selectedPlaceIndex == index}
                                label={d.name}
                            />
                        })
                    }
                </div>

            </div>
        )
    }
}
