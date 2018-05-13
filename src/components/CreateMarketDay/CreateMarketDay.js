import React from 'react';
import MainMenu from '../MainMenu/MainMenu';
import Nav from '../../components/Nav/Nav';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import MenuModal from '../MenuModal/MenuModal';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Charts from '../../components/Chart/Chart.js';





const mapStateToProps = state => ({
    user: state.user,
    info: state.marketReducer,
    weather: state.marketReducer.weather,
    localEvents: state.marketReducer.events
  });
  const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    button:{
      margin: 5
    }
  });
class TransactionHistory extends React.Component {
  state = {
    
    open: true,
    spinner: true,
    markets: [
      {market: 'Mpls Farmers Market',
      state: 'mn',
       date: "2018-05-03",
       city: 'minneapolis'},
       {market: 'St. Paul Farmers Market',
       state: 'mn',
       date: "2018-05-04",
       city: 'stpaul'},
       {market: 'Dallas Farmers Market',
       state: 'mn',
       date: "2018-05-06",
       city: 'dallas'}
    ],
    marketName: '',
    address: '',
    city: 'Minneapolis',
    state: 'mn',
    date:"",
    weatherData: [],
    maxTemp: 5,
    minTemp: 5,
    maxHum: 5,
    minHum: 5,
    percip: 5,
    cashActions: [],
    transactions: []
  };
  handleOpen = () => {
    this.setState({ open: true });
  
  };

  submitMarketData = () =>{
    
    console.log(this.state)
    this.props.dispatch({
      type: 'MARKET_GET',
      payload: this.state
});
    this.setState({
      marketName: '',
    address: '',
    city: '',
    state: '',
    date: '',
    })
  }

  handleMarketInput = (inputText) => {
    
    return (event) => {
      let newVar = event.target.value
      console.log(newVar)
      this.setState({
        [inputText]:event.target.value
      });
      
    }
  }
  
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    //     this.props.dispatch({
    //       type: 'MARKET_GET',
    //       payload: this.state
    // });
    
      }
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }

        
      }

    render() {
      const { classes } = this.props;
      
      // let localevents = this.props.localEvents && this.props.localEvents.map( (events) => {

      //   return(
      //       <h1>{events.title}
             
      //        </h1>
            
      //   )
      // })
      
      //             let newEvents = localevents && localevents.map( (localEvent)=>{
      //                 return (
      //                   localEvent
                        
      //                 )
      //             })




      let localweather = this.props.weather && this.props.weather.map( (daily) => {
         
        return(
          this.maxTemp = daily.maxtempi,
          this.minTemp = daily.mintempi,
          this.maxHum = daily.maxhumidity,
          this.minHum = daily.minhumidity,
          this.percip = daily.precipi
          
        )
      })
         
        
      
      
       this.cashActions = this.props.info.cash && this.props.info.cash.map( (cash) => {
        return(
            
        (parseInt(cash.total)).toFixed(2)
        )
      })
    
        this.transactions = this.props.info.credit && this.props.info.credit.map( (transaction) => {
            return(
                
                
            (parseInt(transaction.tenders[0].amount_money.amount/100)).toFixed(2)
            )
          })
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
            
            <Button className={classes.button} variant="raised" color="primary"><h2>View Market Day</h2>
              </Button>
              <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Market</InputLabel>
          <Select
            native
            value={this.state.markets.market}
            onChange={this.handleMarketInput('date')}
           
            inputProps={{
              id: 'age-native-simple',
            }}
          >
            <option value="" />
            <option value={this.state.markets[0].date}>{this.state.markets[0].market}</option>
            <option value={this.state.markets[1].date}>{this.state.markets[1].market}</option>
            <option value={this.state.markets[2].date}>{this.state.markets[2].market}</option>
          </Select>
        </FormControl>
               {/* <TextField
                 value={this.state.marketName} type='text'
                placeholder='Market Name'
                onChange={this.handleMarketInput('marketName')}/>
              
            <TextField value={this.state.address} type='text'
            placeholder='Address'
            onChange={this.handleMarketInput('address')}/> */}

            {/* <TextField  value={this.state.city} type='text'
            placeholder='City'
            onChange={this.handleMarketInput('city')}/> */}

            {/* <TextField  value={this.state.state} type='text'
            placeholder='State'
            onChange={this.handleMarketInput('state')}/>  */}

            <TextField  value={this.state.date} type='date'
            placeholder='date'
            onChange={this.handleMarketInput('date')}/>
          

          <Button className={classes.button} variant="raised" color="secondary" onClick={()=>this.submitMarketData()}>Submit</Button>
              {/* <a href={this.props.info.events}> click Me </a> */}
              {/* <pre>{JSON.stringify(this.props.localEvents)}</pre> 
              <pre>{JSON.stringify(this.props.weather)}</pre> */}
              <Charts 
              maxTemp={this.maxTemp}
              minTemp={this.minTemp}
              maxHum={this.maxHum}
              minHum={this.minHum}
              percip={this.percip}
              transactions={this.transactions}
              cashActions={this.cashActions}
                />
              
              {/* {localweather} */}
              {/* {transactions} */}
              {/* {myChart} */}
              
             
              <MenuModal/>
              {/* { <CircularProgress className={classes.progress} thickness={10} size={90} />} */}
              
              {/* {cashActions} */}
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
