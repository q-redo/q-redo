import React, {Component} from 'react'
import './admincards.css'
import axios from 'axios'

class CohortAssignment extends Component {
    constructor(){
        super()
        this.state = {
            displayBox: 0,
            optionsValue: 2,
            searchText: "",
            searchedStudents: [],
            campusAndCohorts: [],
          
        }
    }

    showBox(){
        this.state.displayBox === true ?
        this.setState({displayBox: false}) :
        this.setState({displayBox: true})
    }

    searchTextHandler(val){
        this.setState({searchText: val})
    }
    
    searchForStudent(text){
        axios.post("/api/studentsearch", {
            searchText: text
        })
        .then(response => {
           this.setState({searchedStudents: response.data})
        })
    }
    getcohortandcampus(){
        axios.get("/api/getcampusandcohort")
        .then(response=> {
            this.setState({campusAndCohorts: response.data})
        })
    }

    render(){
    const {searchedStudents} = this.state
    const {searchedStudents} = this.state
    const campuslist = this.state.campusAndCohorts.map((camp, i) => (
        <tr>
            <td>{camp.campus_id}</td>
            <td>{camp.name}</td>
            <td>{camp.cohort_id}</td>
            <td>{camp.formal_name}</td>

            </tr>
    ))
    const list = searchedStudents.map((student, i) => (
            <tr>
            <td>{student.user_id}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.logged_in ? "True" : "False"}</td>
            <td><select defaultValue={student.rank} onChange={(e)=> this.handleChange(student.user_id, e.target.value)}>
  <option value="3">Student</option>
  <option value="2">Mentor</option>
  <option value="1">Admin</option>
  
</select></td>
            </tr>
            ))
    return(
   
        <div>
            <div onClick={()=> this.showBox() & this.getcohortandcampus()}>Assign students to cohort. </div>
{ this.state.displayBox === false ?

<div className="curved shadowed m10 adminpopupbox">

<div className="admincenterboxcontent">     
<div>
    <center>{campuslist.length > 0? 
    <table>
  <tr>
    <th>Campus ID:</th>
    <th>Campus Name:</th> 
    <th>Cohort ID:</th>
    <th>Cohort Name: </th>
  </tr>
{campuslist}
</table> :
<div />}


    <input onChange={(e) => this.searchTextHandler(e.target.value)} /><button onClick={() => this.searchForStudent(this.state.searchText)}>Search for student</button>
   
   {list.length > 0? 
    <table>
  <tr>
    <th>ID:</th>
    <th>Name:</th> 
    <th>Email:</th>
    <th>Logged in: </th>
    <th>Rank: </th>
  </tr>
{list}
</table> :
<div />}


</center>
     </div> 
     
<button onClick={() => this.showBox()}> CANCEL / CLOSE </button></div>
<button onClick={() => console.log(this.state)}> WHATS STATE </button>
</div>
: false
}

            </div>
        )
    }
}
export default CohortAssignment