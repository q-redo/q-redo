import React, {Component} from 'react'
import './admincards.css'
import axios from 'axios'

class CreateCampus extends Component {
    constructor(){
        super()
        this.state={
            displayBox: false,
            campusAndCohorts: [],
            campusNameText: ""
        }
    }


    showBox(){
        this.state.displayBox === true ?
        this.setState({displayBox: false}) :
        this.setState({displayBox: true})
    }

    getcohortandcampus(){
        axios.get("/api/getcampusandcohort")
        .then(response=> {
            console.log(response)
            this.setState({campusAndCohorts: response.data})
        })
    }
    createCampusText(val){
        this.setState({campusNameText: val})
    }

    sendCampusCreate(campusname){
        axios.post("/api/createcampus",{
            campus_name: campusname
        }).then(()=> this.hideBox())
    }
    hideBox(){
        alert("Campus Created!")
        this.setState({displayBox: false})
    }

    render(){
        const {campusAndCohorts} = this.state
        const campuslist = campusAndCohorts.map((campo, i) => (
            <tr key={i}>
                <td>{campo.campus_id}</td>
                <td>{campo.campus_name}</td>
                <td>{campo.cohort_id}</td>
                <td>{campo.formal_name}</td>

                </tr>
        ))
        return(
            <div>
                <div onClick={()=> this.showBox() & this.getcohortandcampus()}>Create Campus </div>
{ this.state.displayBox === true ?

<div className="curved shadowed m10 adminpopupbox">

<div className="admincenterboxcontent">     
<div>
    <center>

    {campuslist.length > 0? 
    <table>
        <tbody>
  <tr>
    <th>Campus ID:</th>
    <th>Campus Name:</th> 
    <th>Cohort ID:</th>
    <th>Cohort Name: </th>
      </tr>
{campuslist}
</tbody>
</table> :
<div />}



    <input onChange={(e) => this.createCampusText(e.target.value)} /><button onClick={() => this.sendCampusCreate(this.state.campusNameText)}>Create Campus Click Here!</button>
   
  


</center>
     </div> 
     
<button onClick={() => this.showBox()}> CANCEL / CLOSE </button></div>
</div>
: false
}

            </div>
               
        )
    }
}
export default CreateCampus