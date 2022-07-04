import { Route, Redirect, Switch } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/login";
import { connect } from 'react-redux'

// let isLogin = false//模拟登录
function App(props) {
  return (
    <div className="App">
      <Switch>
        <Redirect from="/" exact to='/admin' />
        <Route path='/admin' render={() => {
          if (props.user.isLogin) {
            return <Main />
          }
          return <Redirect to='/login' />
        }} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}

export default connect(({ user }) => ({ user }))(App);
