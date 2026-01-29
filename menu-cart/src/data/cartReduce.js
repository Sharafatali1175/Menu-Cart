
export const COUPONS = {
  SAVE10: { type: "PERCENT", value: 10 },
  FLAT50: { type: "FLAT", value: 50 },
};

const calculateDiscount = (items, couponCode) => {
  if (!couponCode || items.length === 0) return 0;

  const coupon = COUPONS[couponCode];
  if (!coupon) return 0;

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (coupon.type === "PERCENT") return (total * coupon.value) / 100;
  if (coupon.type === "FLAT") return Math.min(coupon.value, total);

  return 0;
};

export const initialState = {
  items: [],
  coupon: null,
  discount: 0,
  couponError: null,
  couponInput: "",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items = exists
        ? state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      return {
        ...state,
        items,
        discount: calculateDiscount(items, state.coupon),
        couponError: null,
      };
    }

    case "DELETE": {
      const items = state.items.filter(i => i.id !== action.payload);
      const coupon = items.length === 0 ? null : state.coupon;

      return {
        ...state,
        items,
        coupon,
        discount: calculateDiscount(items, coupon),
        couponError: null,
      };
    }

    case "SET_INPUT_QUANTITY":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, inputQuantity: action.payload.value }
            : i
        ),
      };

    case "SET_QUANTITY": {
      const items = state.items
        .map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity, inputQuantity: undefined }
            : i
        )
        .filter(i => i.quantity > 0);

      const coupon = items.length === 0 ? null : state.coupon;

      return {
        ...state,
        items,
        coupon,
        discount: calculateDiscount(items, coupon),
        couponError: null,
      };
    }

    case "SET_INPUT_COUPON":
      return {
        ...state,
        couponInput: action.payload,
        couponError: null,
      };

    case "APPLY_COUPON": {
      const code = action.payload.trim().toUpperCase();

      if (state.items.length === 0) {
        return {
          ...state,
          coupon: null,
          discount: 0,
          couponInput: "",
          couponError: "Cart is empty",
        };
      }

      const coupon = COUPONS[code];
      if (!coupon) {
        return {
          ...state,
          coupon: null,
          discount: 0,
          couponInput: "",
          couponError: "Invalid coupon code",
        };
      }

      return {
        ...state,
        coupon: code,
        discount: calculateDiscount(state.items, code),
        couponInput: "",
        couponError: null,
      };
    }

    case "REMOVE_COUPON":
      return {
        ...state,
        coupon: null,
        discount: 0,
        couponInput: "",
        couponError: null,
      };

    default:
      return state;
  }
};
