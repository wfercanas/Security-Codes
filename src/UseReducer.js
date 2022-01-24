/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'paradigma';

const initialState = {
  value: '',
  error: false,
  loading: false,
  confirmation: false,
  recovery: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };
    case 'CONFIRM':
      return {
        ...state,
        loading: false,
        confirmation: true,
        value: '',
      };
    case 'TYPING':
      return {
        ...state,
        error: false,
      };
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
      };
    case 'DELETE':
      return {
        ...state,
        confirmation: false,
        recovery: true,
      };
    case 'ABORT':
      return {
        ...state,
        confirmation: false,
      };
    case 'RECOVERY':
      return {
        ...state,
        recovery: false,
      };
    case 'CONFIRMATION':
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};

function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          dispatch({ type: 'ERROR' });
        } else {
          dispatch({ type: 'CONFIRM' });
        }
      }, 3000);
    }
  }, [state.loading]);

  useEffect(() => {
    if (!!state.error) {
      dispatch({ type: 'TYPING' });
    }
  }, [state.value]);

  if (!!state.confirmation) {
    return (
      <>
        <p>¿Estás seguro de eliminar Use State?</p>
        <button onClick={() => dispatch({ type: 'DELETE' })}>
          Sí, eliminar
        </button>
        <button onClick={() => dispatch({ type: 'ABORT' })}>
          No, me arrepentí
        </button>
      </>
    );
  } else if (!!state.recovery) {
    return (
      <>
        <p>Has eliminado Use State</p>
        <button onClick={() => dispatch({ type: 'RECOVERY' })}>
          Recuperar Use State
        </button>
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
          onChange={({ target }) =>
            dispatch({ type: 'CHANGE', payload: target.value })
          }
        />
        <button onClick={() => dispatch({ type: 'CONFIRMATION' })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { UseReducer };
