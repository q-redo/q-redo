import React, {Component} from 'react'
import './admincards.css'
import axios from 'axios'

class ArchiveQuestions extends Component {
    constructor(){
        super()
        this.state={
            displayBox: false,
            
            
         
        }
    }
    showBox(){
        this.state.displayBox === true ?
        this.setState({displayBox: false}) :
        this.setState({displayBox: true})
    }

     hideBox(){
        alert("Cohort Created!")
        this.setState({displayBox: false})
    }

    archiveQuestions(){
        axios.get('/api/archiveallquestions')
        .then(response=> response.data)

    }

    render(){
        return(
        <div>
        <div className="big-circle-card m10">
        <button onClick={()=> this.showBox()} className="bigCircle  jump shadowed flexed">
        <i className="fa fa-lg fa-archive" aria-hidden="true"/>
        </button>
        <span style={{marginTop: '10px'}}>Archive Questions</span>
        </div>
{ this.state.displayBox === true ?

<div className="curved shadowed m10 adminpopupbox">

<div className="admincenterboxcontent">     
<div>
    <center>


<p> This will archive all active questions! </p>
<button onClick={()=> this.archiveQuestions()}> ARCHIVE NOW</button>


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
export default ArchiveQuestions