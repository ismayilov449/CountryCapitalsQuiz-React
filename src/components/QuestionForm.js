import React, { Component } from "react";
import alertify from "alertifyjs";
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Input,
  FormGroup,
  Col,
  Label,
  Form,
  Button,
  Row,
  ButtonGroup,
} from "reactstrap";

export default class QuestionForm extends Component {
  checkAnswer = (countryName) => {
    console.log(countryName.value);
    if (countryName.value === this.props.currQuestion.name) {
      console.log("aueee");
      alertify.success("True answer!");
    } else {
      alertify.error("Wrong answer!");
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    var radios = document.querySelectorAll("#radio");

    radios.forEach((element) => {
      if (element.checked === true) {
        console.log(element);
        this.checkAnswer(element);
        this.props.getRandomQuestion();
      }
    });
  };

  // randomQuestion = () => {
  //   this.props.getRandomQuestion();
  // };

  card = () => {
    return (
      <Card body outline color="success">
        <CardBody>
          <CardTitle>
            {"Country name : " + this.props.currQuestion.name}
          </CardTitle>

          <CardText>Search capital and flag of given country :</CardText>

          <Form onSubmit={this.handleSubmit}>
            <Col>
              {this.props.currQuestion.answers.map((answer) => (
                <FormGroup key={answer.name}>
                  <Label check id="radios">
                    <Input
                      type="radio"
                      name="radio"
                      id={"radio"}
                      value={answer.name}
                    />
                    <Col>{answer.capital}</Col>
                    <Col>{<img width="100px" src={answer.flag}></img>}</Col>
                  </Label>
                </FormGroup>
              ))}

              <Button size="lg" color="success" type="submit" block>
                Check
              </Button>

              <Button
                size="lg"
                color="primary"
                type="button"
                onClick={() => this.props.getRandomQuestion()}
                block
              >
                Random Question
              </Button>
            </Col>
          </Form>
        </CardBody>
      </Card>
    );
  };

  render() {
    if (this.props.currQuestion && this.props.currQuestion.answers) {
      return <div>{this.card()}</div>;
    } else {
      return <div></div>;
    }
  }
}
