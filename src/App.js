import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: '1', name: 'Me', age: 30},
      {id: '2', name: 'You', age: 22}
    ],
    show: false
  }

  TrocarHandler = (newName) => {
    console.log('Cliquei!');
    // WRONG WAY: this.state.persons[0].name = "Tunner";
    this.setState({persons: [
      {name: newName, age: 30},
      {name: 'Tutu', age: 22},
    ] })
  }

  NamechangedHandler = (event, id) =>{
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState(
      {persons: persons})
    }

  togglePersonsHandler = () => {
    const does = this.state.show;
    this.setState({show: !does});
  }

  delPersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {

    const style={
      backGroundColor: 'white',
      font: 'inherint',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

    if (this.state.show) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={this.delPersonHandler.bind(this, index)}
              name={person.name} 
              age={person.age} 
              key={person.id}
              changed={(event) => this.NamechangedHandler(event, person.id)}
              />
          })}
          </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi</h1>
        <p>Wow</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Mostrar!</button>
          {persons}
      </div>
    );

   // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi'));
  }
}

export default App;
