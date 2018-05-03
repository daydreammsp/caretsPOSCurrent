

function squareReducer(state = [], action) {
    // Change state with a return
    switch (action.type) {
      case 'DISPLAY_TRANSACTIONS':
      
        return action.payload;
      default:
        return state;
    }
  }

export default squareReducer;