import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: storeProducts,
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  }

  componentDidMount() {
    this.setProducts();
  }

  getItem = (id) => {
    const { products } = this.state;
    const product = products.find(item => item.id === id);
    return product;
  }

  setProducts = () => {
    const products = [];

    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products.push(singleItem);
    });

    this.setState(() => ({ products }));
  }

  handleDetails = (id) => {
    this.setState(() => ({
      detailProduct: this.getItem(id),
    }));
  }

  addToCart = (id) => {
    const { state } = this;
    const products = [...state.products];
    const index = products.indexOf(this.getItem(id));
    const product = products[index];

    product.inCart = true;
    product.count = 1;

    const { price } = product;
    product.total = price;

    this.setState(() => ({
      products,
      cart: [...state.cart, product],
    }));
  }

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => ({
      modalProduct: product,
      modalOpen: true,
    }));
  }

  closeModal = () => {
    this.setState(() => ({
      modalOpen: false,
    }));
  }

  increment = (id) => {
    console.log('increament');
  }

  decrement = (id) => {
    console.log('decreament');
  }

  removeItem = (id) => {
    console.log('remove item');
  }

  clearCart = () => {
    console.log('cart was cleared');
  }

  render() {
    const {
      props,
      state,
      handleDetails,
      addToCart,
      openModal,
      closeModal,
      increment,
      decrement,
      removeItem,
      clearCart,
    } = this;

    return (
      <ProductContext.Provider
        value={
          {
            ...state,
            handleDetails,
            addToCart,
            openModal,
            closeModal,
            increment,
            decrement,
            removeItem,
            clearCart,
          }
        }
      >
        {props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
