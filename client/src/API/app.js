import React from "react";
import Home from "./VIEWS/home";
import Header from "./VIEWS/header";
import Projects from "./VIEWS/projects";
import About from "./VIEWS/about";
import Contact from "./VIEWS/contact";
import Animation from "./components/projects/animation";
import Cartoons from "./components/projects/cartoons";
import Logo from "./components/projects/logo";
import Otherprojects from "./components/projects/other";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

const Notfound = ({ match }) => {
  return (
    <h2>
      a page with <Link to={match.params.id}>{match.params.id}</Link> is
      Notfound
    </h2>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Projects" exact component={Projects} />
          <Route path="/About" component={About} />
          <Route path="/projects/animation" component={Animation} />
          <Route path="/projects/cartoons" component={Cartoons} />
          <Route path="/projects/logo" component={Logo} />
          <Route path="/contact" component={Contact} />
          <Route path="/projects/otherprojects" component={Otherprojects} />
          <Route path="/:id" component={Notfound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
