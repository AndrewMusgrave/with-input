# withInput

A lightweight, minimal react higher order component. That will generate state and handlers that will be passed down as props to the wrapped component.

## Installation

Use `npm` or `yarn`.

```
yarn add with-input
```

```
npm i -s with-input
```

## Api

#### withInput

##### asterik for mandatory props

| Param    | Type     | Default | Description                                                                                                      |
| -------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| name\*   | string   |         | key for values on props                                                                                          |
| value    | boolean  | false   | default value                                                                                                    |
| override | boolean  |         | should the auto generated handler be replaced with the passed handler                                            |
| handler  | Function |         | a function that can act as a pre change hook or a function that will act as a handler and return the given state |

##### Basic usage with strings

```jsx
...
export default withInput('email', 'name')(ComponentName);
```

##### Basic usage with objects

```jsx
...
export default withInput(
  {
    name: 'email',
    value: '',
  },
  {
    name: 'name',
    value: 'Jon',
  },
)(ComponentName);
```
