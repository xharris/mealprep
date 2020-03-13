import React, { useState, useEffect } from "react";

import DateTimePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";

import Button from "@feature/button";

import "@style/form.scss";

var id = 0;

const Form = props => {
  const [inputs, setInputs] = useState({});
  const [formID, setFormID] = useState("");

  useEffect(() => {
    setFormID(`form-${id}`);
    id++;
  }, []);

  return (
    <form
      id={formID}
      className={`f-form ${props.className || ""}`}
      onSubmit={e => {
        if (props.onSubmit) {
          e.preventDefault();
          var outputs = Object.assign(inputs, {});
          props.inputs.map(i => {
            if (i.value) outputs[i.name] = i.value;
          });
          props.onSubmit(outputs);
        }
      }}
    >
      {props.inputs &&
        props.inputs.map((i, x) => {
          const formsetID = i => `${formID}-fieldset-${i.name || x}`;
          const radioID = i => `${formID}-radio-${i.value || x}`;

          return i.type === "submit" ? (
            <React.Fragment key={x}>
              <Button type="submit">{i.label || "Submit"}</Button>
            </React.Fragment>
          ) : (
            <div key={i.name || x} className={`input-group ${i.name || ""}`}>
              {i.label && i.type !== "checkbox" && (
                <label htmlFor={i.name}>{i.label}</label>
              )}
              {i.type === "textarea" ? (
                <textarea
                  name={i.name}
                  form={formID}
                  required={i.required ? true : false}
                  onChange={e =>
                    setInputs({ ...inputs, [i.name]: e.target.value })
                  }
                  disabled={i.disabled}
                ></textarea>
              ) : i.type === "date" ? (
                <DateTimePicker
                  onChange={date => setInputs({ ...inputs, [i.name]: date })}
                  format="MM/DD/YYYY hh:mm A"
                />
              ) : i.type === "radio" ? (
                <fieldset key={formsetID(i)} id={formsetID(i)} name={i.name}>
                  {i.choices.map(c => {
                    const input = (
                      <input
                        key={radioID(c)}
                        type="radio"
                        name={radioID(c)}
                        value={c.value}
                        checked={
                          inputs[i.name] === c.value ||
                          (inputs[i.name] == null && i.checked === c.value)
                        }
                        onChange={e =>
                          setInputs({ ...inputs, [i.name]: e.target.value })
                        }
                      />
                    );
                    return (
                      <React.Fragment key={radioID(c)}>
                        {c.label ? (
                          <label
                            className={`radio-label ${
                              inputs[i.name] === c.value ||
                              (inputs[i.name] == null && i.checked === c.value)
                                ? "selected"
                                : ""
                            }`}
                          >
                            {[input, c.label]}
                          </label>
                        ) : (
                          input
                        )}
                      </React.Fragment>
                    );
                  })}
                </fieldset>
              ) : i.type === "checkbox" ? (
                <label
                  className={`check-label ${
                    inputs[i.name] || i.checked ? "checked" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name={i.name}
                    checked={i.default}
                    onChange={e =>
                      setInputs({ ...inputs, [i.name]: e.target.checked })
                    }
                    disabled={i.disabled}
                  />
                  <span>{i.label}</span>
                </label>
              ) : (
                <input
                  type={i.type}
                  name={i.name}
                  pattern={i.pattern}
                  placeholder={i.placeholder}
                  required={i.required ? true : false}
                  value={i.value}
                  onChange={
                    i.value === null
                      ? e => setInputs({ ...inputs, [i.name]: e.target.value })
                      : null
                  }
                  disabled={i.disabled}
                />
              )}
            </div>
          );
        })}
      {React.Children.map(props.children, child => {
        return React.cloneElement(
          child,
          {
            ...child.props,
            onChange: e => {
              setInputs({ ...inputs, [child.props.name]: e.target.value });
            }
          },
          child.props.children
        );
      })}
    </form>
  );
};

export default Form;
