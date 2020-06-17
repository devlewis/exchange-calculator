import React, { PureComponent } from "react";
import ApiService from "../../api-service";
import "./Form.css";

class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      baseCountries: ["USD", "EUR"],
      countries: [],
      baseCountry: "USD",
      targetCountry: "",
      all: {},
      total: 0,
      result: 0,
      submitted: false,
    };
  }

  componentDidMount() {
    ApiService.getAll().then((res) => {
      {
        console.log(res);
        this.setState({
          countries: Object.keys(res.conversion_rates),
          all: res.conversion_rates,
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
    let newTotal = (this.state.total * this.state.all[target]).toFixed(2);
    console.log(newTotal);
    this.setState({ result: newTotal, submitted: true });
  };

  reset = (e) => {
    e.preventDefault();
    console.log("inside!");
    this.setState(
      {
        baseCountries: ["USD", "EUR"],
        countries: [],
        baseCountry: "USD",
        targetCountry: "",
        total: 0,
        result: 0,
        submitted: false,
      },
      () => console.log(this.state)
    );
  };

  validateInput = () => {
    if (
      this.state.baseCountry.length === 0 ||
      this.state.targetCountry.length === 0 ||
      this.state.total === 0
    ) {
      return "Please select from above!";
    }
  };

  render() {
    let base = this.state.baseCountry;
    let target = this.state.targetCountry;
    let total = this.state.total;

    const inputError = this.validateInput();

    return (
      <form className="form" onSubmit={this.convert}>
        {!this.state.submitted && (
          <section>
            <div className="select_box">
              <label htmlFor="country1">From USD $ or EUR €?</label>
              <select
                onChange={(e) => this.handleChangeBaseCountry(e)}
                name="country1"
                id="country1"
                required
                value={base}
              >
                <option>Select</option>
                {this.state.baseCountries.map((a, i) => (
                  <option key={i} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="select_box">
              <label htmlFor="country2">To which currency?</label>
              <select
                onChange={(e) => this.handleChangeTargetCountry(e)}
                name="country2"
                id="country2"
                required
                value={target}
              >
                <option>Select</option>
                {this.state.countries
                  .filter((a) => a !== base)
                  .map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
              </select>
            </div>
            <div className="amount">
              <label htmlFor="amount">
                Amount in {this.state.baseCountry}{" "}
              </label>
              <input
                type="number"
                id="amount"
                min="0.01"
                step="0.01"
                value={total}
                onChange={(e) => this.handleChangeAmount(e)}
              />
            </div>
          </section>
        )}
        {this.state.submitted && (
          <div className="result">
            <p className="big">
              {this.state.result} {this.state.targetCountry}
            </p>
            <p>
              is equal to {this.state.total} {this.state.baseCountry}
            </p>
          </div>
        )}
        <p>{inputError}</p>
        {!this.state.submitted && (
          <button
            type="submit"
            disabled={inputError !== undefined}
            onClick={(e) => this.convert}
          >
            Go!
          </button>
        )}
        {this.state.submitted && (
          <button type="button" onClick={(e) => this.reset(e)}>
            Reset!
          </button>
        )}
      </form>
    );
  }
}

export default Form;
