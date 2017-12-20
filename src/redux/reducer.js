import axios from 'axios';


//INITAL STATE
const initialState= {
  user: {},
  actionAskOrGetHelp: "action",
  userList: [],
  questionList: [],
  endpoint: "127.0.0.1:3001",
}


//ACTION TYPES
const REQ_USER= 'REQ_USER';
const TOGGLE_ACTION= 'TOGGLE_ACTION';
const SOCKET_USERLIST = "SOCKET_USERLIST";
const SOCKET_QUESTIONLIST = "SOCKET_QUESTIONLIST"


//REDUCER
export default function reducer(state= initialState, action){
  switch(action.type){
    case REQ_USER:
    return Object.assign({}, state, {user: action.payload});
    case SOCKET_USERLIST:
      return Object.assign({}, state, {userList: action.payload});
    case SOCKET_QUESTIONLIST:
      return Object.assign({}, state, {questionList: action.payload})

    case TOGGLE_ACTION:
      return Object.assign({}, state, {actionAskOrGetHelp: action.payload});
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


