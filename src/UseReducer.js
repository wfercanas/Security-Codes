const initialState = {
  value: '',
  error: false,
  loading: false,
  confirmation: false,
  recovery: false,
};

// Forma if-else
const reducer = (state, action) => {
  if (action.type === 'ERROR') {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading: true,
    };
  } else {
    return { ...state };
  }
};

// Forma Switch
const reducerSwitch = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return { ...state };
  }
};

// Forma Reducer Object and Function
const reducerObject = (state) => {
  return {
    ERROR: { ...state, error: true, loading: false },
    CHECK: { ...state, loading: true },
  };
};

const reducerFunction = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
};
