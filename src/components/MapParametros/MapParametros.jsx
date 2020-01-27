import React, { Component } from 'react'
import Ranger from 'components/Ranger/Ranger';
import PlaceFinder from 'components/PlaceFinder/PlaceFinder';
import { ControlLabel, Grid, Row, Col } from "react-bootstrap";

export default class MapParametros extends Component {
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col lg={6} sm={6}>
                            <PlaceFinder {...this.props} />
                        </Col>
                        <Col lg={6} sm={6}>
                            <ControlLabel> Radio a la redonda </ControlLabel>
                            <Ranger {...this.props} />
                        </Col>
                    </Row>
                </Grid>


            </div>
        )
    }
}
