import React, { Component } from 'react'
import { Image } from "react-bootstrap";
import './Tweet.css'
import Polaridad from 'components/Polaridad/Polaridad';
export default class Tweet extends Component {


    text = {
        "fontFamily": "Helvetica",
        "fontSize": "16px",
        "fontWeight": "100",
        "fontStyle": "normal",
        "fontStretch": "normal",
        "lineHeight": "1.38",
        "letterSpacing": "normal",
        "color": "#000000",
        "marginTop": "21px",
        "marginLeft": "75px"
    }

    render() {
        return (
            <div className="tweet_background" style={{ width: this.props.tweetWidth + 'px' }}>
                <div className="header">
                    <Image src={this.props.tweet.image} className="user_photo" circle style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                    <div style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '20px' }}>
                        <h4 className="title user_info">{this.props.tweet.name}</h4>
                        <h5 className="category screen_name">@{this.props.tweet.username}</h5>
                    </div>
                </div>
                <div className="tweetPolaridad">
                    <Polaridad pos={(this.props.tweet.polaridad*100).toFixed(2)} neg={((1-this.props.tweet.polaridad)*100).toFixed(2)}/>
                </div>
                <p style={this.text}>{this.props.tweet.text}</p>
                <p className="date"></p>
                <div className="icons">
                    <span className="iconandnumber"><i disabled className="icon" name='reply' /> <span className="replies">{this.props.tweet.favorite_count}</span> </span>
                    <span className="iconandnumber"><i disabled className="icon" name='retweet' /> <span className="replies">{this.props.tweet.retweet_count}</span>  </span>
                    <span className="iconandnumber"><i disabled className="icon" name='like' /> <span className="replies">6</span>  </span>
                </div>
            </div>
        )
    }
}
