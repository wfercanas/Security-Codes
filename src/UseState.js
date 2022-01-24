/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    confirmation: false,
    recovery: false,
  });

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          console.log('hey!');
          setState({ ...state, loading: false, error: true });
        } else {
          setState({ ...state, loading: false, confirmation: true, value: '' });
        }
      }, 3000);
    }
  }, [state.loading]);

  useEffect(() => {
    if (!!state.error) {
      setState({ ...state, error: false });
    }
  }, [state.value]);

  const handleConfirmation = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const handleDelete = () => {
    setState({ ...state, confirmation: false, recovery: true });
  };

  const handleAbort = () => {
    setState({ ...state, confirmation: false });
  };

  const handleRecovery = () => {
    setState({ ...state, recovery: false });
  };

  if (!!state.confirmation) {
    return (
      <>
        <p>¿Estás seguro de eliminar Use State?</p>
        <button onClick={handleDelete}>Sí, eliminar</button>
        <button onClick={handleAbort}>No, me arrepentí</button>
      </>
    );
  } else if (!!state.recovery) {
    return (
      <>
        <p>Has eliminado Use State</p>
        <button onClick={handleRecovery}>Recuperar Use State</button>
      </>
    );
  } else {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>
          Por favor, escribe el código de seguridad para comprobar que quieres
          eliminar.
        </p>
        {!!state.error && <p>Error: El código es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          placeholder='Código de seguridad'
          value={state.value}
          onChange={({ target }) => setState({ ...state, value: target.value })}
        />
        <button onClick={handleConfirmation}>Comprobar</button>
      </div>
    );
  }
}

export { UseState };
