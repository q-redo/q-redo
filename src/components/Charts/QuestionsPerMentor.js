import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class QuestionsPerMentor extends Component {
  constructor(props) {
    super(props);
    // let mentor1 = 0;
    // let mentor2 = 0;
    let mentor3 = 0;
    this.state = {
      typedText1: '',
      typedText2: '',
      typedText3: '',
      mentor1: '',
      mentor2: '',
      mentor3: ''
    };
    this.getQuestionsPerMentor2 = this.getQuestionsPerMentor2.bind(this);
    this.updateMentor1 = this.updateMentor1.bind(this);
    this.updateMentor2 = this.updateMentor2.bind(this);
    //this.updateMentor3 = this.updateMentor3.bind(this);
  }
  getQuestionsPerMentor2(id) {
    console.log('look at my id', id);
    axios
      .get(`/api/getMentorAnswered/${id}`)
      .then(response => {
        this.setState({
          mentor1: response.data[0].user_answered,
          mentor2: response.data[0].user_answered
        });
      })
      .then(whatever => {
        this.setState({
          chartData: {
            labels: ['Mentor1', 'Mentor2', 'Mentor 3'],
            datasets: [
              {
                data: [
                  this.state.mentor1,
                  this.state.mentor2,
                  7
                  // { mentor1: 5 },
                  // { mentor2: this.state.mentor2 },
                  // { mentor3: mentor3 }
                ],
                backgroundColor: [
                  '#5080f0',
                  '#d82e52',
                  '#7e5eb8',
                  '#222222',
                  'rgb(255, 168, 249)'
                ]
              }
            ]
            // options: {
            //   scales: {
            //     display: true,
            //     beginAtZero: true,
            //     scales: {
            //       yAxes: [
            //         {
            //           beginAtZero: true,
            //           ticks: {
            //             suggestedMin: 0
            //           }
            //         }
            //       ]
            //     }
            //   }
            // }
          }
        });
      });
  }

  componentWillMount() {
    console.log('hey');
    // axios.get('/api/getMentorAnswered').then(response => {
    //   console.log('here it is, look at it!!!', response.answers);
    //   let data = [];
    let mentor1 = 2;
    //  let mentor2 = this.state.mentor2;
    let mentor3 = 4;

    this.setState({
      mentor2: this.getQuestionsPerMentor2(),
      chartData: {
        labels: ['Mentor1', 'Mentor2', 'Mentor 3', ''],
        datasets: [
          {
            data: [
              this.state.mentor1,
              this.state.mentor2,
              7,
              8
              // { mentor1: 5 },
              // { mentor2: this.state.mentor2 },
              // { mentor3: mentor3 }
            ],
            backgroundColor: [
              '#5080f0',
              '#d82e52',
              '#7e5eb8',
              '#222222',

              'rgb(255, 168, 249)'
            ]
          }
        ],
        options: {
          display: true,
          beginAtZero: true,
          scales: {
            display: true,
            beginAtZero: true
          }
        }
      }
    });
    // });
  }

  updateMentor1(e) {
    this.setState({ typedText: e.target.value });
    console.log('mentor 1', this.state.typedText);
  }
  updateMentor2(e) {
    this.setState({ typedText: e.target.value });
    console.log(e.target.value);
    console.log('mentor 2', this.state.typedText);
  }
  updateMentor3(e) {
    this.setState({ typedText: e.target.value });
    console.log('mentor 3', this.state.typedText);
  }

  render() {
    return (
      <div className="chart">
        <h1>Questions Per Mentor</h1>
        <Bar data={this.state.chartData} width={500} height={500} />
        <h2>Select Mentor by ID</h2>
        <div>
          <div>
            <p>Enter IDs Below</p> <br />
            <input
              type="text"
              placeholder="Mentor One"
              onChange={e => this.updateMentor1(e)}
            />
            <input
              type="text"
              placeholder="Mentor Two"
              onChange={e => this.updateMentor2(e)}
            />
            <button
              onClick={e => {
                this.getQuestionsPerMentor2(this.state.typedText);
              }}
            >
              Submit
            </button>
            {/* <input
              type="text"
              placeholder="Mentor Three"
              onChange={e => this.updateMentor3(e)}
            /> */}
            <button /* value={this.state.mentor2} */
              onClick={e => {
                this.getQuestionsPerMentor2(this.state.typedText);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default QuestionsPerMentor;
