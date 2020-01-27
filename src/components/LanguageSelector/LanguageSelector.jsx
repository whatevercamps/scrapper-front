import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import Language from './Language'
import en_svg from "assets/img/en.svg";
import es_svg from "assets/img/es2.svg";
import por_svg from "assets/img/por2.svg";
import fr_svg from "assets/img/fr2.svg";
import {ControlLabel} from "react-bootstrap"
export default class LanguageSelector extends Component {

    state = {
        l_selected: 'es',
        languages: [
            {
                code: 'es',
                icon: '🇪🇸',
                img: es_svg
            }, {
                code: 'en',
                icon: '🇺🇸',
                img: en_svg
            }, {
                code: 'por',
                icon: '🇧🇷',
                img: por_svg
            }, {
                code: 'fr',
                icon: '🇫🇷',
                img: fr_svg
            }
        ]
    }


    handleLanguageClick = (e) => {
        this.setState({ l_selected: e })

        this.props.handleChangeLanguage(e)
    }
    render() {
        return (
            <div>
                <ControlLabel>{"   "} Lenguaje de consulta</ControlLabel>
                <Table striped>
                    <thead>
                        <tr>
                            {this.state.languages.map(language => {
                                return <th key={language.code} style={{ textAlign: 'center' }}>
                                    <Language language={language} handleLanguageClick={this.handleLanguageClick} l_selected={this.state.l_selected} />
                                </th>
                            })}
                        </tr>
                    </thead>
                </Table>
            </div>
        )
    }
}
