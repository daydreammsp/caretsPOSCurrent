import React from 'react';
import MainMenu from '../MainMenu/MainMenu';
import Nav from '../../components/Nav/Nav';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import compose from 'recompose/compose';


const mapStateToProps = state => ({
    user: state.user,
    info: state.squareGetReducer
  });

  const styles = theme => ({
    container: {
      width: '80%',
      margin: 2,
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      margin: 0,
      width: '80%',
    },
  });

class TransactionHistory extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  state = {
      
    date: "2018-05-24",
    
  
  
  }
  handleDateInput = (inputText) => {
    return (event) => {
      // let newDate = new Date(inputText)
      console.log(this.state.date)
      this.setState({
        [inputText]: event.target.value
      });
    }
  }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'GET_HISTORY',
            payload: this.state
          });
      }
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }

    render() {
      const { classes } = this.props;
      let cashActions = this.props.info.cash && this.props.info.cash.map( (cash) => {
        return(
            <h3 key={cash.id}>
            <Moment format="YYYY/MM/DD">{cash.date}</Moment>
            
          {"$"}{(parseInt(cash.total)).toFixed(2)}</h3>
        )
      })
         // const dateSort = (item => item.created_at === this.state.date);
          //   creditTransactions.filter(dateSort)
       let creditTransactions = this.props.info.credit && this.props.info.credit.map( (transaction) => {
            return(
                <h3 key={transaction.id}>
                <Moment format="YYYY/MM/DD">{transaction.created_at}</Moment>
                
              {"$"}{(transaction.tenders[0].amount_money.amount/100).toFixed(2)}</h3>
            )
          })
         
          console.log(creditTransactions)
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
              
              <h2>Transaction History</h2>
              <form className={classes.container} noValidate> 
              
       <TextField
        id="date"
        label="Date"
        type="date"
        value={this.state.date}
        placeholder="2018-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.handleDateInput('date')}
      /> 
     </form> 
              {creditTransactions}
              {cashActions}
            </div>
          );
        }
    
        return (
          <div>
            <Nav />
            { content }
          </div>
        );
      }   
}

TransactionHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
  // export default connect(mapStateToProps)(TransactionHistory);
  export default compose(
    withStyles(styles, { name: 'TransactionHistory' }),
    connect(mapStateToProps)
  )(TransactionHistory);