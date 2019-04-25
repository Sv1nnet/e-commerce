import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotal from './CartTotal';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(context) => {
            const { cart } = context;
            const { props } = this;
            return cart.length > 0 ? (
              <>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList value={context} />
                <CartTotal value={context} history={props.history} />
              </>
            ) : (
              <>
                <EmptyCart />
              </>
            );
          }}
        </ProductConsumer>
      </section>
    );
  }
}
