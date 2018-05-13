import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import Button from 'material-ui/Button';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});
const styles = theme => ({
  main:{
    
    width: '100%'
  }
});
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('/user');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    const { classes } = this.props;
    return (
      
      <div className={classes.main}>
        
        { this.renderAlert() }
        <Button className={classes.main} variant="raised" color="secondary"> 
        <h1>CARET^S</h1>
        </Button>
        <form className="loginForm" onSubmit={this.login}>
        
          <h3>Login</h3>
          
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <Button variant="raised" color="primary">
            <input
              type="submit"
              name="submit"
              value="Log In"
            />
            </Button><br/>
           
            <Link to="/register">Register</Link>
           
          </div>
        </form>
        
      </div>
      
    );
  }
}

// export default connect(mapStateToProps)(LoginPage);
export default compose(
  withStyles(styles, { name: 'LoginPage' }),
  connect(mapStateToProps)
)(LoginPage);