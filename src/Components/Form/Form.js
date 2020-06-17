import React, { PureComponent } from "react";
import ApiService from "../../api-service";
import SelectBox from "../SelectBox/SelectBox";

class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      baseCountries: ["USA", "EUR"],
      countries: [],
      baseCountry: "",
      targetCountry: "",
      all: {},
      rate: 0,
      total: 0,
      result: 0,
    };
  }

  componentDidMount() {
    ApiService.getAll().then((res) => {
      {
        console.log(res);
        this.setState({
          countries: Object.keys(res.conversion_rates),
        });
      }
    });
  }

  handleChangeBaseCountry = (e) => {
    if (e.target.value) {
      console.log(e.target.value);
      this.setState(
        {
          baseCountry: e.target.value,
        },
        () => {
          return ApiService.getByCode(this.state.baseCountry).then((res) => {
            this.setState({ all: res.conversion_rates });
          });
        }
      );
    }
  };

  handleChangeTargetCountry = (e) => {
    if (e.target.value) {
      this.setState({
        targetCountry: e.target.value,
      });
    }
  };

  handleChangeAmount = (e) => {
    {
      this.setState({ total: e.target.value });
    }
  };

  convert = (e) => {
    e.preventDefault();
    console.log("I CLICKED!");
    let target = this.state.targetCountry;
    console.log(this.state.total);
    console.log(this.state.all);
    let newTotal = this.state.total * this.state.all[target];
    console.log(newTotal);
    this.setState({ result: newTotal });
  };

  render() {
    let base = this.state.baseCountry;
    let target = this.state.targetCountry;
    let total = this.state.total;

    return (
      <form className="form" onSubmit={this.convert}>
        <div className="select_box">
          <label htmlFor="country1">$ or €?</label>
          <select
            onChange={(e) => this.handleChangeBaseCountry(e)}
            name="country1"
            id="country1"
            required
            value={base}
          >
            {this.state.baseCountries.map((a, i) => (
              <option key={i} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="select_box">
          <label htmlFor="country2">Select the rate!</label>
          <select
            onChange={(e) => this.handleChangeTargetCountry(e)}
            name="country2"
            id="country2"
            required
            value={target}
          >
            {this.state.countries.map((a, i) => (
              <option key={i} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="amount">
          <label htmlFor="amount">How Much?</label>
          <input
            type="number"
            id="amount"
            value={total}
            onChange={(e) => this.handleChangeAmount(e)}
          />
        </div>
        <div className="result">{this.state.result}</div>
        <button type="submit" onClick={(e) => this.convert}>
          Go!
        </button>
      </form>
    );
  }
}

export default Form;
