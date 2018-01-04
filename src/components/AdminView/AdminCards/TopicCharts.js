import React, {Component} from 'react'
import './admincards.css'

class TopicCharts extends Component {

    render(){
        return(
            <div>
                <div className="big-circle-card m10">
        <button  className="bigCircle  jump shadowed flexed">
        <i className="fa fa-lg fa-bar-chart" aria-hidden="true"/>
        </button>
        <span style={{marginTop: '10px'}}>Topic Charts</span>
        </div>
                </div>
        )
    }
}
export default TopicCharts