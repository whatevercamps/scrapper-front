import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Card } from "components/Card/Card.jsx";
import Consultor from 'components/Consultor/Consultor';
import { Redirect } from "react-router-dom"
export default class ConsultorView extends Component {

    state = {
        semiTags: '',
        warning: null
    }

    componentDidMount() {
        this.props.setCurrentRoute(this.props.location.pathname)
    }

    handleItemClick = (e) => {
        if (this.state.semiTags.trim().length > 0 && this.props.tags.length == 0)
            this.setState({ warning: 'warning' })
        else {
            this.setState({ warning: null })
            this.props.crearConsulta()
        }


    }


    addSemiTags = semiTags => {
        this.setState({ semiTags: semiTags });
    }



    render() {
        if (this.props.irAResumen) {
            this.props.resetIrAResumen();
            return <Redirect to='/admin/resumen' />
        }
        return (
            window.innerWidth > 600 ?
                <div style={{ padding: '10%' }}>
                    <Card
                        title="Consultar"
                        category="Ingrese los conceptos, seleccione un idioma, un lugar y un radio de búsqueda. Luego, "
                        content={
                            <div>
                                <Consultor {... this.props} addSemiTags={this.addSemiTags} warning={this.state.warning} />
                            </div>
                        }
                    />

                    <Button
                        bsStyle="info"
                        style={{ margin: '0 auto', display: 'flex' }}
                        onClick={this.handleItemClick}>
                        Consultar
                        </Button>
                </div>
                :
                <Consultor {... this.props} />
        )
    }
}
