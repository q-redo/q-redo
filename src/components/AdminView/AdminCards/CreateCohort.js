import React, {Component} from 'react'
import './admincards.css'
import axios from 'axios'

class CreateCohort extends Component {
    constructor(){
        super()
        this.state={
            displayBox: false,
            campusAndCohorts: [],
            cohortNameText: "",
            campusID: null,
            nodup: []
            
         
        }
    }

   
   

    showBox(){
        this.state.displayBox === true ?
        this.setState({displayBox: false}) :
        this.setState({displayBox: true})
    }

    getcohortandcampus(){
        let holder = []
        let objectz = []
        axios.get("/api/getcampusandcohort")
        .then(response=> {
            console.log(response)
            this.setState({campusAndCohorts: response.data}) &
            response.data.map((campi, i) => (
            holder.indexOf(campi.campus_id) < 0 ?
            holder.push(campi.campus_id) & objectz.push(campi) & this.setState({nodup: objectz}) :
            false
        ))
        })
    }
    createCohortText(val){
        this.setState({cohortNameText: val})
    }

    sendCohortCreate(cohortname, campusid){
        axios.post("/api/createcohort",{
           campus_id: campusid,
           formal_name: cohortname
        }).then(()=> this.hideBox())
    }
    hideBox(){
        alert("Cohort Created!")
        this.setState({displayBox: false})
    }

    handleCohortID(val){
        this.setState({campusID: val})
    }
    
    
    
    render(){
        const {campusAndCohorts, nodup} = this.state
        const campuslist = campusAndCohorts.map((campo, i) => (
            <tr key={i}>
                <td >{campo.cohort_id}</td>
                <td >{campo.campus_name}</td>
                <td >{campo.campus_id}</td>
                <td >{campo.formal_name}</td>
                </tr>
        ))
        
        
        let noduplicates = []
        const campusids = nodup.map((objz, i) => (
            <option value={objz.campus_id}>{objz.campus_name}</option> 
        ))
        
        return(
            <div>
                <div className="big-circle-card m10">
        <button onClick={()=> this.showBox() & this.getcohortandcampus()} className="bigCircle  jump shadowed flexed">
        <i className="fa fa-lg fa-users" aria-hidden="true"/>
        </button>
        <span style={{marginTop: '10px'}}>Create Cohort</span>
        </div>
{ this.state.displayBox === true ?
    
<div className="curved shadowed m10 adminpopupbox">

<div className="admincenterboxcontent">     
<div>
    <center>

    <p> Assign the cohort to this campus: </p>
    <select defaultValue="1" onChange={(e)=> this.handleCohortID(e.target.value)}>
     {campusids}
    </select>
    <p> Set cohort formal name: </p>
        <input placeholder='New Cohort Name' onChange={(e) => this.createCohortText(e.target.value)} /><button onClick={() => this.sendCohortCreate(this.state.cohortNameText, this.state.campusID)}>Create Cohort</button>

    {campuslist.length > 0? 
    <div>
    <table>
        <tbody>
        
  <tr>
    <th>Campus ID</th>
    <th>Campus Name</th> 
    <th>Cohort ID</th>
    <th>Cohort Name</th>
      </tr>
{campuslist}
</tbody>
</table></div> :
<div />}


  


</center>
     </div> 
     
     <i onClick={() => this.showBox()} className="m10 fa fa-times fa-lg"/></div>
</div>
: false
}

            </div>
               
        )
    }
}

export default CreateCohort