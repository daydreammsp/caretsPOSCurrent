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
    url: state.squareReducer,
    products: state.squareGetProducts,
    cashPayment: state.cashPayment,
    show: state.showReducer
  });

class Checkout extends React.Component {

    state = {
        amount: 0,
      }

      
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
          type: 'GET_PRODUCTS',
          payload: this.state
        });
      }
    
      componentDidUpdate() {
          if (this.props.url != this.props.url || this.props.url.length > 3){
            window.location = this.props.url;
          }
       
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }
      // handleAmountChange = (inputText) => {
      //   return (event) => {
      //     console.log(inputText)
      //     this.setState({
      //       [inputText]: event.target.value
      //     });
      //   }
      // }
 cashPayment = (cash)=> {
   
        this.props.dispatch({
          type: 'TOTAL_CASH',
          payload: cash
        });
        this.props.dispatch({
          type: 'TOGGLE_CASH',
          payload: false
        });
      }

      handleClick = () => {
        console.log('clicked!', this.state.amount)
        this.props.dispatch({
          type: 'GET_TRANSACTIONS',
          payload: this.state
        });
      }

      // handleCashClick = () =>{
      //   console.log("click")
      // }
      handlePriceClick = (price) =>{
         this.state.amount = this.state.amount + price
        console.log("click price", this.state.amount)
        this.setState({
         amount: this.state.amount
             });
      }

    render() {
      
      // if(this.state.show){
      //   <Cash/>
      // }
      const { classes } = this.props;
      
      let listProducts = this.props.products.map( (product) => {
        return(
           <div key={product.id}> <Button variant="raised" color="primary" className={classes.button} 
           onClick={()=>this.handlePriceClick(product.item_data.variations[0].item_variation_data.price_money.amount)}><div>{product.item_data.name} 
           {(product.item_data.variations[0].item_variation_data.price_money.amount/100).toFixed(2)}</div>
                </Button>
           </div>
        )
      })
      
        let content = null;
    
        if (this.props.user.userName) {
          content = (
            <div>
              <h2>Checkout</h2>
             
              {/* <pre>{JSON.stringify(this.props.cashPayment)}</pre> */}
              <NumberFormat value={((this.state.amount/100).toFixed(2))} displayType={'text'} 
              
              thousandSeparator={true} prefix={'$'}
              renderText={value => <div>{value}</div>} />
              {/* <h1>{this.state.amount}</h1> */}
              {/* <input type='text'
            placeholder='amount'
            onChange={this.handleAmountChange('amount')}></input><br></br> */}
          <Button variant="raised" className={classes.button} onClick={()=>this.cashPayment(this.state.amount)}>Cash</Button>
          <Button variant="raised" className={classes.button} onClick={this.handleClick}>Credit</Button>
          {listProducts}
         
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

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

  
  // export default connect(mapStateToProps)(Checkout);
  export default compose(
    withStyles(styles, { name: 'Checkout' }),
    connect(mapStateToProps)
  )(Checkout);