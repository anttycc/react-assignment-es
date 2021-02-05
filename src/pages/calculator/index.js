import React, { Component } from "react";
import OutputScreen from './output-screen';
import Button from './button';
import './index.css';
import { Col } from "reactstrap";
import { Card } from "reactstrap";
import { CardBody } from "reactstrap";

const Key = (props) => {
  return props.keys.map((ele, i) => {
    return (
      <Button label={ele.label} handleClick={props.handleClick} key={i} />
    )
  })
}
const Keypad = (props) => {
  return props.buttons.map((ele, i) => {
    return (<div className="button-row" key={i}>
      <Key keys={ele} handleClick={props.handleClick} />
    </div>)
  })
}

class CalculatorPage extends Component {
  constructor() {
    super();
    this.state = {
      evaluatedValue: "",
      expression: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    const value = event.target.value;
    switch (value) {
      case '=': {
        if (this.state.expression !== '') {
          let ans = '';
          try {
            ans = eval(this.state.expression);
          }
          catch (err) {
            console.log(err)
            this.setState({ evaluatedValue: "Math Error" });
          }
          if (ans === undefined)
            this.setState({ evaluatedValue: "Math Error" });
          else
            this.setState({ evaluatedValue: ans, expression: '' });
        }
        break;
      }
      case 'Clear': {
        this.setState({ expression: '', evaluatedValue: '' });
        break;
      }
      case 'Delete': {
        let str = this.state.expression;
        str = str.substr(0, str.length - 1);
        this.setState({ expression: str });
        break;
      }
      default: {
        this.setState((state) => ({ expression: state.expression += value }));
        break;
      }
    }
  }
  render() {
    const buttons = [[{
      label: 'Clear'
    },
    {
      label: 'Delete'
    },
    {
      label: '.'
    },
    {
      label: '/'
    }],

    [{
      label: '7'
    },
    {
      label: '8'
    },
    {
      label: '9'
    },
    {
      label: '*'
    }],


    [{
      label: '4'
    },
    {
      label: '5'
    },
    {
      label: '6'
    },
    {
      label: '-'
    }],

    [{
      label: '1'
    },
    {
      label: '2'
    },
    {
      label: '3'
    },
    {
      label: '+'
    }],
    [{
      label: '0'
    },
    {
      label: '='
    }]
    ]
    return (  
      <Col>
        <Card>
          <CardBody>
        <div className="main-calculator">
          <OutputScreen {...this.state} />
          <Keypad buttons={buttons} handleClick={this.handleClick}/>
        </div>
      </CardBody>
      </Card>
      </Col>
    );

  }
}
export default CalculatorPage;