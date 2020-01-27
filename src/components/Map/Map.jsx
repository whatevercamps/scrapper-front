import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { meters2ScreenPixels } from 'google-map-react/utils';
import MapParametros from 'components/MapParametros/MapParametros'
import Circle from 'components/Circle/Circle';


import './Map.css';
const radius = 13410;
class GMapReact extends Component {
    constructor(props) {
        super(props);
        let { center, zoom } = props;
        let { w, h } = meters2ScreenPixels(this.props.radio * 1000, { lat: center.lat, lng: center.lng } /* marker coords*/, zoom /* map zoom*/);
        this.state = {
            r: w
        }
    }

    handleZoomChanged = (e) => {
        console.log("e", e)
        let { center, zoom } = this.state;
        zoom = e.zoom;
        let { w, h } = meters2ScreenPixels(this.props.radio * 1000, { lat: center.lat, lng: center.lng } /* marker coords*/, e.zoom /* map zoom*/);
        this.props.handleZoomChange(zoom)
        this.setState({ zoom: zoom, r: w })
    }
    render() {
        const { center, zoom } = this.props;
        return (
            <>
                <div className="stats">Arrastre el mapa y haga click en la ubicación que desea seleccionar.</div>
                <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        onClick={({ x, y, lat, lng, event }) => {
                            center.lat = lat;
                            center.lng = lng;
                            this.props.handleCenterChange(center);
                        }}
                        onChange={(e) => {
                            let { w, h } = meters2ScreenPixels(this.props.radio * 1000, { lat: center.lat, lng: center.lng } /* marker coords*/, e.zoom /* map zoom*/);
                            this.props.setZoom(e.zoom)
                            this.props.setR(w)
                        }}
                        bootstrapURLKeys={{ key: 'AIzaSyAU-f8Xug2dGsDSbFJvyqj4HIVijfL0hqc' }}
                        center={center}
                        zoom={zoom}
                    >
                        <Circle r={this.props.r} lat={center.lat} lng={center.lng} />
                    </GoogleMapReact>
                </div>
            </>
        );
    }
}

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 4.60971,
                lng: -74.08175
            },
            form: {
                lat: 4.60971,
                lng: -74.08175
            },
            back_center: {
                lat: 4.60971,
                lng: -74.08175
            },
            value: { min: 2, max: 10 },
            r: 0,
            zoom: 9,
            radio: 100
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange() {
        this.setState({
            form: {
                lat: Number(this.refs.lat.value),
                lng: Number(this.refs.lng.value)
            }
        });
    }

    handleCenterChange = (c) => {
        this.setState({
            back_center: c
        })
        let geocode = this.state.center.lat + "," + this.state.center.lng + "," + this.state.radio + "km";
        this.props.handleChangeMapData(geocode);
    }

    handleClick() {
        this.setState({
            center: this.state.form
        });
        let geocode = this.state.center.lat + "," + this.state.center.lng + "," + this.state.radio + "km";
        this.props.handleChangeMapData(geocode);
    }

    handleSuggest = (s) => {
        let { center } = this.state
        this.setState({
            center: s.location || center
        });
        let geocode = this.state.center.lat + "," + this.state.center.lng + "," + this.state.radio + "km";
        this.props.handleChangeMapData(geocode);
    }

    handleChangeRad = (rad) => {
        let { r, radio } = this.state
        radio = rad / 2;
        let { w, h } = meters2ScreenPixels(radio * 1000, { lat: this.state.center.lat, lng: this.state.center.lng } /* marker coords*/, this.state.zoom /* map zoom*/);
        r = w;
        this.setState({ r: r, radio: radio })
        let geocode = this.state.center.lat + "," + this.state.center.lng + "," + (radio / 2) * 1 + "km";
        this.props.handleChangeMapData(geocode);
    }

    setR = (r2) => {
        let { r } = this.state
        r = r2
        this.setState({ r })
    }

    setZoom = (zoo) => {
        let { zoom } = this.state
        zoom = zoo
        this.setState({ zoom })
    }

    render() {
        const center = this.state.center;
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div>
                    <MapParametros handleSuggest={this.handleSuggest} rad={this.state.radio * 2} handleChangeRad={this.handleChangeRad} />
                </div>
                <div style={{ width: "100%", height: "100%", marginTop: "10px" }}>
                    <GMapReact center={center} radio={this.state.radio} r={this.state.r} setZoom={this.setZoom} setR={this.setR} zoom={this.state.zoom} handleCenterChange={this.handleCenterChange} />
                </div>
            </div>
        );
    }
}

