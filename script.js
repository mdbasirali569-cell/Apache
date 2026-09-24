// Update Cart Count on load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCartItems();
});

// Search functionality
function searchProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        let name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Add to Cart functionality
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('apacheCart')) || [];
    
    // Check if product already exists
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    localStorage.setItem('apacheCart', JSON.stringify(cart));
    updateCartCount();
    alert(name + " cart-e add kora hoyeche!");
}

// Update Cart Badge Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('apacheCart')) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    let countElements = document.querySelectorAll('#cartCount');
    countElements.forEach(el => {
        el.innerText = totalCount;
    });
}

// Display Cart Items in cart.html
function displayCartItems() {
    let container = document.getElementById('cartItemsContainer');
    let totalContainer = document.getElementById('cartTotal');
    if (!container) return;

    let cart = JSON.parse(localStorage.getItem('apacheCart')) || [];

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #555;">Your cart is empty.</p>';
        if (totalContainer) totalContainer.innerHTML = '';
        return;
    }

    let html = '<ul style="list-style: none; padding: 0;">';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        html += `<li style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #ddd;">
                    <span><b>${item.name}</b> ($${item.price} x ${item.quantity})</span>
                    <span>$${itemTotal}</span>
                 </li>`;
    });

    html += '</ul>';
    container.innerHTML = html;
    if (totalContainer) {
        totalContainer.innerHTML = `Total Price: $${totalPrice}`;
    }
}
