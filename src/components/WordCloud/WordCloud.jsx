import React, { Component } from 'react'
import words from './words';
import ReactWordcloud from 'react-wordcloud';

const options = {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    enableTooltip: true,
    deterministic: true,
    fontSizes: [5, 100],
    fontFamily: 'impact',
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 0,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 0
};

export default class WordCloud extends Component {

    state = {
        width: '12px',
        height: '12px'
    }
    componentDidMount() {
        console.log('dimensions', {width: this.props.wordCloudWidth, height: this.props.wordCloudHeight})
        this.setState({
            width: this.props.wordCloudWidth + 'px',
            height: this.props.wordCloudHeight + 'px'
        })
        window.addEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '300px'}}>
                <ReactWordcloud options={options} words={this.props.words || []} />
            </div>
        )
    }
}
