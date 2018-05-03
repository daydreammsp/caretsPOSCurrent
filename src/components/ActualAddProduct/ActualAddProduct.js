import React from 'react';
import MainMenu from '../MainMenu/MainMenu';
import Nav from '../../components/Nav/Nav';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    products: state.squareGetProducts
  });

class AddLocation extends React.Component {

    state = {
        product: '',
        
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
        console.log('clicked!', this.state.product)
        this.props.dispatch({
          type: 'POST_PRODUCT',
          payload: this.state
        });
        
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
    //'DELETE_PRODUCT'
        let listProducts = this.props.products.map( (product) => {
            return(
               <div> <span>{product.item_data.name}</span> 
               <strong>{product.item_data.description}</strong>
               <button onClick={()=>{this.deleteProduct(product.id)}}>Delete</button>
               </div>
            )
          })
        let content = null;
    
        if (this.props.user.userName) {
          content = (
              
            <div>
                <h2>add product</h2>
              <input type='text'
            placeholder='product'
            onChange={this.handleProductInput('product')}></input>
          {/* <input type='text'
            placeholder='absolute url'
            onChange={this.handleImgChange('image_url')}></input> */}

          <button onClick={this.handleClick}>Submit</button>
              <h2>show products</h2>
              {listProducts}
              <pre>{JSON.stringify(this.props.products)}</pre>
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
