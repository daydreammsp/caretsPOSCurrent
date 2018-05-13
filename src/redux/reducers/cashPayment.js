//holds the cash transaction amount

function cashPayment(state = [], action) {
   
    switch (action.type) {
      case 'POST_CASH':
      
        return action.payload
      default:
        return state;
    }
  }

export default cashPayment;




