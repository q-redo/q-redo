import React, { Component } from "react"
import "./admincards.css"

class DeleteQuestions extends Component {
  render() {
    return (
      <div>
        <div className="big-circle-card m10">
          <button className="bigCircle  jump shadowed flexed">
            <i className="fa fa-lg fa-trash" aria-hidden="true" />
          </button>
          <Link to="/allcharts">
            <span style={{ marginTop: "10px" }}>Charts</span>
          </Link>
        </div>
      </div>
    )
  }
}
export default DeleteQuestions
