import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();
// Provider
// Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
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

  render() {
    const {
      props,
      state,
      handleDetails,
      addToCart,
      openModal,
      closeModal,
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
