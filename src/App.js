import React, { Component } from 'react';
import FinanceApp from "./FinanceApp";

class App extends Component {
  constructor() {
    super();

    this.state = {
      credentials: {
        uri: "http://localhost:8000",
        key: "mytestenvironment2019-07-11",
        expenses: {
          "grocery": "Grocery",
          "transport" : "Transport/Gas",
          "rent" : "Rent/Bills",
          "loan" : "Loans",
          "eat" : "Eating out",
          "apparel" : "Apparels",
          "decor" : "House and decoration",
          "show" : "Entertainment",
          "travel" : "Travels",
          "for-craft" : "For craft",
          "help" : "Charity/Help",
          "med" : "Medical/Drugs",
          "other" : "Other"
        },
        incomes: {
          "salary" : "Salary",
          "tip" : "Tips",
          "bonus" : "Cashback/Bonus",
          "craft" : "Craft",
          "differ" : "Other"
        }
      }
    }
  }
  render() {
    return (
      <div className="container">
        <FinanceApp params={this.state.credentials}/>
      </div>
    );
  }

  testeMe = () => {

  }

}

export default App;
