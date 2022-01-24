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

const actionTypes = {
  ERROR: 'ERROR',
  CONFIRM: 'CONFIRM',
  TYPING: 'TYPING',
  CHANGE: 'CHANGE',
  DELETE: 'DELETE',
  ABORT: 'ABORT',
  RECOVERY: 'RECOVERY',
  CONFIRMATION: 'CONFIRMATION',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case actionTypes.CONFIRM:
      return {
        ...state,
        loading: false,
        confirmation: true,
        value: '',
      };
    case actionTypes.TYPING:
      return {
        ...state,
        error: false,
      };
    case actionTypes.CHANGE:
      return {
        ...state,
        value: action.payload,
      };
    case actionTypes.DELETE:
      return {
        ...state,
        confirmation: false,
        recovery: true,
      };
    case actionTypes.ABORT:
      return {
        ...state,
        confirmation: false,
      };
    case actionTypes.RECOVERY:
      return {
        ...state,
        recovery: false,
      };
    case actionTypes.CONFIRMATION:
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

  const onError = () => dispatch({ type: actionTypes.ERROR });
  const onConfirm = () => dispatch({ type: actionTypes.CONFIRM });
  const onTyping = () => dispatch({ type: actionTypes.TYPING });
  const onDelete = () => dispatch({ type: actionTypes.DELETE });
  const onAbort = () => dispatch({ type: actionTypes.ABORT });
  const onRecovery = () => dispatch({ type: actionTypes.RECOVERY });
  const onChange = (newValue) =>
    dispatch({ type: actionTypes.CHANGE, payload: newValue });
  const onConfirmation = () => dispatch({ type: actionTypes.CONFIRMATION });

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
        <button onClick={onDelete}>Sí, eliminar</button>
        <button onClick={onAbort}>No, me arrepentí</button>
      </>
    );
  } else if (!!state.recovery) {
    return (
      <>
        <p>Has eliminado Use State</p>
        <button onClick={onRecovery}>Recuperar Use State</button>
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
          onChange={({ target }) => onChange(target.value)}
        />
        <button onClick={onConfirmation}>Comprobar</button>
      </div>
    );
  }
}

export { UseReducer };
