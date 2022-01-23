import React, { useEffect, useState } from 'react';

function UseState({ name }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>
        Por favor, escribe el código de seguridad para comprobar que quieres
        eliminar.
      </p>
      {error && <p>Error: El código es incorrecto</p>}
      {loading && <p>Cargando...</p>}
      <input placeholder='Código de seguridad' />
      <button onClick={() => setLoading(!loading)}>Comprobar</button>
    </div>
  );
}

export { UseState };
