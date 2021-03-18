const initialState = {
  products: [],
  createProductData: {
    name: '',
    price: '',
  },
  editProductData: {
    id: '',
    name: '',
    price: '',
  },
  editProductModal: false,
  createProductModal: false
};

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const DEL_PRODUCT = 'DEL_PRODUCT';
export const UPDATE_CREATE_PRODUCT_DATA = 'UPDATE_CREATE_PRODUCT_DATA';
export const UPDATE_EDIT_PRODUCT_DATA = 'UPDATE_EDIT_PRODUCT_DATA';
export const TOGGLE_CREATE_PRODUCT_MODAL = 'TOGGLE_CREATE_PRODUCT_MODAL';
export const TOGGLE_EDIT_PRODUCT_MODAL = 'TOGGLE_EDIT_PRODUCT_MODAL';

const exercise = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST: {
      return {
        ...initialState,
        products: payload
      };
    }

    case DEL_PRODUCT: {
      return {
        ...initialState,
        products: state.products.filter(prod => prod.id !== payload)
      };
    }

    case UPDATE_CREATE_PRODUCT_DATA: {
      return {
        ...state,
        createProductData: payload
      };
    }

    case UPDATE_EDIT_PRODUCT_DATA:{
      return {
        ...state,
        editProductData: payload
      }
    }

    case TOGGLE_CREATE_PRODUCT_MODAL: {
      return {
        ...state,
        createProductModal: !state.createProductModal
      };
    }

    case TOGGLE_EDIT_PRODUCT_MODAL: {
      return {
        ...state,
        editProductModal: !state.editProductModal
      }
    }

    default:
      return state;
  }
};

export default exercise;