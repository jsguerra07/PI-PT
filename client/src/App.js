import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TicketForm from "./components/TicketForm"
import Ticket from "./components/Ticket"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component= {LandingPage} />
          <Route path = "/login" component= {Login} />
          <Route path = "/signUp" component= {SignUp} />
          <Route path = "/home" component = {Ticket}/>
          {/* <Route path = "/tickets/new/:id" component = {TicketForm}/> */}
          <Route path = "/tickets/new" component = {TicketForm}/>
          <Route path = "/ticket/:id/edit" component = {TicketForm}/>  
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

