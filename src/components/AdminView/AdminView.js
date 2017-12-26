import React, {Component} from 'react'

import './adminview.css'

class AdminView extends Component {





    render(){
        return(
            <div className="admin-mainbox-flex">
            <div className="admin-group-box-by-row">
                <div className="admin-main-boxes curved shadowed m10">
                    Make mentors / admins
                    </div>
                    <div className="admin-main-boxes curved shadowed m10"> Create campuses</div>
                    <div className="admin-main-boxes curved shadowed m10">
                   create cohorts
                    </div>
              <div className="admin-main-boxes curved shadowed m10"> archive all questions button </div>
              <div className="admin-main-boxes curved shadowed m10">
                  assign students to cohort
                  </div>
                  <div className="admin-main-boxes curved shadowed m10">
                      delete questions
                      </div>
                      <div className="admin-main-boxes curved shadowed m10"> Search active questions by: all, cohort, campus
                          </div>
                          <div  className="admin-main-boxes curved shadowed m10"> link to topic chart(s)</div>
                          <div className="admin-main-boxes curved shadowed m10">search archived questions</div>
</div>




                </div>

        )
    }



}
export default AdminView