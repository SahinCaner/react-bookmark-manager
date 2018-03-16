import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.filters, action) => {
  switch (action.type) {
    case types.SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      };
    case types.SORT_BY_CREATED_AT:
      return {
        ...state,
        sortBy: "createdAt"
      };
    case types.SORT_BY_UPDATED_AT:
      return {
        ...state,
        sortBy: "updatedAt"
      };
    case types.SORT_BY_TITLE:
      return {
        ...state,
        sortBy: "title"
      };
    case types.SORT_BY_DEFAULT:
      return {
        ...state,
        sortBy: "createdAt",
        text: ""
      };
    default:
      return state;
  }
};

// switch (action.type) {
//   case 'SET_TEXT_FILTER':
//     return {
//       ...state,
//       text: action.text
//     };
//   case 'SORT_BY_AMOUNT':
//     return {
//       ...state,
//       sortBy: 'amount'
//     };
//   case 'SORT_BY_DATE':
//     return {
//       ...state,
//       sortBy: 'date'
//     };
//   case 'SET_START_DATE':
//     return {
//       ...state,
//       startDate: action.startDate
//     };
//   case 'SET_END_DATE':
//     return {
//       ...state,
//       endDate: action.endDate
//     };
//   default:
//     return state;
// }
