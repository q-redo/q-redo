import axios from 'axios';


//INITAL STATE
const initialState= {
  user: {},
  actionAskOrGetHelp: "action",
  isOpen: false,
  questionId: 1,
  cancelId: 1,
  userList: [],
  questionList: [],
  endpoint: "127.0.0.1:3001",
  mentorList: [],
  questionWaiting: false,
  isLoading:false,
  mainBlueColor: '#2aabe2',
  mainBoxColor: '#333333',
  mainBgColor: '#222222'
}


//ACTION TYPES
const REQ_USER= 'REQ_USER';
const TOGGLE_ACTION= 'TOGGLE_ACTION';
const TOGGLE_QUESTION_WAITING="TOGGLE_QUESTION_WAITING"; 
const SOCKET_USERLIST = "SOCKET_USERLIST";
const SOCKET_QUESTIONLIST = "SOCKET_QUESTIONLIST";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const SET_MODAL_ID = "SET_MODAL_ID";
const SOCKET_MENTORLIST = "SOCKET_MENTORLIST";
const POST_QUESTION= "POST_QUESTION";
const CHANGE_THEME= "CHANGE_THEME";
const UNLINK_USERS= "UNLINK_USERS";
const REDIRECT_USER= "REDIRECT_USER";
const REDIRECT_STUDENT= "REDIRECT_STUDENT";


//REDUCER
export default function reducer(state= initialState, action){
  switch(action.type){
    case REQ_USER:
      return Object.assign({}, state, {user: action.payload});
    case SOCKET_USERLIST:
      return Object.assign({}, state, {userList: action.payload});
    case SOCKET_QUESTIONLIST:
      return Object.assign({}, state, {questionList: action.payload})
    case SOCKET_MENTORLIST:
      return Object.assign({}, state, {mentorList: action.payload})
    case TOGGLE_ACTION:
      return Object.assign({}, state, {actionAskOrGetHelp: action.payload});
    case TOGGLE_QUESTION_WAITING:
      return  Object.assign({}, state, {questionWaiting: action.payload}); 
    case TOGGLE_MODAL:
      return Object.assign({}, state, {isOpen: !state.isOpen});
    case SET_MODAL_ID:
      return Object.assign({}, state, {questionId: action.payload});
    case POST_QUESTION + "_PENDING":
      return Object.assign({}, state, {isLoading: true});
    case POST_QUESTION + "_FULFILLED":
      return Object.assign({}, state, { cancelId: action.payload, isLoading: false });      
    case CHANGE_THEME:
      return Object.assign({}, state, {mainBlueColor: action.payload[0], mainBoxColor: action.payload[1], mainBgColor: action.payload[2]});
      return Object.assign({}, state, { cancelId: action.payload, isLoading: false });  
    case UNLINK_USERS + "_PENDING":
      return Object.assign({}, state, {isLoading: true});  
    case UNLINK_USERS + "_FULFILLED":
      return Object.assign({}, state, {isLoading: false});  
    case REDIRECT_USER + "_PENDING":
      return Object.assign({}, state, {isLoading: true});  
    case REDIRECT_USER + "_FULFILLED":
      return Object.assign({}, state, {user: action.payload,  isLoading: false});    
    case REDIRECT_STUDENT + "_PENDING":
      return Object.assign({}, state, {isLoading: true});  
    case REDIRECT_STUDENT + "_FULFILLED":
      return Object.assign({}, state, {user: action.payload,  isLoading: false});        
    default:
     return state;
  }
}


//ACTION CREATORS
export function reqUser(data){
  return {
    type: REQ_USER,
    payload: data
  }
}

export function getMentorList(data){
  return{
    type: SOCKET_MENTORLIST,
    payload: data
  }
}

export function getUserList(data){
  // console.log("I'm userList", data)
  return {
    type: SOCKET_USERLIST,
    payload: data
  }
}

export function getQuestionList(data){
  // console.log("hi, I'm data", data)
  return {
    type: SOCKET_QUESTIONLIST,
    payload: data
  }
}

export function toggleAction(val){
  return {
    type: TOGGLE_ACTION,
    payload: val
  }
}

export function toggleQuestionWaiting(val){
  return {
    type: TOGGLE_QUESTION_WAITING,
    payload: val
  }
}
export function toggleModal(){
  return {
    type: TOGGLE_MODAL
  }
}

export function setModalId(id){
  return {
    type: SET_MODAL_ID,
    payload: id
  }
}

export function postQuestion(obj){
  return{
    type: POST_QUESTION,
    payload: axios.post('/api/questions', obj)
    .then(response=> {
      return response.data[0].q_id;
    })
  }
}

export function changeTheme(arr){
  return{
    type: CHANGE_THEME,
    payload: arr
  }
}
export function unlinkUsers(id){
  return {
    type: UNLINK_USERS,
    payload: axios.put(`/api/unlink/${id}`).then(response=> response.data)
  }
}

export function redirectUser() {
    return {
      type: REDIRECT_USER,
      payload: axios
    .get("/api/me")
    .then(response => {
      if (response.data.rank === 2) {
        window.location.href = "http://localhost:3000/mentorview"
      }
      return response.data
    })
    .catch(error => {
      error.response.data === "no_user"
        ? (window.location.href = "http://localhost:3001/login")
        : null
    })
    }
}

export function redirectStudent() {
  return {
    type: REDIRECT_USER,
    payload: axios
  .get("/api/me")
  .then(response => {
    if (response.data.rank === 3) {
      window.location.href = "http://localhost:3000/student"
    }
    return response.data
  })
  .catch(error => {
    error.response.data === "no_user"
      ? (window.location.href = "http://localhost:3001/login")
      : null
  })
  }
}
