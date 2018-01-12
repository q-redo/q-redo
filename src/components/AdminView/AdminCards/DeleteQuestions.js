import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./admincards.css"

class DeleteQuestions extends Component {


redirector(){
    window.location.href = "/allcharts"
}

  render() {
    return (
      <div>
        <div className="big-circle-card m10">
          <div onClick={() => this.redirector()}>
            <button className="bigCircle  jump shadowed flexed">
              <i
                style={{
                  textDecorationLine: "none",
                  textDecoration: "none",
                  textDecorationUnderline: "none",
                  textDecorationColor: "none"
                }}
                className="fa fa-lg fa-pie-chart"
                aria-hidden="true"
              />
            </button>
          </div>

          <span style={{ marginTop: "10px" }}>Charts</span>
        </div>
      </div>
    )
  }
}
export default DeleteQuestions
