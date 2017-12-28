// import React, { Component } from 'react';
// import { Pie } from 'react-chartjs-2';
// import axios from 'axios';

// class StudentsPerMentor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       topics: [],
//       chartData: {
//         labels: generateLabelsFromTable(),
//         datasets: [
//           {
//             label: '',
//             data: [],
//             backgroundColor: []
//           }
//         ],
//         options: {
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   beginAtZero: true,
//                   stepSize: 1.0
//                 }
//               }
//             ]
//           }
//         }
//       }
//     };
//   }
//   componentWillMount() {
//     axios.get('/api/questions').then(response => {
//       console.log(response.data);
//       let topics = [];
//       let other = [];
//       let css = [];
//       let angular = [];

//       response.data.map(question => topics.push(question.topic_id));
//       console.log(topics);
//       topics.map(curr => {
//         curr === 1
//           ? other.push(curr)
//           : curr === 2
//             ? css.push(curr)
//             : curr === 3 ? js.push(curr) : curr === 7 ? node.push(curr) : null;
//       });

//       data.push(
//         other.length,
//         css.length,
//         angular.length,
//         redux.length,
//         react.length,
//         js.length,
//         node.length
//       );
//       console.log(data);

//       this.setState({
//         topics: topics,
//         chartData: {
//           datasets: [
//             {
//               label: 'Question Topics',
//               data: data,
//               backgroundColor: [
//                 '#5080f0',
//                 '#d82e52',
//                 '#7e5eb8',
//                 '#32def8',
//                 '#f8e258',
//                 '#5f9c52',
//                 'rgb(255, 168, 249)'
//               ]
//             }
//           ]
//         }
//       });
//     });
//   }

//   render() {
//     return (
//       <div className="chart">
//         <h1>Chart Here</h1>
//         <Pie data={this.state.chartData} width={500} height={500} />
//       </div>
//     );
//   }
// }
// export default StudentsPerMentor;
