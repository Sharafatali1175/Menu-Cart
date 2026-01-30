
export const COUPONS = {
  SAVE10: { type: "PERCENT", value: 10, minTotal: 10 },
  FLAT50: { type: "FLAT", value: 50, minTotal: 50 },
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
  couponInput: "",
  couponError: null,
  totalPrice: 0,
  totalPayable: 0,
};

export const cartReducer = (state, action) => {
  let items, total;
  switch (action.type) {
    case "ADD":
      const exists = state.items.find(i => i.id === action.payload.id);
      items = exists
        ? state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return {
        ...state,
        items,
        totalPrice: total,
        discount: calculateDiscount(items, state.coupon),
        totalPayable: total - calculateDiscount(items, state.coupon),
        couponError: null,
      };

    case "DELETE":
      items = state.items.filter(i => i.id !== action.payload);
      total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const coupon = items.length === 0 ? null : state.coupon;
      const discount = calculateDiscount(items, coupon);
      return {
        ...state,
        items,
        coupon: coupon,
        totalPrice: total,
        discount: discount,
        totalPayable: total - discount,
        couponError: null,
      };

    case "SET_INPUT_QUANTITY":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, inputQuantity: action.payload.value }
            : i
        ),
      };

    case "SET_QUANTITY":
      items = state.items
        .map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity, inputQuantity: undefined }
            : i
        )
        .filter(i => i.quantity > 0);
      total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return {
        ...state,
        items,
        totalPrice: total,
        discount: calculateDiscount(items, state.coupon),
        totalPayable: total - calculateDiscount(items, state.coupon),
        couponError: null,
        coupon: items.length === 0 ? null : state.coupon,
      };

    case "SET_INPUT_COUPON":
      return { ...state, couponInput: action.payload, couponError: null };

    case "APPLY_COUPON": {
      const code = action.payload.trim().toUpperCase();
      if (!state.items.length)
        return {
          ...state,
          couponError: "Cart is empty",
          coupon: null,
          discount: 0,
          totalPayable: state.totalPrice,
          couponInput: "",
        };

      const coupon = COUPONS[code];
      if (!coupon)
        return {
          ...state,
          couponError: "Invalid coupon code",
          coupon: null,
          discount: 0,
          totalPayable: state.totalPrice,
          couponInput: "",
        };

      total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      if (total < coupon.minTotal) {
        return {
          ...state,
          couponError: `Your total must be at least $${coupon.minTotal} to apply ${code}`,
          coupon: null,
          discount: 0,
          totalPayable: total,
          couponInput: "",
        };
      }

      const discount = calculateDiscount(state.items, code);

      return {
        ...state,
        coupon: code,
        discount,
        totalPayable: total - discount,
        couponError: null,
        couponInput: "",
        totalPrice: total,
      };
    }

    case "REMOVE_COUPON":
      total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return {
        ...state,
        coupon: null,
        discount: 0,
        totalPayable: total,
        couponInput: "",
        couponError: null,
      };

    default:
      return state;
  }
};


