import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./admincards.css"

class DeleteQuestions extends Component {
  render() {
    return (
      <div>
        <div className="big-circle-card m10">
          <Link to="/allcharts">
            <button className="bigCircle  jump shadowed flexed">
              <i className="fa fa-lg fa-pie-chart" aria-hidden="true" />
            </button>

            <span style={{ marginTop: "10px", textDecoration: "none" }}>
              Charts
            </span>
          </Link>
        </div>
      </div>
    )
  }
}
export default DeleteQuestions
