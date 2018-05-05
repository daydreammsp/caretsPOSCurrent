import React from 'react';
import MainMenu from '../MainMenu/MainMenu';
import Nav from '../../components/Nav/Nav';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Button from 'material-ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

const mapStateToProps = state => ({
    user: state.user,
    products: state.squareGetProducts
  });

class AddLocation extends React.Component {
constructor(props){
  super(props)
}
    state = {
        name: '',
        description: '',
        price: ''
        
      }
handleProductInput = (inputText) => {
        return (event) => {
          console.log(inputText)
          this.setState({
            [inputText]: event.target.value
          });
        }
      }
handleClick = () => {
        console.log('clicked!', this.state)
        this.props.dispatch({
          type: 'POST_PRODUCT',
          payload: this.state
        });
        this.setState({
          name: '',
          description: '',
          price: ''
        })
      }
deleteProduct = (productId) => {
    console.log(productId)
    this.props.dispatch({
        type: 'DELETE_PRODUCT',
        payload: productId
      });
 
}
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({
            type: 'GET_PRODUCTS',
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
    //'DELETE_PRODUCT'
        let listProducts = this.props.products.map( (product) => {
            return(
               <div className="itemListItem"> <span>{product.item_data.name}</span> 
               {/* <strong>{product.item_data.description}</strong> */}
               {/* <Button variant="raised" onClick={()=>{this.deleteProduct(product.id)}}><h3>Delete</h3></Button> */}
               <Tooltip id="tooltip-icon" title="Delete">
        <IconButton aria-label="Delete">
          <DeleteIcon 
          onClick={()=>{this.deleteProduct(product.id)}}
          />
          <EditIcon/>
        </IconButton>
      </Tooltip>
               
               </div>
            )
          })
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
                <h2>add product</h2>
              <input value={this.state.name} type='text'
            placeholder='Name'
            onChange={this.handleProductInput('name')}></input>
            <input value={this.state.description} type='text'
            placeholder='Description'
            onChange={this.handleProductInput('description')}></input>
            <input  value={this.state.price} type='text'
            placeholder='Price'
            onChange={this.handleProductInput('price')}></input>
          {/* <input type='text'
            placeholder='absolute url'
            onChange={this.handleImgChange('image_url')}></input> */}

          <button onClick={this.handleClick}>Submit</button>
             
              <h3>{listProducts}</h3>
             
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

AddLocation.propTypes = {
  classes: PropTypes.object.isRequired,
};

  
  // export default connect(mapStateToProps)(AddLocation);


  export default compose(
    withStyles(styles, { name: 'AddLocation' }),
    connect(mapStateToProps)
  )(AddLocation);