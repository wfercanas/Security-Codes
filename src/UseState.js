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

  const onError = () => {
    setState({ ...state, loading: false, error: true });
  };

  const onConfirm = () => {
    setState({ ...state, loading: false, confirmation: true, value: '' });
  };

  const onTyping = () => {
    setState({ ...state, error: false });
  };

  const handleChange = (newValue) => {
    setState({ ...state, value: newValue });
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

  const handleConfirmation = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
      }, 3000);
    }
  }, [state.loading]);

  useEffect(() => {
    if (!!state.error) {
      onTyping();
    }
  }, [state.value]);

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
          onChange={({ target }) => handleChange(target.value)}
        />
        <button onClick={handleConfirmation}>Comprobar</button>
      </div>
    );
  }
}

export { UseState };
