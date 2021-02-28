import logo from './logo.svg';
import './App.css';
import Home from './container/home/Home';
import Header from './components/Header';
import Users from './container/user/user';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/user" component={Users} />

    </div>
  );
}

export default App;
