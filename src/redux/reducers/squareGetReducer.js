function squareGetReducer(state = [], action) {
    // Change state with a return
    switch (action.type) {
      case 'DISPLAY_HISTORY':
      
        return action.payload;
      default:
        return state;
    }
  }

export default squareGetReducer;