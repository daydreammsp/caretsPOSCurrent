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
import CurrentTransaction from '../CurrentTransaction/CurrentTransaction';



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
      totalIn: 0,
        itemsArr: []
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
        console.log('clicked!', this.state.totalIn)
        this.props.dispatch({
          type: 'GET_TRANSACTIONS',
          payload: this.state.totalIn
        });
      }

      // handleCashClick = () =>{
      //   console.log("click")
      // }
      handlePriceClick = (product) =>{

         this.state.itemsArr.push(product)
        console.log("click itemsArr", this.state.itemsArr)
        this.setState({
         amount: this.state.totalIn
             });
      }
      handlePriceClickMinus = (product) =>{
        const currentItem = (item => item.id === product.id);
        const deleteItem = this.state.itemsArr.findIndex(currentItem)
        this.state.itemsArr.splice(deleteItem,1);
        console.log(deleteItem)
        console.log(this.state.itemsArr)
         
       this.setState({
        amount: this.totalIn
            });
     }
add(a,b){
return parseInt(a)+ parseInt(b)
}
    render() {
      
      const { classes } = this.props;
      

        this.state.totalIn = this.state.itemsArr.map( (price) => {
          return(
            (parseInt(price.item_data.description/100).toFixed(2))
          )
      })
      if (this.state.totalIn.length > 1){
        this.state.totalIn = this.state.totalIn.reduce(this.add)
      }
      if(this.state.itemsArr.length < 1){
        this.state.totalIn = 0
      }
      let listProducts = this.props.products.map( (product) => {
        return(
           <div key={product.id}> 
           <Button  variant="raised" color="seconary"
           onClick={()=>this.handlePriceClickMinus(product)}>
           <h1>-</h1></Button>
           <Button variant="raised" color="primary" className={classes.button} 
           onClick={()=>this.handlePriceClick(product)}>
           <div>
             <h1>{product.item_data.name}</h1> 
           {(parseInt(product.item_data.description/100)).toFixed(2)}
           </div>
                </Button>
           </div>
        )
      })
      
        let content = null;
    
        if (this.props.user.userName) {
          content = (
            <div>
              <CurrentTransaction itemsArr={this.state.itemsArr}/>
              <h2>Checkout</h2>
             <h1>{this.state.totalIn}</h1>
              {/* <pre>{JSON.stringify(this.props.cashPayment)}</pre> */}
              {/* <NumberFormat value={((this.state.totalIn).toFixed(2))} displayType={'text'} 
              
              thousandSeparator={true} prefix={'$'}
              renderText={value => <div>{value}</div>} /> */}
              {/* <h1>{this.state.amount}</h1> */}
              {/* <input type='text'
            placeholder='amount'
            onChange={this.handleAmountChange('amount')}></input><br></br> */}
          <Button variant="raised" className={classes.button} onClick={()=>this.cashPayment(this.state.totalIn)}>Cash</Button>
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