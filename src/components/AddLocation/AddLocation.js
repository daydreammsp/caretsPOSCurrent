import React from 'react';
import MainMenu from '../MainMenu/MainMenu';
import Nav from '../../components/Nav/Nav';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    info: state.squareGetReducer
  });

class AddLocation extends React.Component {


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
    
        let transactions = this.props.info.transactions && this.props.info.transactions.map( (transaction) => {
            return(
                <h3>{transaction.id}</h3>
            )
          })
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
              <h2>add location</h2>
              {transactions}
              <pre>{JSON.stringify(this.props.info.transactions)}</pre>
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


  
  export default connect(mapStateToProps)(AddLocation);
