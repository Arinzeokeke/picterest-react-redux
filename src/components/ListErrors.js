import React from 'react';

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      if (Array.isArray(errors)) {
        return (
        <ul className="error-messages">
          {
            Object.keys(errors).map(key => {
              return (
                <li key={key}>
                 {errors[key]}
                </li>
              );
            })
          }
        </ul>
      );
      }
      else{
        return (
        <ul className="error-messages">
          <li>{errors}</li>
        </ul>
      );
      }

    } else {
      return null;
    }
  }
}

export default ListErrors;
