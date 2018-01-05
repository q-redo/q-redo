import React, { Component } from "react"
import { Doughnut } from "react-chartjs-2"
import { Bar } from "react-chartjs-2"

import { connect } from "react-redux"
import axios from 'axios'

import TCchild from './TCchild/TCchild'
import "../admincards.css"

class TopicCharts extends Component {
  constructor() {
    super()
    this.state = {
      displayBox: false,
      graphType: "",
      searchType: "questions",
      cohortFilter: 0,
      campusFilter: 0,
      answeredFilter: "",
      topicFilter: 0,
      searchContent: [],
      noDupCampus: [],
      cohorts: [],
      allTopics: [],
      chartData: {
        labels: [
          "Nothing", "Has", "Been"
        ],
        datasets: [
          {
            label: "No Questions",
            data: [ 4, 6, 8, 0],
            backgroundColor: ["red", "green", "blue", "purple"]
          }
        ],
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  
                  min: 0,
                  stepSize: 1.0
                }
              }
            ]
          }
        }
      }
    }
  }

  handleSearchType(val) {
    this.setState({ searchType: val })
  }
  handleCampusFilter(val){
      this.setState({campusFilter: val})
  }
  handleCohortFilter(val){
      this.setState({cohortFilter: val})
  }
  handleAnsweredFilter(val){
      this.setState({answeredFilter: val})
  }
  handleTopicFilter(val){
      this.setState({topicFilter: val})
  }

  theCallBack(){
    let phraseHolder=this.state.searchType;
    if (this.state.cohortFilter > 0 && phraseHolder.length < 19){
        phraseHolder = phraseHolder.concat(` WHERE cohort_id = ${this.state.cohortFilter}`)
      }
      if (this.state.campusFilter > 0 && phraseHolder.length < 19){
        phraseHolder = phraseHolder.concat(` WHERE campus_id = ${this.state.campusFilter}`)
      }else if (this.state.campusFilter > 0 && phraseHolder.length >=19){
        phraseHolder = phraseHolder.concat(` AND campus_id = ${this.state.campusFilter}`)
      }
      if (this.state.answeredFilter.length > 0 && phraseHolder.length < 19){
        phraseHolder = phraseHolder.concat(` WHERE answered = ${this.state.answeredFilter}`)
      }else if (this.state.answeredFilter.length > 0 && phraseHolder.length >=19){
        phraseHolder = phraseHolder.concat(` AND answered = ${this.state.answeredFilter}`)
      }
      if (this.state.topicFilter > 0 && phraseHolder.length < 19){
        phraseHolder = phraseHolder.concat(` WHERE topic_id = ${this.state.topicFilter}`)
      }else if (this.state.topicFilter > 0 && phraseHolder.length >=19){
        phraseHolder = phraseHolder.concat(` AND topic_id = ${this.state.topicFilter}`)
      }
      console.log("the magical phrase you searched with was ", phraseHolder)
      return phraseHolder
}

    

    searchQuestions(type) {
      const colorMaker = function(){
        return Math.floor(Math.random() * 255)
        }
      const blankGraph = {
        labels: [
         
        ],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: []
          }
        ],
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1.0,
                  min: 0
                }
              }
            ]
          }
        }
      }
    axios
      .post("api/searchSpecificQuestions", { table_name: this.theCallBack() })
      .then(response => this.setState({ searchContent: response.data }))
      .then(() => {
        if(this.state.graphType === "UVA"){
          blankGraph.datasets[0].data[1] = 0
          blankGraph.datasets[0].data[0] = 0
        blankGraph.labels[1] = "Unanswered"
        blankGraph.labels[0] = "Answered"
        blankGraph.datasets[0].label = "Answered vs Unanswered"
        blankGraph.datasets[0].backgroundColor = ["blue", "red"]
       this.state.searchContent.forEach(occ => (
          occ.answered === false ? 
          blankGraph.datasets[0].data[1] += 1:
          blankGraph.datasets[0].data[0] += 1
          ))
          blankGraph.datasets[0].data[2] = 0
        } else if(this.state.graphType === "CT"){
          blankGraph.datasets[0].label = "Compare Topics"
          this.state.allTopics.forEach(occ => (
            blankGraph.labels.push(occ.topic) &
            blankGraph.datasets[0].data.push(this.state.searchContent.filter(id => id.topic_id === occ.id).length) &
            blankGraph.datasets[0].backgroundColor.push('rgb('.concat(colorMaker()+","+colorMaker()+","+colorMaker()+")"))
          ))
          blankGraph.datasets[0].data.push(0)
        }else if (this.state.graphType ==="TPCO"){
          
        }

        } 

      )
      .then(this.setState({chartData: blankGraph}))
    }

  getcohortandcampus(){
    let campHolder = [];
    let campObjects = [];
    let cohHolder = []
    let cohObjects = []
  axios.get("/api/getcampusandcohort")
  .then(response=> {
        console.log(response)
        response.data.map((campi, i) => (
            campHolder.indexOf(campi.campus_id) < 0 ?
            campHolder.push(campi.campus_id) & campObjects.push(campi) & this.setState({noDupCampus: campObjects}) :
            false)) & this.setState({cohorts: response.data}) & this.getTopics()
            })
    }

