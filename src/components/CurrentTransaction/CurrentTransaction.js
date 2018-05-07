import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const mapStateToProps = state => ({
    user: state.user,
  });
const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    margin: 0,
  },
};

class CurrentTransaction extends React.Component {
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
  
  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>by</List>
        <Divider />
        <List>hi</List>
      </div>
    );
    
    let dropDownList = this.props.itemsArr.map( (item) => {
        return(
            <div >
            <div className={classes.FullList}><h2>{item.item_data.name} {(parseInt(item.item_data.description)).toFixed(2)}</h2></div>
            </div>
        )
    })
    
    return (
      <div>
        <Button onClick={this.toggleDrawer('top', true)}>Current Transaction</Button>
        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {dropDownList}
            
            
          </div>
        </Drawer>
       
      </div>
    );
  }
}

CurrentTransaction.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(CurrentTransaction);
export default compose(
    withStyles(styles, { name: 'CurrentTransaction' }),
    connect(mapStateToProps)
  )(CurrentTransaction);