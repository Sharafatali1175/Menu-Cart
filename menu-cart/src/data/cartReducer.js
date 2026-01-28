export const cartReducer = (state, action) => {
  const actions = {
    ADD: () => {
      const found = state.find((i) => i.id === action.payload.id);
      return found
        ? state.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state, { ...action.payload, quantity: 1 }];
    },

    REMOVE: () =>
      state
        .map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0),

    DELETE: () => state.filter((i) => i.id !== action.payload),

    SET_QUANTITY: () =>
      state
        .map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        )
        .filter((i) => i.quantity > 0),
  };

  return actions[action.type] ? actions[action.type]() : state;
};
