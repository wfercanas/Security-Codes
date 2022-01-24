import React from 'react';

import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        if (!(this.state.value === SECURITY_CODE)) {
          this.setState({ error: true });
        }
        this.setState({ loading: false });
      }, 3000);
    }
  }

  handleClick() {
    this.setState({ error: false, loading: true });
  }

  handleChange({ target }) {
    if (!!this.state.error) {
      this.setState({ error: false });
    }
    this.setState({ value: target.value });
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>
          Por favor, escribe el código de seguridad para comprobar que quieres
          eliminar.
        </p>
        {this.state.error && <p>Error: El código es incorrecto</p>}
        {this.state.loading && <Loading />}
        <input
          placeholder='Código de seguridad'
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Comprobar</button>
      </div>
    );
  }
}

export { ClassState };
