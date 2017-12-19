import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      chartData: {
        labels: [
          'Javascript',
          'CSS',
          'Angular',
          'Redux',
          'React',
          'Node',
          'Other'
        ],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: []
          }
        ]
      }
    };
  }

  componentWillMount() {
    axios.get('/api/questions').then(response => {
      console.log(response.data);
      let questionTopics = [];
      let css = [];
      let react = [];
      let js = [];
      let angular = [];
      let node = [];
      let other = [];
      let data = [];

      response.data.map(question => questionTopics.push(question.topic_id));
      response.data.map(question => {
        question.topic_id === 5
          ? react.push(question.topic_id)
          : question.topic_id === 1
            ? js.push(question.topic_id)
            : question.topic_id === 3
              ? angular.push(question.topic_id)
              : question.topic_id === 6
                ? node.push(question.topic_id)
                : question.topic_id === 7
                  ? css.push
                  : other.push(question.topic_id);
      });
      data.push(
        react.length,
        js.length,
        angular.length,
        angular.length,
        node.length,
        css.length,
        other.length
      );
      console.log('data array', data);
      this.setState({
        topics: questionTopics,
        chartData: {
          datasets: [
            {
              label: 'Question Topics',
              data: data,
              backgroundColor: [
                'red',
                'blue',
                'green',
                'aquamarine',
                'yellow',
                'purple',
                'salmon'
              ]
            }
          ]
        }
      });
    });
  }

  render() {
    return (
      <div className="chart">
        <h1>Chart Here</h1>
        <Bar data={this.state.chartData} />
      </div>
    );
  }
}
export default Chart;
