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
import TextField from 'material-ui/TextField';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
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
        price: '',
        editName: '',
        editDescription: '',
        editPrice: '',
        addForm: false
      
      
      }
handleProductInputEdit = (inputText) => {
        return (event) => {
          console.log(inputText)
          this.setState({
            [inputText]: event.target.value
          });
        }
      }
handleClickEdit = (product) => {
        console.log('Edit clicked!', [this.state.editName, this.state.editDescription, this.state.editPrice])
        this.props.dispatch({
          type: 'POST_PRODUCT_EDIT',
          payload: {name: this.state.editName, 
            description: this.state.editDescription,
            price: this.state.editPrice,
              productId: product.id,
              version: product.version}
        });
        this.setState({
          editName: '',
          editDescription: '',
          editPrice: ''
        })
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
        console.log('clicked!', [this.state.name, this.state.description, this.state.price])
        this.props.dispatch({
          type: 'POST_PRODUCT',
          payload: {name: this.state.name, 
                    description: this.state.description,
                    price: this.state.price}
        });
        this.setState({
          name: '',
          description: '',
          price: ''
        })
        this.addForm = !this.addForm
      }
deleteProduct = (productId) => {
    console.log(productId)
    this.props.dispatch({
        type: 'DELETE_PRODUCT',
        payload: productId
      });
 
}
editClickFill=(product)=>{
  this.setState({
          editName: product.item_data.name,
          editDescription: product.item_data.description,
          editPrice: product.item_data.abbreviation
  })
}
showAddForm = (change)=>{
   this.addForm = change
  this.setState({
    addForm: this.addForm
  })

console.log(this.addForm)
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
   
      let showForm = (
          <div>
          <TextField
                 value={this.state.name} type='text'
                placeholder='Name'
                onChange={this.handleProductInput('name')}/>
              
            <TextField value={this.state.description} type='text'
            placeholder='Price $3.00'
            onChange={this.handleProductInput('description')}/>
            <TextField  value={this.state.price} type='text'
            placeholder='Description'
            onChange={this.handleProductInput('price')}/>
            <button onClick={this.handleClick}>Submit</button>
            </div>
        )
      
    let listProducts=[];
   
        listProducts = this.props.products.map( (product) => {
            return(
              <div className={classes.root}>
              <ExpansionPanel>
                
                <ExpansionPanelSummary 
                expandIcon={<EditIcon onClick={()=>this.editClickFill(product)}/>}>
                
                  <Typography className={classes.heading}>
                  
                  <span>{product.item_data.name}   </span> 
                <strong>{product.item_data.description}</strong> 
               {/* <Button variant="raised" onClick={()=>{this.deleteProduct(product.id)}}><h3>Delete</h3></Button> */}
               
                  </Typography>
                  <Typography>
                
                 </Typography>
                </ExpansionPanelSummary>
                
                <ExpansionPanelDetails>
                  <Typography>
                    <div>
                  <h2>Edit</h2>
                <TextField
                 value={this.state.editName} type='text'
                placeholder='Name'
                onChange={this.handleProductInputEdit('editName')}/>
              
            <TextField value={this.state.editDescription} type='text'
            placeholder='Price $3.00'
            onChange={this.handleProductInputEdit('editDescription')}/>
            <TextField  value={this.state.editPrice} type='text'
            placeholder='Description'
            onChange={this.handleProductInputEdit('editPrice')}/>
          {/* <input type='text'
            placeholder='absolute url'
            onChange={this.handleImgChange('image_url')}></input> */}

          <button onClick={()=>this.handleClickEdit(product)}>Submit</button>
             
              <h3>{listProducts}</h3>
             
            </div>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <div>
              <Tooltip id="tooltip-icon" title="Delete">
               <IconButton aria-label="Delete">
                <DeleteIcon onClick={()=>{this.deleteProduct(product.id)}}/>
                </IconButton>
                 </Tooltip>
                 </div>
            </div>
             
            )
          })
        
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
                <Button variant="raised" color="primary" onClick={()=>this.showAddForm(!this.addform)}>
                <h2>add product</h2></Button>
                {this.addForm && showForm}
          {/* <input type='text'
            placeholder='absolute url'
            onChange={this.handleImgChange('image_url')}></input> */}

          
             
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