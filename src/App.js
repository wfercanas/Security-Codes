import React from 'react';
import { UseState } from './UseState';
import { ClassState } from './ClassState';

function App() {
  return (
    <div className='App'>
      <UseState name='Use State' />
      <ClassState name='Class State' />
    </div>
  );
}

export default App;
