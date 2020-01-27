import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, InputGroup, Button } from 'react-bootstrap';
export default class FormTags extends Component {


    state = {
        prox: ''
    };

    handleChange = e => {
        this.setState({ prox: e.target.value });
        this.props.addSemiTags(e.target.value);
    }


    handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.addTag(this.state.prox, this.state.name)
        this.setState({ prox: '' })
    }

    handleSubmitName = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col lg={12} sm={12} xs={12}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup style={{ width: '100%' }} validationState={this.props.warning}>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        value={this.state.prox}
                                        placeholder="Ingrese conceptos..."
                                        onChange={this.handleChange}
                                    />
                                    <InputGroup.Button>
                                        <Button onClick={this.handleSubmit} disabled={this.state.prox.trim() == ''}>Agregar</Button>
                                    </InputGroup.Button>
                                </InputGroup>
                                {
                                    this.props.warning ? 
                                    <ControlLabel >Por favor <b>agregar</b> los conceptos y seleccionar conectores</ControlLabel>
                                    : <></>
                                }
                                
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
