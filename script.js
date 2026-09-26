const APACHE_CART_KEY = "apacheCart";
const PRODUCTS = {
  "Wireless Headphones": {price:99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"},
  "Minimalist Watch": {price:149,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"},
  "Running Sneakers": {price:120,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"},
  "Vintage Camera": {price:250,image:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80"}
};
document.addEventListener("DOMContentLoaded",()=>{updateCartCount();displayCartItems();setupSearch();});
function getCart(){try{return JSON.parse(localStorage.getItem(APACHE_CART_KEY))||[]}catch{return[]}}
function saveCart(cart){localStorage.setItem(APACHE_CART_KEY,JSON.stringify(cart));updateCartCount()}
function addToCart(name,price,image){const cart=getCart(),item=cart.find(x=>x.name===name);if(item)item.quantity+=1;else cart.push({name,price:Number(price),image:image||PRODUCTS[name]?.image||"",quantity:1});saveCart(cart);showToast(name+" added to cart")}
function updateCartCount(){const n=getCart().reduce((s,x)=>s+Number(x.quantity||0),0);document.querySelectorAll("#cartCount").forEach(e=>e.textContent=n)}
function changeQuantity(name,delta){const cart=getCart(),item=cart.find(x=>x.name===name);if(!item)return;item.quantity+=delta;if(item.quantity<=0)saveCart(cart.filter(x=>x.name!==name));else saveCart(cart);displayCartItems()}
function removeFromCart(name){saveCart(getCart().filter(x=>x.name!==name));displayCartItems();showToast("Item removed")}
function displayCartItems(){const c=document.getElementById("cartItemsContainer"),t=document.getElementById("cartTotal");if(!c)return;const cart=getCart();if(!cart.length){c.innerHTML='<div class="empty-cart"><i class="fa-solid fa-cart-shopping"></i><h3>Your cart is empty</h3><p>Add products to start shopping.</p><a href="shop.html">Continue Shopping</a></div>';if(t)t.innerHTML="Total Price: <span>$0.00</span>";return}let total=0;c.innerHTML=cart.map(item=>{const p=Number(item.price)||0,q=Number(item.quantity)||1,sum=p*q;total+=sum;return '<div class="cart-item"><div class="item-info"><img src="'+(item.image||PRODUCTS[item.name]?.image||"")+'" alt="'+escapeHtml(item.name)+'"><div><h4>'+escapeHtml(item.name)+'</h4><p>$'+p.toFixed(2)+' each</p></div></div><div class="quantity-controls"><button onclick="changeQuantity(\''+escapeAttr(item.name)+'\',-1)">−</button><span>'+q+'</span><button onclick="changeQuantity(\''+escapeAttr(item.name)+'\',1)">+</button></div><div class="item-price">$'+sum.toFixed(2)+'</div><button class="remove-item" onclick="removeFromCart(\''+escapeAttr(item.name)+'\')"><i class="fa-solid fa-trash"></i></button></div>'}).join("");if(t)t.innerHTML="Total Price: <span>$"+total.toFixed(2)+"</span>"}
function setupSearch(){const i=document.getElementById("searchInput");if(i)i.addEventListener("input",searchProducts)}
function searchProducts(){const i=document.getElementById("searchInput");if(!i)return;const f=i.value.trim().toLowerCase();document.querySelectorAll(".product-card").forEach(c=>c.style.display=(c.dataset.name||"").toLowerCase().includes(f)?"":"none")}
function showToast(m){const t=document.getElementById("toast-container"),x=document.getElementById("toast-message");if(!t||!x)return;x.textContent=m;t.classList.add("show");clearTimeout(window.apacheToastTimer);window.apacheToastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function escapeAttr(v){return String(v).replace(/'/g,"\\'")}
function togglePasswordVisibility(){const i=document.getElementById("passwordInput"),x=document.getElementById("togglePassword");if(!i||!x)return;i.type=i.type==="password"?"text":"password";x.classList.toggle("fa-eye",i.type==="text");x.classList.toggle("fa-eye-slash",i.type==="password")}
function handleLogin(e){e.preventDefault();alert("Apache Shop login is currently in demo mode.")}
