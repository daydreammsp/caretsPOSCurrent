function marketReducer(state = [], action) {
   
    switch (action.type) {
      case 'MARKET_VIEW':
      
        return action.payload
      default:
        return state;
    }
  }

export default marketReducer;
