import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import compose from 'recompose/compose';
import MenuModal from '../MenuModal/MenuModal'



const mapStateToProps = state => ({
  user: state.user,
});

const styles = {
  list: {
    minwidth: 250,
    padding: 8,
    // backgroundColor: 'primary',
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  
};

class MainMenu extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }
  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
      <h1>CARET^S</h1>
      <List>
        Welcome <h3>{this.props.user.userName}</h3>
      </List>
        <List> 
        <Link className="navMenu" to="/CheckoutMain">
           <Button >Checkout</Button>
          </Link>
        </List>
        <Divider />
        <List>
        <Link className="navMenu" to="/TransactionHistory">
           <Button >Transactions</Button>
          </Link></List>
        <Divider />
        <List>
        <Link className="navMenu" to="/CreateMarketDay">
        <Button >View Market Day</Button>
        
          </Link></List>
        <Divider />
        <List>
        <Link className="navMenu" to="/ActualAddProduct">
        <Button>Add/Edit Product</Button>
          </Link></List>
        <Divider />
        
        <List>
          <h2 className="navMenu" onClick={()=>{this.logout()}}>Logout</h2></List>
      </div>
    );

    

    return (
      <div>
        
        <Button onClick={this.toggleDrawer('left', true)}>
        <h1><i className="material-icons md-48">menu</i></h1></Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};
// export default (withStyles(styles), connect(mapStateToProps) (MainMenu));
export default compose(
  withStyles(styles, { name: 'MainMenu' }),
  connect(mapStateToProps)
)(MainMenu);