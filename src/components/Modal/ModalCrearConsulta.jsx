import React, { Component } from 'react'
import { Button, Modal } from "react-bootstrap";
import Consultor from 'components/Consultor/Consultor'
export default class ModalCrearConsulta extends Component {

    state = {
        semiTags: '',
        warning: null
    }

    addSemiTags = semiTags => {
        this.setState({ semiTags: semiTags });
    }


    createLegend = (json) => {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }

    handleItemClick = (e) => {
        if (this.state.semiTags.trim().length > 0 && this.props.tags.length == 0)
            this.setState({ warning: 'warning' })
        else {
            this.setState({ warning: null })
            this.props.crearConsulta()
            this.props.handleItem(0)
        }
    }

    handleClose = (e) => {
        this.props.handleItem(0)
    }

    render() {
        let language = this.props.language
        return (
            <Modal show={this.props.shown} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear consulta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Consultor {... this.props} addSemiTags={this.addSemiTags} warning={this.state.warning}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cerrar
              </Button>
                    <Button variant="primary" onClick={this.handleItemClick}>
                        Guardar
              </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
