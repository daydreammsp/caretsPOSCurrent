function showReducer(state = [], action) {
    // Change state with a return
    // action.payload = !action.payload
    switch (action.type) {
      case 'SHOW_CASH':
      
        return action.payload;
      default:
        return state;
    }
  }

export default showReducer;