import React from 'react';
import MainMenu from '../MainMenu/MainMenu';
import Nav from '../../components/Nav/Nav';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';


const mapStateToProps = state => ({
    user: state.user,
    info: state.marketReducer
  });

class TransactionHistory extends React.Component {


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'MARKET_GET'
          });
      }
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }

    render() {
      // let localEvents = this.props.info.events.event && this.props.info.events.event.map( (localEvent) => {
      //   return(
      //     <h3>{localEvent}</h3>
      //   )
      // })
      let cashActions = this.props.info.cash && this.props.info.cash.map( (cash) => {
        return(
            <h3 key={cash.id}>
            <Moment format="YYYY/MM/DD">{cash.date}</Moment>
            
          {"$"}{(parseInt(cash.total)).toFixed(2)}</h3>
        )
      })
    
        let transactions = this.props.info.credit && this.props.info.credit.map( (transaction) => {
            return(
                <h3 key={transaction.id}>
                <Moment format="YYYY/MM/DD">{transaction.created_at}</Moment>
                
              {"$"}{(transaction.tenders[0].amount_money.amount/100).toFixed(2)}</h3>
            )
          })
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
              
              <h2>View Market Day</h2>
              <a href={this.props.info.events}> click Me </a>
              <pre>{JSON.stringify(this.props.info.events)}</pre>
              <pre>{JSON.stringify(this.props.info.weather)}</pre>
              {/* {localEvents} */}
              {transactions}
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


  
  export default connect(mapStateToProps)(TransactionHistory);
