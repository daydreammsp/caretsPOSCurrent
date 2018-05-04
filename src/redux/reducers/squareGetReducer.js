function squareGetReducer(state = [], action) {
   
    switch (action.type) {
      case 'DISPLAY_HISTORY':
      console.log(action.payload)
        return action.payload;
      default:
        return state;
    }
  }

export default squareGetReducer;