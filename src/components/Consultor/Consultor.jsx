import React, { Component } from 'react'
import FormTags from 'components/FormTags/FormTags'
import ListaTags from 'components/ListaTags/ListaTags'
import Map from 'components/Map/Map'
import LanguageSelector from 'components/LanguageSelector/LanguageSelector';
import AvanzadaForm from 'components/AvanzadaForm/AvanzadaForm';
import { Tabs, Tab } from "react-bootstrap";
import BusquedaPorLugar from "components/BusquedaPorLugar/BusquedaPorLugar"
export default class Consultor extends Component {
    state = {
        avanzada: true
    }

    handleChangeAvanzada = () => {
        this.setState({ avanzada: !this.state.avanzada })
    }

    render() {
        let language = this.props.language
        return (
            <div>
                <FormTags addTag={this.props.addTag} changeNameQuery={this.props.changeNameQuery} addSemiTags={this.props.addSemiTags}  warning={this.props.warning}/>
                <ListaTags tags={this.props.tags} changeConnector={this.props.changeConnector} removeTag={this.props.removeTag} />
                {/* <AvanzadaForm handleChangeAvanzada={this.handleChangeAvanzada} /> */}
                {this.state.avanzada ?
                    (<>
                        <hr style={{ marginBottom: '5px' }} />
                        <LanguageSelector handleChangeLanguage={this.props.handleChangeLanguage} language={language} />
                        <Tabs defaultActiveKey={2} className="stepsConsultor" id="tab-uncontroller">
                            <Tab eventKey={1} title="Buscar por radio">
                                <Map handleChangeMapData={this.props.handleChangeMapData} />
                            </Tab>
                            <Tab eventKey={2} title="Buscar por región">
                                <BusquedaPorLugar {... this.props} />
                            </Tab>
                        </Tabs>
                    </>
                    ) : (<></>)
                }

            </div>
        )
    }
}
