import { CREATE_MESSAGE } from '../../actions/types';

const initialState = {};

function MessagesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      console.log('createMESSAGE!');
      return (state = action.payload);

    default:
      return state;
  }
}

export default MessagesReducer;