getTopics(){
    axios.get("/api/topics")
    .then(response => {
        this.setState({allTopics: response.data})
    })
}

  showBox() {
    this.state.displayBox === true
      ? this.setState({ displayBox: false })
      : this.setState({ displayBox: true })
  }

  changeGraphType(val){
      this.setState({graphType: val})
  }


  render() {
    const {noDupCampus, allTopics, cohorts, searchContent} = this.state
    
        const topicList = allTopics.map((topz, i) => (
            <option value={topz.id} key={i}>{topz.topic}</option>
        ))
        const campusList = noDupCampus.map((campz, i) => (
            <option value={campz.campus_id} key={i}>{campz.campus_name}</option>
        ))
        const cohortList = cohorts.map((coh, i) => (
            <option value={coh.cohort_id} key={i}>{coh.formal_name} of {coh.campus_name}</option>
        ))
    return (
      <div>
        <div className="big-circle-card m10">
        <button onClick={() => this.showBox() & this.getcohortandcampus()} className="bigCircle  jump shadowed flexed">
        <i className="fa fa-lg fa-bar-chart" aria-hidden="true"/>
        </button>
        <span style={{marginTop: '10px'}}>Topic Charts</span>
        </div>
        {this.state.displayBox === true ? (
          <div className="curved shadowed m10 adminpopupbox">
            <div className="admincenterboxcontent">
              <div>

              <select
                    defaultValue="questions"
                    onChange={e => this.handleSearchType(e.target.value)}
                  >
                    <option value="archived_questions">
                      Archived Questions
                    </option>
                    <option value="questions">Active Questions</option>
                  </select>
                  <select defaultValue="0" onChange={(e)=> this.handleCampusFilter(e.target.value)}>
                  <option value="0">No Campus Selected</option>
                  {campusList}
                  </select>
                  <select defaultValue="0" onChange={(e)=> this.handleCohortFilter(e.target.value)}>
                  <option value="0">No Cohort Selected</option>
                  {cohortList}
                      </select>
                      <select defaultValue="" onChange={(e)=> this.handleAnsweredFilter(e.target.value)}>
                  <option value="">No Answer Status Selected</option>
                  <option value="true">Answered</option>
                  <option value="false">Unanswered</option>
                  </select>
                  <select defaultValue="0" onChange={(e) => this.handleTopicFilter(e.target.value)}>
                  <option value="0">No Topic Selected</option>
                  {topicList}
                  </select>
                  <select defaultValue="" onChange={(e) => this.changeGraphType(e.target.value)}>
                      <option value="">No Graph Method Selected</option>
                      <option value="CT">Compare All Topics</option>
                      <option value="TPCA">Topic Type Per Campus</option>
                      <option value="TPCO">Topic Type Per Cohort</option>
                      <option value="UVA">Answered vs Unanswered</option>
                      </select>
                  <button
                    onClick={() => this.searchQuestions(this.state.searchType)}
                  > Search CLICK HERE!{" "}
                  </button>
                <Bar
                  data={this.state.chartData}
                  width={500}
                  height={330}
                  options={{ maintainAspectRatio: false }}
                />
                <button
                  onClick={() =>
                    console.log("whatisSTATE  ", this.state)
                  }
                />
              </div>
            </div>

            <button onClick={() => this.showBox()}> CANCEL / CLOSE </button>
          </div>
        ) : (
          false
        )}
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {})(TopicCharts)
