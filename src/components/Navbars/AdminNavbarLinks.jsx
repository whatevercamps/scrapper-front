import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem, } from "react-bootstrap";

import CircleWithContent from "components/Circle/CircleWithContent/CircleWithContent"
class AdminNavbarLinks extends Component {


  state = {
    query: ''
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  }

  render() {
    return (
      <div>
        {
          (this.props.currentRoute || "").match(/resumen.*/) != null && (this.props.currentRoute || "").match(/resumen.*/).length > 0 ?
            (<>
              <Nav>
                <NavItem eventKey={1} onClick={() => this.props.handleItem(0)}>
                  <i style={{ display: 'inline' }} className="fa fa-edit" /><p style={{ display: 'inline' }}>Editar consulta</p>
                </NavItem>
                {
                  this.props.consulta ?
                    (<>
                      <NavDropdown
                        eventKey={2}
                        title={
                          <><CircleWithContent w={30} h={30} content={this.props.consulta.query.split(";").length} /><p style={{ display: "inline" }}>{" "}Conceptos</p></>
                        }
                        id="basic-nav-dropdown-right">
                        {this.props.consulta.query.split(";").map((tag, index) => {
                          return (
                            < MenuItem key={index} onClick={() => this.props.handleItem(0)} eventKey={"2." + (index + 1) * 1}>{tag}</MenuItem>
                          )
                        })
                        }

                      </NavDropdown>
                      <NavItem eventKey={3}>
                        <CircleWithContent
                          pt={4.4}
                          pl={6}
                          w={30}
                          h={30}
                          color={
                            this.props.consulta.status == "processing" ? "#1DC7EA" : this.props.consulta.status == "waiting" ? "#F9E55E" :this.props.consulta.status == "complete" ? "#9CFC97" : "#EF5151"
                          }
                          content={
                            this.props.consulta.status == "waiting" || this.props.consulta.status == "processing" ? (<i className="fa fa-hourglass fa-spin" style={{ fontSize: "16px", color: "#fff" }}></i>) 
                            : this.props.consulta.status == "complete" ? (<i className="fa fa-check" style={{ fontSize: "16px", color: "#fff" }}></i>)
                            : (<i className="fa fa-times" style={{ fontSize: "16px", color: "#fff" }}></i>)
                          } />
                        <p style={{ display: "inline", color:"#9A9A9A !important" }}>{
                          this.props.consulta.status == "processing" ? " Procesando" : this.props.consulta.status == "waiting" ? " En espera" : " Cargando resultados"
                        }
                        </p>
                      </NavItem>
                      <NavItem eventKey={4}>
                        {
                          this.props.resultado ? (
                            <CircleWithContent w={150} pl={30} h={30} content={this.props.resultado.size + " tweets"} r={30} />
                          ) : (
                            <></>
                          )
                        }
                       
                      </NavItem>
                    </>) : <></>
                }
              </Nav>
            </>)
            : <></>
        }
        <Nav pullRight>
          <NavDropdown
            eventKey={2}
            title="Cuenta"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.2}>Cerrar Sesión</MenuItem>
          </NavDropdown>
        </Nav>
      </div >
    );
  }
}

export default AdminNavbarLinks;
