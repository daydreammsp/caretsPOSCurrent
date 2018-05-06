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
import Cash from '../Cash/Cash';
import Checkout from '../Checkout/Checkout';



const mapStateToProps = state => ({
    user: state.user,
    url: state.squareReducer,
    products: state.squareGetProducts,
    cashPayment: state.cashPayment,
    show: state.showReducer
  });

class CheckoutMain extends React.Component {

    state = {
        amount: 0,
      }

      
      componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
      }
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }
      
      
      

    render() {
      
      
      
        let content = null;
    
        if (this.props.user.userName) {
          content = (
            <div>
               {!this.props.show && <Cash />}
               {this.props.show && <Checkout />}
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


  
  // export default connect(mapStateToProps)(Checkout);
  export default connect(mapStateToProps)(CheckoutMain);