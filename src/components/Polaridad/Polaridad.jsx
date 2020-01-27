import React, { Component } from 'react'
import { Grid, Row, Col } from "react-bootstrap";
import './Polaridad.css'
export default class Polaridad extends Component {
    render() {
        return (
            <Grid style={{ maxWidth: '100%', width:'100%' }}>
                <Row>
                    <Col xs={6} md={6} className="contSideNeg">
                        <div className="sideNeg" style={{ width: this.props.neg+'%', margin: '0 0 0 auto' }}>

                        </div>
                    </Col>
                    <Col xs={6} md={6} className="contSidePos">
                        <div className="sidePos" style={{ width: this.props.pos+'%' }}>

                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}