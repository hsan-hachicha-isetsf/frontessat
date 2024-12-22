import React, { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import {Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const Cart = () => {
  const { cartDetails, removeItem , clearCart, totalPrice, cartCount,incrementItem,decrementItem } = useShoppingCart();
  const [payment, setpayment] = useState(false);
  const navigate=useNavigate()

  const onToken = (token) => {
   // pour finaliser la transaction il faut aussi envoyer le token au backend
   console.log(token);
   //vider le cart
   clearCart();
   //naviguer vers la page d'accueil
   navigate('/');
 };
 
   const handleCheckout = async() => {
   
    setpayment(true);
 
  };
 
  return (
    <div className="cart-container">
        {payment ? <StripeCheckout
  token={onToken}
  stripeKey={publicKey}
  amount={totalPrice*100} // Montant en centimes
  currency="USD" // Devise
/> :null}

      <h2>Shopping Cart</h2>
      {cartCount === 0 ? (
        <div className="cart-empty">
          <p>Panier Vide</p>
          <div className="start-shopping">
            <Link to="/client">
              
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
          {cartDetails && Object.values(cartDetails).map((cartItem) =>            <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                   <img src={`${cartItem.image}`} alt={cartItem.title}/>
                    <div>
                      <h3>{cartItem.title}</h3>  
                      <button onClick={() => removeItem(cartItem.id)}>
                      <i className="fa-solid fa-trash-can" style={{"fontSize":"14px","color":"red"}}></i>
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price"> {cartItem.price} TND</div>
                  <div className="cart-product-quantity">
                    <button className="button-actions" onClick={() => decrementItem(cartItem.id)}>
                      - 
                    </button>
                    <div className="count">{cartItem.quantity}</div>
                    <button className="button-actions" onClick={() => incrementItem(cartItem.id)}>
                      +
                    </button>
                   
                  </div>
                  <div className="cart-product-total-price">
                    {cartItem.quantity*cartItem.price} TND
                  </div>
                </div>
             )}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() =>  clearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">{totalPrice} TND</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button onClick={handleCheckout} > Check Out" </button>
              <div className="continue-shopping">
                <Link to="/client">
                  
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
