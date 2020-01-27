/* global google */
/* tslint:disable:no-console */
import Geosuggest from 'react-geosuggest';
import React, { Component } from 'react';
import {ControlLabel } from 'react-bootstrap';
import './PlaceFinder.css'
export default class PlaceFinder extends Component {
    /**
        * When the input receives focus
        */
    onFocus() {
        console.log('onFocus');
    }

    /**
     * When the input loses focus
     */
    onBlur(value) {
        console.log('onBlur', value);
    }

    /**
     * When the input got changed
     */
    onChange(value) {
        console.log('input changes to :' + value);
    }

    /**
     * When a suggest got selected
     */
    onSuggestSelect = (suggest) => {
        if(suggest)
            this.props.handleSuggest(suggest)
    }

    /**
     * When there are no suggest results
     */
    onSuggestNoResults(userInput) {
        console.log('onSuggestNoResults for :' + userInput);
    }

    /**
     * Render the example app
     * @return {Function} React render function
     */
    render() {
        const fixtures = [
            { label: 'Bogotá', location: { lat: 4.710988599999999, lng: -74.072092 } },
            { label: 'Cartagena', location: { lat: 10.3910485, lng: -75.47942569999998 } },
            { label: 'Medellín', location: { lat: 6.247637600000001, lng: -75.5658153 } },
            { label: 'Montería', location: { lat: 8.750983, lng: -75.87853480000001 } }

        ];

        return (
            <div>
                <ControlLabel> Ubicación </ControlLabel>
                <Geosuggest inputClassName={'form-control'}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onSuggestSelect={this.onSuggestSelect}
                    onSuggestNoResults={this.onSuggestNoResults}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20"
                    placeholder="Buscar lugar"
                />
            </div>
        );
    }
}
