import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

class QuestionsPerCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      chartData: {
        labels: ['Provo', 'Salt Lake', 'Phoenix', 'Dallas'],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: []
          }
        ],
        options: {}
      }
    };
  }
  componentWillMount() {
    let provo = [];
    let slc = [];
    let phx = [];
    let dallas = [];
    let dataArr = [];
    let zeroArr = [];

    axios.get('/api/questionsPerCampus').then(response => {
      console.log(response.data);
      this.setState({ questionsList: response.data });

      this.state.questionsList.map((question, i) => {
        question.campus_id === 1
          ? provo.push(question)
          : question.campus_id === 2
            ? slc.push(question)
            : question.campus_id === 3
              ? phx.push(question)
              : question.campus_id === 4 ? dallas.push(question) : null;
      });

      dataArr.push(
        provo.length,
        slc.length,
        phx.length,
        dallas.length,
        zeroArr.length
      );
      this.setState({
        chartData: {
          datasets: [
            {
              label: 'Questions Per Campus',
              data: dataArr,
              backgroundColor: ['#5080f0', '#d82e52', '#7e5eb8', '#32def8']
            }
          ]
        }
      });
    });
  }

  render() {
    return (
      <div className="chart">
        <Bar data={this.state.chartData} width={400} height={400} />
      </div>
    );
  }
}

export default QuestionsPerCampus;
