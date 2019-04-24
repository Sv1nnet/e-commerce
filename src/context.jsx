/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
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
    }),
    () => this.addTotals());
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
    const { state } = this;
    const tempCart = [...state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count += 1;
    product.total = product.count * product.price;

    this.setState(() => ({
      cart: [...tempCart],
    }),
    () => this.addTotals());
  }

  decrement = (id) => {
    const { state } = this;
    const tempCart = [...state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count -= product.count <= 0 ? 0 : 1;
    product.total = product.count * product.price;

    this.setState(() => ({
      cart: [...tempCart],
    }),
    () => this.addTotals());
  }

  removeItem = (id) => {
    const { state } = this;
    const tempProducts = [...state.products];
    const cart = [...state.cart];
    const tempCart = cart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    const removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;

    this.setState(() => ({
      cart: [...tempCart],
      products: [...tempProducts],
    }),
    () => this.addTotals());
  }

  clearCart = () => {
    this.setState(() => ({
      cart: [],
    }),
    () => {
      this.setProducts();
      this.addTotals();
    });
  }

  addTotals = () => {
    const { state } = this;
    let subTotal = 0;
    state.cart.map(item => subTotal += item.total);
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    this.setState(() => ({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total,
    }));
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
