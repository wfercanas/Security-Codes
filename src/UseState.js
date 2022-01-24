/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
  });

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (!(state.value === SECURITY_CODE)) {
          setState({ ...state, error: true });
        }
        setState({ ...state, loading: false });
      }, 3000);
    }
  }, [state.loading]);

  useEffect(() => {
    if (!!state.error) {
      setState({ ...state, error: false });
    }
  }, [state.value]);

  const handleClick = () => {
    setState({ ...state, error: false, loading: true });
  };

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>
        Por favor, escribe el código de seguridad para comprobar que quieres
        eliminar.
      </p>
      {state.error && <p>Error: El código es incorrecto</p>}
      {state.loading && <p>Cargando...</p>}
      <input
        placeholder='Código de seguridad'
        value={state.value}
        onChange={({ target }) => setState({ ...state, value: target.value })}
      />
      <button onClick={handleClick}>Comprobar</button>
    </div>
  );
}

export { UseState };
