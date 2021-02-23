import Navbar from './components/Products/Navbar/Navbar';
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { commerce } from './lib/commerce'
import { useState, useEffect } from 'react'

const App = () => {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data)
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();

        setCart(cart)
    }

    const handleAddToCart = async (productId, quandtity) => {
        const item = await commerce.cart.add(productId, quandtity);

        setCart(item.cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart)
    }


    const handleEmptyCart = async (productId) => {
        const { cart } = await commerce.cart.empty(productId);

        setCart(cart)
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    console.log(cart)

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={handleAddToCart} />

                    </Route>
                    <Route exact path='/cart'>
                        <Cart
                            cart={cart}
                            handleEmptyCart={handleEmptyCart}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleUpdateCartQty={handleUpdateCartQty}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>

    )
}

export default App;
