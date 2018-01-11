import React, {Component} from 'react'

import ArchiveQuestions from './AdminCards/ArchiveQuestions'
import UserAssignment from './AdminCards/UserAssignment'
import CreateCampus from './AdminCards/CreateCampus'
import CreateCohort from './AdminCards/CreateCohort'
import DeleteQuestions from './AdminCards/DeleteQuestions'
import axios from 'axios';

import SearchQuestions from './AdminCards/SearchQuestions'

import TopicCharts from './AdminCards/TopicCharts/TopicCharts'


import './adminview.css'

class AdminView extends Component {

    componentWillMount(){
        axios.get('/api/me').then(response => {if(response.data.rank === 2){
          window.location.href = '/mentorview'
        }else if(response.data.rank === 3){
         window.location.href = '/student'
        }}).catch((error) => {
          error.response.data === "no_user"? window.location.href = '/login':null;
        }
        )
      }

    render(){
        return(
            <div className="admin-position  flexed m10 shadowed curved">
                <section className="admin-section flexed">
                   <CreateCampus />
                   <CreateCohort />     
                   <UserAssignment />
                   <TopicCharts />
                </section>
                <section className="admin-section flexed" style={{margin: "0px 40px 0px 40px"}}>
                   <SearchQuestions />
                   <ArchiveQuestions /> 
                   <DeleteQuestions />
                </section>
            </div>

        )
    }



}
export default AdminView