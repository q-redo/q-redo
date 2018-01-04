import React, {Component} from 'react'

import ArchiveQuestions from './AdminCards/ArchiveQuestions'
import UserAssignment from './AdminCards/UserAssignment'
import CreateCampus from './AdminCards/CreateCampus'
import CreateCohort from './AdminCards/CreateCohort'
import DeleteQuestions from './AdminCards/DeleteQuestions'

import SearchQuestions from './AdminCards/SearchQuestions'

import TopicCharts from './AdminCards/TopicCharts/TopicCharts'


import './adminview.css'

class AdminView extends Component {





    render(){
        return(
            <div className="admin-position">
            <div className="admin-mainbox-flex">
            <div className="admin-group-box-by-row">
              <div className="admin-main-boxes curved adminshadowed m10"> <CreateCampus /></div>
                    <div className="admin-main-boxes curved adminshadowed m10">
                   <CreateCohort />
                    </div>
              <div className="admin-main-boxes curved adminshadowed m10"> <ArchiveQuestions /> </div>
              <div className="admin-main-boxes curved adminshadowed m10">
                  <UserAssignment />
                  </div>
                  <div className="admin-main-boxes curved adminshadowed m10">
                      <DeleteQuestions />
                      </div>
                      <div  className="admin-main-boxes curved adminshadowed m10"> <TopicCharts /></div>
                      <div className="admin-main-boxes curved adminshadowed m10"> <SearchQuestions />
                          </div>
                          
</div>
</div>
</div>

        )
    }



}
export default AdminView