import React, { useState, useEffect } from "react";

const Form = props => {
  const [inputs, setInputs] = useState({});

  return (
    <form
      onSubmit={e => {
        if (props.onSubmit) {
          e.preventDefault();
          props.onSubmit(Object.assign(inputs, {}));
        }
      }}
    >
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
