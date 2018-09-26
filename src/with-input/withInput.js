import React, {Component} from 'react';

function createState(callback, name, override, value = '', handler) {
  if (!name) {
    throw new Error(
      `Name wasn't specified for: ${JSON.stringify({
        name,
        override,
        value,
        handler,
      })}`,
    );
  }

  return {
    handler: callback(name, handler, override),
    value,
  };
}

function withInput(...args) {
  return (WrappedComponent) => {
    class WithInput extends React.Component {
      constructor(props) {
        super(props);

        const state = args.reduce((newState, arg) => {
          let createdState;
          if (typeof arg === 'object') {
            const {name, override, value, handler} = arg;
            createdState = createState(
              this.handleInput,
              name,
              override,
              value,
              handler,
            );
            return {
              ...newState,
              [name]: createdState,
            };
          }

          createdState = createState(this.handleInput, arg);
          return {...newState, [arg]: createdState};
        }, {});

        this.state = state;
      }

      handleInput = (key, action, useActionForState) => (e) => {
        e.persist();
        this.setState((state) => {
          let tempObj = {...state};
          const keyValues = state[key];
          keyValues.value = useActionForState ? action(e) : e.target.value;
          tempObj = {...tempObj, [key]: keyValues};

          if (!useActionForState && action) {
            action(e);
          }

          return tempObj;
        });
      };

      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    }

    return WithInput;
  };
}

export default withInput;
