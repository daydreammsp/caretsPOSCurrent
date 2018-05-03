function squareGetProducts(state = [], action) {
    // Change state with a return
    switch (action.type) {
      case 'DISPLAY_PRODUCTS':
      
        return action.payload;
      default:
        return state;
    }
  }

export default squareGetProducts;