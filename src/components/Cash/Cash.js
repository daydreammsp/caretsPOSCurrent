import React from 'react';
import MainMenu from '../MainMenu/MainMenu';
import Nav from '../../components/Nav/Nav';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import NumberFormat from 'react-number-format';

const styles = theme => ({
    button: {
      margin: 5,
      width: '90%',
      height: 40
    },
    // input: {
    //   display: 'none',
    // },
  });

const mapStateToProps = state => ({
    user: state.user,
    cashPayment: state.cashPayment,
    show: state.showReducer
    
  });

class Cash extends React.Component {
constructor(props){
    super(props)
    this.state = {
      cashVal: 0
    }
    
   
}
componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

submitTotal = (total)=>{
  console.log("cash total", total)
  this.props.dispatch({
    type: 'CASH_TRANSACTION',
    payload: [total]
  });
  this.props.dispatch({
    type: 'TOGGLE_CASH',
    payload: true
  });
}


// handleProductInput = (inputText) => {
//   return (event) => {
//     console.log(inputText)
//     this.setState({
//       [inputText]: event.target.value
//     });
//   }
// }
  changeAmount = (amount) => {
    amount 

    console.log("click change amount",amount)
    this.setState({
      cashVal: amount
    })
  }
  
  render() {
    const { classes } = this.props;
    // let amountDue = (((this.props.cashPayment/100).toFixed(2) * .05) + parseInt((this.props.cashPayment/100).toFixed(2))).toFixed(2)
    let amountDue = this.props.cashPayment
    let changeDue;
    if ((this.state.cashVal - (this.props.cashPayment) < 1 )){
      changeDue = 0;
    }else{
      changeDue = this.state.cashVal - amountDue
    }
    
     
      let content = null;
  
      if (this.props.user.userName) {
        content = (
          <div>
            <h3>Amount Due</h3>
            <h2>{amountDue}</h2>
            {/* <input type='text'
            value={this.state.cashVal}
            placeholder='product'
            onChange={this.handleProductInput('product')}></input> */}
            <Button className={classes.button} variant="raised" color="primary" onClick={()=>this.submitTotal(amountDue)}>Submit Payment</Button>
            <h3>Change Due</h3>
            <h1>{(changeDue).toFixed(2)}</h1>
            <Button className={classes.button} variant="raised" color="secondary" onClick={()=>this.changeAmount(10)}>10 Dollars</Button><br/>
            <Button className={classes.button} variant="raised" color="secondary" onClick={()=>this.changeAmount(20)}>20 Dollars</Button><br/>
            <Button className={classes.button} variant="raised" color="secondary" onClick={()=>this.changeAmount(40)}>40 Dollars</Button><br/>
            <Button className={classes.button} variant="raised" color="secondary" onClick={()=>this.changeAmount(50)}>50 Dollars</Button><br/>
            <Button className={classes.button} variant="raised" color="secondary" onClick={()=>this.changeAmount(100)}>100 Dollars</Button>
            



          </div>
        );
      }
  
      return (
        <div>
          
          { content }
      
        </div>
      );
    }   
}

Cash.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default compose(
    withStyles(styles, { name: 'Cash' }),
    connect(mapStateToProps)
  )(Cash);