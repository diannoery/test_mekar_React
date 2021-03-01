import logo from './logo.svg';
import './App.css';
import Home from './container/home/Home';
import Header from './components/Header';
import Users from './container/user/user';
import { Route } from 'react-router-dom';
import LoginPage from './container/login/loginPage';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Bg from './assets/bg.jpg'
const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handelLogout = () => {
    Swal.fire("", "Logout", "success");
    setIsLogin(false);
    sessionStorage.clear();
  };

  const onLogin = (token) => {
    setIsLogin(true);

    sessionStorage.setItem("auth-token", token);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    console.log(token)
    if (token !== null) {
      onLogin(token);
    }
  }, []);
  return (
    <div className="App" >
      {isLogin ? <Main logOut={handelLogout} /> : <LoginPage isLogin={(token) => onLogin(token)} />}



    </div>
  );
}

export default App;

const Main = (props) => {
  const { logOut } = props
  return (
    <div>
      <Header logOut={logOut} />
      <Route exact path="/" component={Home} />
      <Route path="/user" component={Users} />
    </div>
  )
}

