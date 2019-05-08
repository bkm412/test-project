import * as types from './actions/Action';

const initialState = {
  dogData : []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case types.SUCCESS.GET_DATA_SUCCESS :
      return {
        ...state,
        dogData : action.payload
      }
    case types.SUCCESS.CONCAT_DATA_SUCCESS :
      return {
        ...state,
        dogData : [...state.dogData, ...action.payload]
      }
    case types.OTHER.CLEAR_DATA :
      return {
        ...state,
        dogData : []
      }
    default:
      return state;
  }
}
