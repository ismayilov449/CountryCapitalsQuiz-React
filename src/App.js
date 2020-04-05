import { Container, Row, Col } from "reactstrap";
import React, { Component } from "react";
import QuestionForm from "./components/QuestionForm";

export default class App extends Component {
  state = {
    countries: [],
    currQuestion: {},
    counter: 1,
    score: 0,
  };

  componentDidMount() {
    this.getCountries();
  }

  getCountries = () => {
    fetch("https://restcountries.eu/rest/v2")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ countries: data });
        this.setState({ currQuestion: this.getRandomQuestion() });
      });
  };

  getParts = (countries) => {
    var temp = [];

    countries.map((country) =>
      temp.push({
        name: country.name,
        flag: country.flag,
        capital: country.capital,
      })
    );

    return temp;
  };

  getRandomQuestion = () => {
    var random = Math.floor(Math.random() * 250);

    if (this.state.countries.length != 0) {
      var currQuestion = {
        name: this.state.countries[random].name,
        correct: this.state.countries[random].name,
        answers: this.getRandomAnswers(random),
      };
      currQuestion.answers.push(this.state.countries[random]);
    }
    console.log("eeeeee");

    this.setState({ currQuestion: currQuestion });
    return currQuestion;
  };

  getRandomAnswers = (number) => {
    var answers = [];
    var random;
    for (let i = 0; i < 3; i++) {
      random = Math.floor(Math.random() * 250);
      if (random === number) {
        i--;
        continue;
      }
      answers.push(this.state.countries[random]);
    }

    return answers;
  };

  render() {
    return (
      <div>
        <Container>
          <Row xs="10">
            <QuestionForm
              datas={this.getParts(this.state.countries)}
              currQuestion={this.state.currQuestion}
              getRandomQuestion={this.getRandomQuestion}
              counter={this.state.counter}
              score={this.state.score}
            ></QuestionForm>
          </Row>
          <Row xs="2"></Row>
        </Container>
      </div>
    );
  }
}
