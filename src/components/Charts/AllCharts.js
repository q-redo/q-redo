import React, { Component } from 'react';
import QuestionsPerCampus from './QuestionsPerCampus';
import QuestionsPerMentor from './QuestionsPerMentor';
import QuestionTopicChart from './QuestionTopicChart';
import './AllCharts.css';

class AllCharts extends Component {
  render() {
    return (
      <div class="all-charts-container">
        <div className="charts-top">
          <div className="chart-container chart-half">
            {' '}
            <QuestionsPerCampus />{' '}
          </div>
          <div className="chart-container chart-half">
            {' '}
            <QuestionTopicChart />
          </div>
        </div>

        <div
          style={{ border: 'solid 1px aquamarine' }}
          className="chart-container"
        >
          {' '}
          <QuestionsPerMentor />
        </div>
      </div>
    );
  }
}

export default AllCharts;
