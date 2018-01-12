import React, {Component} from 'react'
import './admincards.css'
import axios from 'axios'

class CohortAssignment extends Component {
    constructor(){
        super()
        this.state = {
            displayBox: false,
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
    
    campusChange(id, val){
        axios.put("/api/changeusercampus", {
            user_id: id,
            campus_id: val
        })
        .then(response => console.log(response))
    }
    cohortChange(id, val){
        axios.put("/api/changeusercohort", {
            user_id: id,
            cohort_id: val
        })
        .then(response => console.log(response))
    }
    handleRank(id, val){
        axios.put("/api/changeuserrank", {
            user_id: id,
            rank: val
        })
        .then(response => console.log(response))
    
    }

    render(){
    const {searchedStudents} = this.state
   
    const studentlist = searchedStudents.map((student, i) => (
            <tr key={i}>
            <td>{student.user_id}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.logged_in ? "True" : "False"}</td>
            <td><select defaultValue={student.rank} onChange={(e)=> this.handleRank(student.user_id, e.target.value)}>
  <option value="3">Student</option>
  <option value="2">Mentor</option>
  <option value="1">Admin</option>
  
</select></td>
            <td><select defaultValue={student.campus_id} onChange={(e)=> this.campusChange(student.user_id, e.target.value)}>
                <option value="4">DALLAS</option>
                <option value="1">PROVO</option>
                <option value="2">SALT_LAKE</option>
                <option value="3">PHOENIX</option></select></td>
            <td><select defaultValue={student.cohort_id} onChange={(e)=> this.cohortChange(student.user_id, e.target.value)}>
                <option value="1">Cohort 1</option>
                <option value="2">Cohort 2</option>
                <option value="3">Cohort 3</option>
                <option value="4">Cohort 4</option></select></td>
                
            
            
            </tr>
            
            ))
    return(
   
        <div>
        <div className="big-circle-card m10">
        <button onClick={()=> this.showBox()} className="bigCircle  jump shadowed flexed">
        <i className="fa fa-lg fa-user-plus" aria-hidden="true"/>
        </button>
        <span style={{marginTop: '10px'}}>User Assignment</span>
        </div>
{ this.state.displayBox === true ?

<div className="curved shadowed m10 adminpopupbox">

<div className="admincenterboxcontent">     
<div>
    <center>


    <input placeholder='Student Name' onChange={(e) => this.searchTextHandler(e.target.value)} /><button onClick={() => this.searchForStudent(this.state.searchText)}>Search</button>
   
   {studentlist.length > 0? 
    <table>
        <tbody>
  <tr>
    <th>ID</th>
    <th>Name</th> 
    <th>Email</th>
    <th>Logged In </th>
    <th>Rank </th>
    <th>Campus</th>
    <th>Cohort</th>
  </tr>
{studentlist}
</tbody>
</table> :
<div />}


</center>
     </div> 
     <i onClick={() => this.showBox()} className="m10 fa fa-times fa-lg"/>
</div>

</div>
: false
}

            </div>
        )
    }
}
export default CohortAssignment