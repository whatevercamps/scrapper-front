import React, { Component } from 'react'
import './language.css'


export default class Language extends Component {

    flagIconStyle = {
        fontSize: '28px',
        cursor: 'pointer'
    }


    render() {
        return (
            <div>
                <img onClick={() => this.props.handleLanguageClick(this.props.language.code)} src={this.props.language.img} alt={'...'} style={{maxWidth: '40px', cursor: 'pointer'}} className={this.props.l_selected == this.props.language.code ? 'checked' : 'uncheked'}/>
                {/* <span style={this.flagIconStyle} onClick={() => this.props.handleLanguageClick(this.props.language.code)} role="img" aria-label="sheep">{this.props.language.icon}</span> */}
            </div>
        )
    }
}
