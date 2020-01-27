import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Pager } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import Tag from 'components/ListaTags/Tag'
import WordCloud from 'components/WordCloud/WordCloud'
import Polaridad from 'components/Polaridad/Polaridad'
import { Redirect } from "react-router-dom"
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import { thisTypeAnnotation } from "@babel/types";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tagActual: 0,
      tweetWidth: 0,
      wordCloudWidth: 0,
      wordCloudHeight: 0,
      i: 0,
      dataForBarChart: {
        labels: [],
        series: []
      },
      tweetWidth: 0
    };

    this.tweetContainerRef = React.createRef();
  }



  // componentWillReceiveProps(nextProps) {
  //   // console.log("antes de actualizar ", {antes: this.props, despues: nextProps})
  //   if (nextProps.resultado) {
  //     const { dataForBarChart } = this.state;
  //     let labelsBarChart = nextProps.resultado.keywords_analysis.sort((a, b) => (a.size < b.size) ? 1 : -1).slice(this.state.i, this.state.i + 4).map(d => d.name);
  //     let seriesBarChart = nextProps.resultado.keywords_analysis.sort((a, b) => (a.size < b.size) ? 1 : -1).slice(this.state.i, this.state.i + 4).map(d => d.size);

  //     dataForBarChart.labels = labelsBarChart;
  //     dataForBarChart.series = seriesBarChart;
  //     console.log("nuevo data for barchart ", dataForBarChart)
  //     this.setState({ dataForBarChart })
  //   }
  // }

  updateDimensions = () => {
    this.setState({ tweetWidth: this.tweetContainerRef.current ? this.tweetContainerRef.current.offsetWidth : 0 })
  };

  componentDidUpdate = () => {
    if (!this.state.tweetWidth && this.tweetContainerRef.current && this.tweetContainerRef.current.offsetWidth)
      this.setState({ tweetWidth: this.tweetContainerRef.current ? this.tweetContainerRef.current.offsetWidth : 0 })
  }

  componentDidMount() {
    this.props.setCurrentRoute(this.props.location.pathname)
    this.setState({
      tweetWidth: this.tweetContainerRef.current ? this.tweetContainerRef.current.offsetWidth : 0
      // wordCloudWidth: this.RefwordContainer? this.RefwordContainer.offsetWidth: 0,
      // wordCloudHeight: this.RefwordContainer? this.RefwordContainer.offsetHeight: 0
    })
    window.addEventListener('resize', this.updateDimensions);
  }

  handleNextTag = () => {
    console.log('next')
    let { tagActual } = this.state;
    if (tagActual < (this.props.consulta ? this.props.consulta.query.split(";").length - 1 : 0)) {
      console.log('si next')
      tagActual++;
      this.setState({ tagActual })
    }
  }

  handlePrevTag = () => {
    console.log('prev')
    let { tagActual } = this.state;
    if (tagActual > 0) {
      console.log('si prev')
      tagActual--;
      this.setState({ tagActual })
    }
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  render() {
    const { resultado } = this.props;
    console.log("en dashboard", { resultado: resultado, consulta: this.props.consulta })
    if (!this.props.consulta || this.props.consulta.status == "fail")
      return (<Redirect to='/admin/consultar' />)

    return (
      resultado ? (
        <div className="content">
          <Grid fluid>
            {/* <Row>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<div><i className="pe-7s-hourglass" /></div>}
                  statsText=""
                  statsValue={<span style={{ fontSize: '18px' }}></span>}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText=""
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-ribbon text-success" />}
                  statsText=""
                  statsValue={(this.props.consulta.query.split(";").length)}
                  statsIcon={<i className="fa fa-calendar-o" />}
                  statsIconText={""}
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="pe-7s-graph1 text-danger" />}
                  statsText="14/10/2019"
                  statsValue="23:12"
                  statsIcon={<i className="fa fa-clock-o" />}
                  statsIconText="Generar nueva versión"
                />
              </Col>
              <Col lg={3} sm={6}>
                <StatsCard
                  bigIcon={<i className="fa fa-twitter text-info" />}
                  statsText="Tweets"
                  statsValue={(resultado.size)}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Actualizar valor"
                />
              </Col>
            </Row> */}
            <Row>
              <Col md={8}>
                <Card
                  statsIcon="fa fa-check"
                  id="chartHours"
                  title=""
                  category=""
                  // ref={} //este es otra ref para el wordcloud tamaño fijo 
                  stats="Espacio para WordCloud"
                  content={
                    <div style={{ overflow: 'scroll' }}>
                      {/* <WordCloud wordCloudHeight={this.state.wordCloudHeight} wordCloudWidth={this.state.wordCloudWidth} words={this.props.consulta && resultado ? resultado.word_cloud : []} /> */}
                      <WordCloud words={this.props.consulta && resultado ? resultado.word_cloud : []} />
                    </div>
                  }
                  legend={
                    <div className="legend"></div>
                    // <div className="legend">{this.createLegend(legendSales)}</div>
                  }
                />
              </Col>
              <Col md={4}>
                <Card
                  statsIcon="fa fa-clock-o"
                  title={<>Sentimiento <span><i className="fa fa-angle-left" onClick={this.handlePrevTag} style={{ cursor: 'pointer' }} /><Tag tagEditable={false} width={200} tag={resultado.keywords_analysis[this.state.tagActual].name} /><i className="fa fa-angle-right" onClick={this.handleNextTag} style={{ cursor: 'pointer' }} /></span> </>}
                  category="Análisis general de polaridad"
                  stats="Campaign sent 2 days ago"
                  content={
                    resultado.keywords_analysis[this.state.tagActual].size <= 0 ?
                      (<div className="stats">
                        Este concepto no obtuvo resultados
                    </div>) :
                      (<div
                        id="chartPreferences"
                        className="ct-chart ct-perfect-fourth"
                      >
                        <ChartistGraph data={{
                          labels: [
                            (resultado.keywords_analysis[this.state.tagActual].positive * 100).toFixed(0) + "%",
                            (resultado.keywords_analysis[this.state.tagActual].negative * 100).toFixed(0) + "%"
                          ],
                          series: [
                            {
                              value: resultado.keywords_analysis[this.state.tagActual].positive * 100,
                              className: 'xx1'
                            },
                            {
                              value: resultado.keywords_analysis[this.state.tagActual].negative * 100,
                              className: 'xx2'
                            }]
                        }} type="Pie" />
                      </div>)
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Card
                  id="chartActivity"
                  title="Ponderado conceptos"
                  category={"Número de tweets por concepto " + this.props.resultado.keywords_analysis.sort((a, b) => (a.size < b.size) ? 1 : -1).slice(this.state.i, this.state.i + 4).map(d => d.name).length}
                  stats={resultado.keywords_analysis.filter(d => d.size == 0).length + " conceptos sin tweets"}
                  statsIcon="fa fa-check"
                  content={
                    <div className="ct-chart">
                      <ChartistGraph
                        data={{
                          labels: this.props.resultado.keywords_analysis.sort((a, b) => (a.size < b.size) ? 1 : -1).slice(this.state.i, this.state.i + 4).map(d => d.name),
                          series: [this.props.resultado.keywords_analysis.sort((a, b) => (a.size < b.size) ? 1 : -1).slice(this.state.i, this.state.i + 4).map(d => d.size)] //es importante que esté dentro de un array porque este chart maneja varios colores
                        }}
                        type="Bar"
                        options={optionsBar}
                        responsiveOptions={responsiveBar}
                      />
                    </div>
                  }
                  legend={
                    <Pager>
                      <Pager.Item previous onClick={() => {
                        let { i } = this.state
                        i = Math.max(0, i - 4)
                        this.setState({ i: i })
                      }}>
                        &larr; Anterior
  </Pager.Item>
                      <Pager.Item next onClick={() => {
                        let { i } = this.state
                        i = Math.min(i + 4, resultado.keywords_analysis.length - 4)
                        this.setState({ i: i })
                      }}>
                        Siguiente &rarr;
  </Pager.Item>
                    </Pager>
                  }
                />
              </Col>

              <Col md={6} >
                <Card

                  title="Top 50"
                  category="Los 50 Tweets con más retweets"
                  stats="Updated 3 minutes ago"
                  statsIcon="fa fa-history"
                  content={
                    <div className="table-full-width" style={{ height: '50vh', overflowX: 'hidden', overflowY: 'scroll' }} ref={this.tweetContainerRef}>
                      <table className="table">
                        <Tasks tweetWidth={this.state.tweetWidth || 0} tweets={resultado.retweets_analysis} />
                      </table>
                    </div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div >)
        :
        (<div style={{ height: '100vh', width: '100vw' }}>
          <div className="centered">
            <div class="lds-facebook">
              <div></div><div></div><div></div>
            </div >
            <div className="stats">
              {
                this.props.consulta.status == "processing" ? "La consulta está siendo procesada" : this.props.consulta.status == "waiting" ? "La consulta está esperando ser procesada" : "Cargando resultados..."}
            </div>
          </div>
        </div>)
    );
  }
}

export default Dashboard;
