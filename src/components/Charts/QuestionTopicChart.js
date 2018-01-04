import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class QuestionTopicChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      chartData: {
        labels: [
          'CSS',
          'Angular',
          'Redux',
          'React',
          'Javascript',
          'Node',
          'Other'
        ],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: []
          }
        ],
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1.0
                }
              }
            ]
          }
        }
      }
    };
  }

  componentWillMount() {
    axios.get('/api/questions').then(response => {
      console.log(response.data);
      let topics = [];
      let other = [];
      let css = [];
      let angular = [];
      let redux = [];
      let react = [];
      let js = [];
      let node = [];
      let data = [];

      response.data.map(question => topics.push(question.topic_id));
      console.log(topics);
      topics.map(curr => {
        curr === 1
          ? other.push(curr)
          : curr === 2
            ? css.push(curr)
            : curr === 3
              ? angular.push(curr)
              : curr === 4
                ? redux.push(curr)
                : curr === 5
                  ? react.push(curr)
                  : curr === 6
                    ? js.push(curr)
                    : curr === 7 ? node.push(curr) : null;
      });

      data.push(
        other.length,
        css.length,
        angular.length,
        redux.length,
        react.length,
        js.length,
        node.length
      );
      console.log(data);

      this.setState({
        topics: topics,
        chartData: {
          datasets: [
            {
              label: 'Question Topics',
              data: data,
              backgroundColor: [
                '#5080f0',
                '#d82e52',
                '#7e5eb8',
                '#32def8',
                '#f8e258',
                '#5f9c52',
                'rgb(255, 168, 249)'
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
        <h1>Questions by Topic</h1>
        <Bar data={this.state.chartData} width={400} height={400} />
      </div>
    );
  }
}
export default QuestionTopicChart;
