import axios from 'axios';
import { DEL_PRODUCT, FETCH_PRODUCTS_REQUEST, TOGGLE_CREATE_PRODUCT_MODAL, TOGGLE_EDIT_PRODUCT_MODAL, UPDATE_CREATE_PRODUCT_DATA, UPDATE_EDIT_PRODUCT_DATA } from '../reducers/products';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const productsList = await axios.get('http://localhost:5000/api/products/');
      dispatch({ type: FETCH_PRODUCTS_REQUEST, payload: productsList.data });
    } catch (err) {
      console.error(err);
    };
  }
}

export const addProduct = () => {
  return async (dispatch, getState) => {
    try {
      const product = getState().products.createProductData;

      await axios.post('http://localhost:5000/api/products/', product);
      await dispatch(fetchProducts());
    } catch (err) {
      console.error(err);
      dispatch(toggleCreateProductModal());
      dispatch(updateCreateProductData({key:'name', value:''}));
      dispatch(updateCreateProductData({key:'price', value:''}));
    };
  }
}

export const updateProduct = () => {
  return async (dispatch, getState) => {
    try {
      const product = getState().products.editProductData;

      await axios.put('http://localhost:5000/api/products/' + product.id, {
        name: product.name,
        price: product.price,
      });
      
      await dispatch(fetchProducts());
    } catch (err) {
      console.error(err);
      dispatch(toggleEditProductModal());
    };
  }
}

export const delProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete('http://localhost:5000/api/products/' + id);
      dispatch({ type: DEL_PRODUCT, payload: id });
    } catch (err) {
      console.error(err);
    };
  }
}

export const toggleCreateProductModal = () => {
  return (dispatch)=>dispatch({type: TOGGLE_CREATE_PRODUCT_MODAL});
}

export const toggleEditProductModal = (id)=>{
  return (dispatch, getState)=>{
    try {
      if(typeof id==='number'){
        const product = getState().products.products.find(prod=>prod.id===id);
  
        for (const [key, value] of Object.entries(product)) {
          dispatch(updateEditProductData({key, value}));
        }
        
      }

      dispatch({type: TOGGLE_EDIT_PRODUCT_MODAL});
    } catch (err) {
      console.error(err);
    }
  };
}

export const updateCreateProductData = (data)=>{
  return (dispatch, getState)=>{
    const prevData = getState().products.createProductData;

    const newData = {
      ...prevData,
      [data.key]: data.value
    };

    dispatch({type:UPDATE_CREATE_PRODUCT_DATA, payload: newData})
  }
}

export const updateEditProductData = (data)=>{
  return (dispatch, getState)=>{
    const prevData = getState().products.editProductData;

    const newData = {
      ...prevData,
      [data.key]: data.value
    };

    dispatch({type:UPDATE_EDIT_PRODUCT_DATA, payload: newData})
  }
}