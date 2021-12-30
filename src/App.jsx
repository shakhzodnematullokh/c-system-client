import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Home from "./page/home/home"
import Order from "./page/order/order"

function App() {
  return (
    <div className="app">
      <Switch>

        <Route path="/" exact component={Home}/>

        <Route path="/order" component={Order}/>

      </Switch>
    </div>
  );
}

export default App;
