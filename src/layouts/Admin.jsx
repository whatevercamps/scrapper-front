import React, { Component, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import ModalCrearConsulta from "components/Modal/ModalCrearConsulta";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

import image from "assets/img/sidebar-3.jpg";

//Firebase
import * as firebase from "firebase/app";
import { firebaseConfig } from 'variables/Config'
import 'firebase/database';
import { isConstructorDeclaration } from "typescript";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open",
      currentRoute: "",
      consultas: [],
      consultaActual: null,
      resultadoActual: null,
      shown: [false],
      irAResumen: false,
      selectedPlace: null,
      places: [],
      selectedplaceIndex: 0,
      // tags: [
      //   "Pastillas anticonceptivos",
      //   "Condones",
      //   "Pastilla del día después",
      //   "Test ovulación",
      //   "Eyacular fuera",
      //   "Implante embarazo",
      //   "Dispositivo intrauterino",
      //   "Muchas hormonas anticoncepción",
      //   "Malta caliente",
      //   "Canela caliente",
      //   "Cerveza caliente",
      //   "Cerveza negra caliente",
      //   "anillo embarazo",
      //   "Dispositivo uterino"
      // ],
      tags: [],
      nameConsulta: 'abcde',
      geocode: '4.115350699646785,-72.584710852785,100km',
      language: 'es',
      semiTags: ''
    };

    if (firebase.apps.length === 0) {
      this.app = firebase.initializeApp(firebaseConfig, 'app_jaja');
      this.db_resultados = this.app.database().ref('resultados')
      this.db_consultas = this.app.database().ref('consultas')
    }
  }



  setPlaces = placesP => {
    this.setState({ places: placesP })
  }
  setPlaceIndex = index => {
    this.setState({ selectedPlaceIndex: index });
  }

  setPlace = (sp) => {
    this.setState({ selectedPlace: sp })
  }

  setCurrentRoute = (routep) => {
    this.setState({ currentRoute: routep })
  }
  handleChangeLanguage = (e) => {
    let { language } = this.state;
    language = e;
    this.setState({ language });
  }

  resetIrAResumen = () => {
    this.setState({ irAResumen: false })
  }

  handleChangeMapData = (e) => {
    let { geocode } = this.state;
    geocode = e;
    this.setState({ geocode });
  }

  setConsultaActual = (id) => {
    console.log("idConsulta", id)
    let { consultas, consultaActual, resultadoActual } = this.state;
    let consulta = consultas.find(d => d.id == id)
    if (consulta) {
      consultaActual = consulta;

      this.db_resultados.child(consultaActual.id)
        .once("value")
        .then(snap => {
          console.log("sisas", snap.key)
          let resultado = {
            id: snap.key,
            date: snap.val().date,
            keywords_analysis: snap.val().keywords_analysis,
            retweets_analysis: snap.val().retweets_analysis,
            size: snap.val().size || 0,
            word_cloud: snap.val().word_cloud || [{ text: 'sin palabras', value: 100 }]
          }

          resultadoActual = resultado;
          this.setState({ consultaActual, resultadoActual })
        })
        .catch(error => console.log("error", {
          errorCode: error.code,
          errorMessage: error.message
        }));
      this.setState({ consultaActual })
    }
  }

  crearConsulta = () => {
    this.setState({ resultadoActual: null })
    let { tags, geocode, language, selectedPlace } = this.state;
    let query = "";
    if (tags.length > 0) {
      for (var i = 0; i < tags.length; i++) {
        if (!tags[i].connector)
          query += tags[i].trim();
        else
          query += tags[i].forJoin;
      }
    }

    query = query.replace(/ +(?= )/g, '').trim();

    let body = {
      query: query,
      name: "sin nombre",
      radius: selectedPlace ? null : geocode,
      lang: language,
      status: 'waiting',
      place: selectedPlace
    }
    if (tags.length >= 0) {
      fetch('https://us-central1-smdt-ae3d7.cloudfunctions.net/addQuery', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }).then(res => {
        if (res.status === 200) {
          // this.setState({ tags: [] })
          this.state._notificationSystem.addNotification({
            title: <span data-notify="icon" className="pe-7s-check" />,
            message: (
              <div>
                Consulta creada <b>correctamente</b>.
              </div>
            ),
            level: "success",
            position: "tr",
            autoDismiss: 5
          });

          res.json().then(data => {
            console.log("id_consulta_creada", data.id)
            console.log("pre2 buscando cositas")
            let { consultaActual } = this.state;
            console.log("pre buscando cositas")
            setTimeout(() => {
              console.log("buscando cositas")
              this.db_consultas.child(data.id)
                .once("value")
                .then(snap => {
                  console.log("consulta creada en db", snap.val())
                  if (snap.val()) {
                    let consulta = {
                      id: snap.key,
                      name: snap.val().nameQuery,
                      query: snap.val().query,
                      status: snap.val().status
                    }

                    consultaActual = consulta;
                    this.setState({ consultaActual })
                    this.setState({ irAResumen: true })
                    console.log("state resumen", this.state.irAResumen)
                  }
                });
            }, 1000);
          })
        }
      }).catch(errr => {
        console.log(errr)
      })
    }
  }

  handleItem = (num) => {
    const { shown } = this.state;
    shown[num] = !shown[num];
    this.setState({ shown })
  }

  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            key={key}
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
                consulta={this.state.consultaActual}
                resultado={this.state.resultadoActual}
                setCurrentRoute={this.setCurrentRoute}
                handleChangeMapData={this.handleChangeMapData}
                handleChangeLanguage={this.handleChangeLanguage}
                changeConnector={this.changeConnector}
                crearConsulta={this.crearConsulta}
                addTag={this.addTag}
                changeNameQuery={this.changeNameQuery}
                removeTag={this.removeTag}
                tags={this.state.tags}
                handleItem={this.handleItem}
                shown={this.state.shown[0]}
                irAResumen={this.state.irAResumen}
                resetIrAResumen={this.resetIrAResumen}
                setPlaces={this.setPlaces}
                setPlace={this.setPlace}
                selectedPlaceIndex={this.state.selectedPlaceIndex}
                places={this.state.places}
                setPlaceIndex={this.setPlaceIndex}
              />
            )}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };

  addTag = (tag, nameConsulta) => {

    let { tags } = this.state;

    let ptags = tag.split(/,|;|-/);
    ptags.forEach(t => {
      tags.push(t);
      tags.push({ connector: "y (and)", forJoin: " " })
    });

    this.setState({ tags })
    this.setState({ nameConsulta: nameConsulta })
  }

  changeConnector = (index, connector) => {
    let { tags } = this.state;
    if (tags[index].connector)
      tags[index] = connector
    this.setState({ tags })
  }

  changeNameQuery = (nameCosulta) => {
    this.setState({ nameConsulta: nameCosulta })
  }

  removeTag = (index) => {
    console.log("remover", index)
    let { tags } = this.state;
    if (!tags[index].connector) {
      let removidos = tags.splice(index, 2);
      console.log("removidos", removidos)
    }
    this.setState({ tags })
  }

  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    console.log("didMouth", this.state.consultas)
  }


  componentWillMount() {
    console.log("willMouth", this.state.consultas)
    this.db_consultas
      .on('child_added', snap => {
        // const { consultas, consultaActual } = this.state; //OJO borrar consulta actual cuando se termine la parte de resultados
        const { consultas } = this.state;
        consultas.push({
          id: snap.key,
          name: snap.val().nameQuery,
          query: snap.val().query,
          status: snap.val().status
        });
        console.log("jajaja", Math.max(0, consultas.length))
        // let consultaActual2 = consultaActual || consultas[0]
        // this.setState({ consultas, consultaActual : consultaActual2 });
        this.setState({ consultas });
      });

    this.db_consultas
      .on('child_changed', snap => {
        const { consultas } = this.state;
        let newOb = {
          id: snap.key,
          name: snap.val().nameQuery,
          query: snap.val().query,
          status: snap.val().status
        }
        console.log("cambio", newOb);
        if (newOb.status == "fail") {
          this.state._notificationSystem.addNotification({
            title: <span data-notify="icon" className="pe-7s-check" />,
            message: (
              <div>
                La consulta no obtuvo resultados.
              </div>
            ),
            level: "error",
            position: "tr",
            autoDismiss: 5
          });
        }
        if (this.state.consultaActual)
          if (newOb.id === this.state.consultaActual.id) {
            this.setState({ consultaActual: newOb })
          }

        this.setState({ consultas });
      });

    this.db_resultados
      .on('child_changed', snap => {
        let resultado = {
          id: snap.key,
          date: snap.val().date,
          keywords_analysis: snap.val().keywords_analysis,
          retweets_analysis: snap.val().retweets_analysis,
          size: snap.val().size || 0,
          word_cloud: snap.val().word_cloud || [{ text: 'sin palabras', value: 100 }]
        };
        console.log("resultado_changed", { resultado: resultado, consulta: this.state.consultaActual })
        if (this.state.consultaActual) {
          console.log("entro al primer if")
          if (this.state.consultaActual.id == resultado.id) {
            console.log("entró al último if", { resultado: resultado, consulta: this.state.consultaActual })
            this.setState({ resultadoActual: resultado });
          }
        }
      });

    this.db_resultados
      .on('child_added', snap => {
        let resultado = {
          id: snap.key,
          date: snap.val().date,
          keywords_analysis: snap.val().keywords_analysis,
          retweets_analysis: snap.val().retweets_analysis,
          size: snap.val().size || 0,
          word_cloud: snap.val().word_cloud || [{ text: 'sin palabras', value: 100 }]
        };
        console.log("resultado_added", { resultado: resultado, consulta: this.state.consultaActual })
        if (this.state.consultaActual) {
          console.log("entro al primer if")
          if (this.state.consultaActual.id == resultado.id) {
            console.log("entró al último if", { resultado: resultado, consulta: this.state.consultaActual })
            this.setState({ resultadoActual: resultado });
          }
        }
      });
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
          color={this.state.color}
          consultas={this.state.consultas}
          hasImage={this.state.hasImage}
          handleItem={this.handleItem} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            setConsultaActual={this.setConsultaActual}
            brandText={this.getBrandText(this.props.location.pathname)}
            consulta={this.state.consultaActual}
            resultado={this.state.resultadoActual}
            tags={this.state.tags}
            changeConnector={this.changeConnector}
            removeTag={this.removeTag}
            handleItem={this.handleItem}
            currentRoute={this.state.currentRoute}
            handleItem={this.handleItem}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          {/* <Footer /> */}
          <ModalCrearConsulta
            selectedPlaceIndex={this.state.selectedPlaceIndex}
            places={this.state.places}
            setPlaceIndex={this.setPlaceIndex}
            setPlace={this.setPlace}
            handleChangeMapData={this.handleChangeMapData}
            changeConnector={this.changeConnector}
            handleChangeLanguage={this.handleChangeLanguage}
            crearConsulta={this.crearConsulta}
            addTag={this.addTag}
            changeNameQuery={this.changeNameQuery}
            removeTag={this.removeTag}
            tags={this.state.tags}
            connectors={null}
            handleItem={this.handleItem}
            shown={this.state.shown[0]} />
        </div>
      </div>
    );
    // } else {
    //   return (
    //     <div className="wrapper">
    //       <NotificationSystem ref="notificationSystem" style={style} />
    //       <Sidebar {...this.props} routes={routes} image={this.state.image}
    //         color={this.state.color}
    //         consultas={this.state.consultas}
    //         hasImage={this.state.hasImage}
    //         handleItem={this.handleItem} />
    //       <div id="main-panel" className="main-panel" ref="mainPanel">
    //         <AdminNavbar
    //           {...this.props}
    //           setConsultaActual={this.setConsultaActual}
    //           brandText={this.getBrandText(this.props.location.pathname)}
    //           consultas={this.state.consultas}
    //           handleItem={this.handleItem}
    //         />
    //         <div>
    //           Cargando
    //         </div>
    //         {/* <Footer /> */}
    //         <ModalCrearConsulta handleChangeMapData={this.handleChangeMapData} handleChangeLanguage={this.handleChangeLanguage} crearConsulta={this.crearConsulta} addTag={this.addTag} removeTag={this.removeTag} tags={this.state.tags} handleItem={this.handleItem} shown={this.state.shown[0]} language={this.state.language} />
    //       </div>
    //     </div>
    //   );
    // }
  }
}

export default Admin;
