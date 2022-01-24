import React, { useEffect, useState } from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        if (!(value === SECURITY_CODE)) {
          setError(true);
        }
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  const [value, setValue] = useState('');
  useEffect(() => {
    if (!!error) {
      setError(false);
    }
  }, [value]);

  const handleClick = () => {
    setError(false);
    setLoading(true);
  };

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>
        Por favor, escribe el código de seguridad para comprobar que quieres
        eliminar.
      </p>
      {error && <p>Error: El código es incorrecto</p>}
      {loading && <p>Cargando...</p>}
      <input
        placeholder='Código de seguridad'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>Comprobar</button>
    </div>
  );
}

export { UseState };
