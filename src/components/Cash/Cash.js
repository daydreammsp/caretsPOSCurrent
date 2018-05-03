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
      margin: theme.spacing.unit,
      
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

showClick = ()=>{
  console.log("show clicked")
  this.props.dispatch({
    type: 'TOGGLE_CASH',
    payload: true
  });
}


handleProductInput = (inputText) => {
  return (event) => {
    console.log(inputText)
    this.setState({
      [inputText]: event.target.value
    });
  }
}
  changeAmount = (amount) => {
    console.log("click change amount")
    this.setState({
      cashVal: amount
    })
  }
  render() {
    let changeDue = this.state.cashVal - (this.props.cashPayment/100)
      let content = null;
  
      if (this.props.user.userName) {
        content = (
          <div>
            <h2>Cash stringify</h2>
            <input type='text'
            value={this.state.cashVal}
            placeholder='product'
            onChange={this.handleProductInput('product')}></input>
            <pre>{JSON.stringify(this.props.cashPayment/100)}</pre>
            <Button onClick={()=>this.showClick()}>Submit</Button>
            <h3>Change Due</h3>
            <h1>{changeDue}</h1>
            <Button onClick={()=>this.changeAmount(10)}>10 Dollars</Button>
            <Button onClick={()=>this.changeAmount(20)}>20 Dollars</Button>
            <Button onClick={()=>this.changeAmount(40)}>40 Dollars</Button>
            <Button onClick={()=>this.changeAmount(50)}>50 Dollars</Button>
            <Button onClick={()=>this.changeAmount(100)}>100 Dollars</Button>
            
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