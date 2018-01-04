import React, { Component } from "react"
import "./admincards.css"
import axios from "axios"

class SearchQuestions extends Component {
  constructor() {
    super()
    this.state = {
      searchType: "questions",
      cohortFilter: 0,
      campusFilter: 0,
      answeredFilter: "",
      topicFilter: 0,  
      displayBox: false,
      searchContent: [],
      noDupCampus: [],
      cohorts: [],
      allTopics: []
    }
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
  showBox() {
    this.state.displayBox === true
      ? this.setState({ displayBox: false })
      : this.setState({ displayBox: true })
  }
  searchQuestions(type) {
    axios
      .post("api/searchSpecificQuestions", { table_name: this.theCallBack() })
      .then(response => this.setState({ searchContent: response.data }))
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
            false
        )) & this.setState({cohorts: response.data}) & this.getTopics()
    })
}
    getTopics(){
        axios.get("/api/topics")
        .then(response => {
            this.setState({allTopics: response.data})
        })
    }

    deleteQuestion(){
      "I AM BROKEN!!!!!!!!"
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
    const questionsList = searchContent.map((ques, i) => (
      <tr key={i}>
      <td>{ques.question}</td>
      <td>{ques.code_block}</td>
      <td>{ques.time}</td>
      <td>{ques.answered}</td>
      <td className="divtestfix"><button onClick={()=> this.deleteQuestion}> X</button></td>
      </tr>
    ))

    return (
      <div>
        <div className="big-circle-card m10">
        <button onClick={()=> this.showBox() & this.getcohortandcampus()} className="bigCircle  jump shadowed flexed">
        <i className="fa fa-lg fa-search" aria-hidden="true"/>
        </button>
        <span style={{marginTop: '10px'}}>Search Questions</span>
        </div>
        {this.state.displayBox === true ? (
          <div className="curved shadowed m10 adminpopupbox">
            <div className="admincenterboxcontent">
              <div>
                <center>
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
                  <button
                    onClick={() => this.searchQuestions(this.state.searchType)}
                  >
                    {" "}
                    Search CLICK HERE!{" "}
                  </button>

     


                </center>
              </div>
              {questionsList.length > 0? 
                  <div className="adminSearchTableWidthSpecs">
    <table>
        <tbody>
  <tr>
    <th>Question:</th>
    <th>Code:</th> 
    <th>Date/time:</th>
    <th>Answered: </th>
      <th> Delete:</th>
      </tr>
{questionsList}
</tbody>
</table></div> :
<div />}
              <button onClick={() => console.log(this.state)}>
                {" "}
                What is state
              </button>
              <i onClick={() => this.showBox()} className="m10 fa fa-times fa-lg"/>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    )
  }
}
export default SearchQuestions
