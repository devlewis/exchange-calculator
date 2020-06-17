import React from "react";

function SelectBox(props) {
  return (
    <div className="select_box">
      <label htmlFor="country1">$ or €?</label>
      <select
        onChange={(e) => props.changeCountry(e, props.target)}
        name="country1"
        id="country1"
        required
        value={props.countries[0]}
      >
        <option></option>
        {props.countries.map((a, i) => (
          <option key={i} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
