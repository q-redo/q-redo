import React, {Component} from 'react'

import './admincards.css'

class RankChange extends Component {
    constructor (){
        super()
        this.state = {
            optionsValue: 3
        }
    }

handleChange(val){
    this.setState({optionsValue: val})
}



render(){
    return(
        <div>
            Promote/demote admin, student, mentor.
            <select value={this.state.optionsValue} onChange={(e)=> this.handleChange(e.target.value)}>
  <option value="3">Student</option>
  <option value="2">Mentor</option>
  <option value="1">Admin</option>
  
</select>
<button onClick={() => console.log(this.state)}> Whats State </button>
            </div>

    )
}

}
export default RankChange