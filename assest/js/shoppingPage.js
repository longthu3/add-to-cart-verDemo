import listProduct from "./data/product.js";

const products = listProduct;
const cart = [];
const tableListProduct = document.querySelector('#list-product');
const tableCart = document.querySelector('#list-cart');
const userLayout = document.querySelector('#user');

const user = JSON.parse(localStorage.getItem('user'));


const showProduct = (products) => {
    let result = `  <tr>
                <th>No</th>
                <th>Product</th>
                <th>Price</th>
            </tr>`;

    products.forEach((product, index) => {
        result += `
        
            <tr>
                <td>${++index}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td style="width: 300px;">
                    <input style="width: 100%;" type="number" name="quantity-buy" placeholder="Input quatity"
                        id="quantity-buy-${product.id}">
                    <button onclick="addToCart(${product.id})" style="width: 100%;">Add to cart</button>
                </td>
            </tr>
        `;
    });

    tableListProduct.innerHTML = result;
}

const showCart = () => {

    if (cart.length === 0) {
        tableCart.innerHTML = '<span>No product in cart</span>';
        return;
    }

    let result = `<tr>
                <th>No</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
            </tr>
            `;
    let total = 0;
    cart.forEach((product, index) => {
        result += `
            <tr>
                <td>${++index}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.price * product.quantity}</td>
                <td style="width: 300px;">
                    <button style="width: 100%;" onclick="deleteProductInCart(${product.id})">Delete</button>
                </td>
            </tr>
        `;
        total += product.price * product.quantity;
    });
    result += `
            <tr>
                <td colspan="4">Total</td>
                <td colspan="2">${total}</td>
            </tr>
    `;
    tableCart.innerHTML = result;
}

const deleteProductInCart = (id) => {
    const agreeDelete = confirm('Are you sure you want to delete this product?');
    if (agreeDelete) {
        const index = cart.findIndex((product) => product.id === id);
        cart.splice(index, 1);
        showCart();
    }
}

const deleteCart = () => {

    if (cart.length === 0) {
        alert('No product in cart');
        return;
    }

    const agreeDelete = confirm('Are you sure you want to delete all products?');
    if (agreeDelete) {
        cart.splice(0, cart.length);
        showCart();
    }
}

const addToCart = (id) => {
    const quantity = document.querySelector(`#quantity-buy-${id}`).value;
    const product = products.find((product) => product.id === id);
    const productCart = cart.find((product) => product.id === id);

    if (quantity <= 0) {
        alert('Quantity must be greater than 0');
        return;
    }

    if (productCart) {
        productCart.quantity += +quantity;
    } else {
        cart.push({
            ...product,
            quantity: +quantity
        });
    }

    showCart();
}

//authenticating user
if (user) {
    userLayout.innerHTML = `Welcome ${user.email}`;
    showProduct(products);
    showCart();
} else {
    window.location.href = '/index.html';
}

window.addToCart = addToCart;
window.deleteProductInCart = deleteProductInCart;
window.deleteCart = deleteCart;