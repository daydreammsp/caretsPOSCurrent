import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
//TransactionHistory
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import Checkout from './components/Checkout/Checkout';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import CreateMarketDay from './components/CreateMarketDay/CreateMarketDay';
import ActualAddProduct from './components/ActualAddProduct/ActualAddProduct';
import Cash from './components/Cash/Cash';
import CheckoutMain from './components/CheckoutMain/CheckoutMain';
import './styles/main.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#757ce8',
      main: '#c5e1a5',
      // dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      // light: '#ff7961',
      main: '#ffe082',
      // dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
    <Header />
    <Router>
    
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/CheckoutMain"
          component={CheckoutMain}
        />
        <Route
          path="/TransactionHistory"
          component={TransactionHistory}
        />
        <Route
          path="/CreateMarketDay"
          component={CreateMarketDay}
        />
        <Route
          path="/ActualAddProduct"
          component={ActualAddProduct}
        />
        <Route
          path="/Cash"
          component={Cash}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
