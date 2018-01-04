import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

class QuestionsPerMentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedText1: '',
      searchedUsers: [],
      mentor1: 0,
      mentor2: 0,
      mentor3: 0,
      mentor1name: '',
      mentor2name: '',
      mentor3name: ''
    };
    this.getQuestionsPerMentor1 = this.getQuestionsPerMentor1.bind(this);
    this.updateMentor1 = this.updateMentor1.bind(this);
  }

  getQuestionsPerMentor1(id) {
    console.log('look at my id', id);
    axios
      .get(`/api/getMentorAnswered/${id}`)
      .then(response => this.setState({ searchedUsers: response.data }));
  }

  mentorText(val) {
    this.setState({ typedText1: val });
  }

  updateMentor1(e, usr) {
    var tempCD = this.state.chartData;

    if (e === 'mentor1') {
      this.setState({ mentor1: usr.user_answered });
      this.setState({ mentor1name: usr.name });
    } else if (e === 'mentor2') {
      this.setState({ mentor2: usr.user_answered });
      this.setState({ mentor2name: usr.name });
    } else if (e === 'mentor3') {
      this.setState({ mentor3: usr.user_answered });
      this.setState({ mentor3name: usr.name });
    }
  }

  graphUpdater() {
    this.setState({
      chartData: {
        labels: [
          this.state.mentor1name,
          this.state.mentor2name,
          this.state.mentor3name
        ],
        datasets: [
          {
            label: 'Questions Answered',
            data: [
              this.state.mentor1,
              this.state.mentor2,
              this.state.mentor3,
              0
            ],
            backgroundColor: [
              '#5080f0',
              '#d82e52',
              '#7e5eb8',
              'rgb(255, 168, 249)'
            ]
          }
        ]
      }
    });
  }

  render() {
    const userlist = this.state.searchedUsers.map((usr, i) => (
      <tr key={i}>
        <td>{usr.name}</td>
        <td>{usr.user_id}</td>
        <td>{usr.user_answered}</td>
        <td>
          <select
            defaultValue=""
            onChange={e => this.updateMentor1(e.target.value, usr)}
          >
            {' '}
            <option value=""> No Column Selected </option>
            <option value="mentor1">Column 1</option>
            <option value="mentor2">Column 2</option>
            <option value="mentor3">Column 3</option>
          </select>
        </td>
      </tr>
    ));

    const { chartData } = this.state;
    return (
      <div className="chart">
        <h1>Questions Per Mentor</h1>
        <Bar data={chartData} width={250} height={150} barChartLegend={false} />
        <h2>Select Mentor by ID</h2>
        <div>
          {userlist.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th>Number Answered</th>
                </tr>
                {userlist}
              </tbody>
            </table>
          ) : (
            <div />
          )}
          {userlist.length > 0 ? (
            <button onClick={() => this.graphUpdater()}>Update Graph</button>
          ) : (
            <div />
          )}
          <div>
            <p> Enter Mentor Name Below</p> <br />
            <input
              type="text"
              placeholder="Mentor One"
              onChange={e => this.mentorText(e.target.value)}
            />
            <button
              onClick={e => {
                this.getQuestionsPerMentor1(this.state.typedText1);
              }}
            >
              Submit
            </button>
            <button onClick={() => console.log(this.state)}>
              TEMP STATE BUTTON
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default QuestionsPerMentor;
