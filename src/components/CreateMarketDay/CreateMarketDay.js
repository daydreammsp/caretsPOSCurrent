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
  });
class TransactionHistory extends React.Component {
  state = {
    open: true,
    spinner: true,
    marketName: '',
    address: '',
    city: '',
    state: '',
    date:"",
    weatherData: []
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
      // let newDate = new Date(inputText)
      
      this.setState({
        [inputText]: event.target.value
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
      
      let localevents = this.props.localEvents && this.props.localEvents.map( (events) => {

        return(
            <h1>{events.title}
             
             </h1>
            
        )
      })
      
                  let newEvents = localevents && localevents.map( (localEvent)=>{
                      return (
                        localEvent
                        
                      )
                  })




      let localweather = this.props.weather && this.props.weather.map( (daily) => {
        return(
            <h1>{daily.maxtempi}</h1>
        )
      })
         
        
      
      
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
              <TextField
                 value={this.state.marketName} type='text'
                placeholder='Market Name'
                onChange={this.handleMarketInput('marketName')}/>
              
            <TextField value={this.state.address} type='text'
            placeholder='Address'
            onChange={this.handleMarketInput('address')}/>

            <TextField  value={this.state.city} type='text'
            placeholder='City'
            onChange={this.handleMarketInput('city')}/>

            <TextField  value={this.state.state} type='text'
            placeholder='State'
            onChange={this.handleMarketInput('state')}/>

            <TextField  value={this.state.date} type='date'
            placeholder='date'
            onChange={this.handleMarketInput('date')}/>
          

          <Button onClick={()=>this.submitMarketData()}>Submit</Button>
              {/* <a href={this.props.info.events}> click Me </a> */}
              {/* <pre>{JSON.stringify(this.props.localEvents)}</pre> 
              <pre>{JSON.stringify(this.props.weather)}</pre> */}
              {newEvents}
              {localweather}
              
              <MenuModal/>
              {/* { <CircularProgress className={classes.progress} thickness={10} size={90} />} */}
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

TransactionHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
  // export default connect(mapStateToProps)(TransactionHistory);
  export default compose(
    withStyles(styles, { name: 'TransactionHistory' }),
    connect(mapStateToProps)
  )(TransactionHistory);
