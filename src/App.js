import React, { Component } from "react";
import Menu from "./components/MenuComponent";
import { Navbar, NavbarBrand } from "reactstrap";
import { DISHES } from "./shared/dishes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        {console.log(this.state.dishes)}
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App;
