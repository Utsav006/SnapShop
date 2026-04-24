document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let cart = [];
    let currentUser = null;
    const API_URL = 'http://localhost:3000/api';

    // --- DOM ELEMENT SELECTORS ---
    const authView = document.getElementById('auth-view');
    const shopView = document.getElementById('shop-view');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const productGrid = document.getElementById('product-grid');
    const welcomeUser = document.getElementById('welcome-user');
    const cartCount = document.getElementById('cart-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const searchBar = document.getElementById('search-bar');
    const loader = document.getElementById('loader-container');
    const noResults = document.getElementById('no-results');
    const paymentModal = document.getElementById('payment-modal');
    const cardDetailsForm = document.getElementById('card-details-form');
    const codInfo = document.getElementById('cod-info');
    const productDetailModal = document.getElementById('product-detail-modal');
    
    // --- UTILITY FUNCTIONS (TOAST & LOADER) ---
    const showToast = (message, type = 'info') => {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    const showLoader = (show) => {
        loader.classList.toggle('hidden', !show);
    };

    // --- API & DATA HANDLING ---
    async function fetchProductsFromServer() {
        showLoader(true);
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) throw new Error('Network response was not ok');
            products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            productGrid.innerHTML = `<p class="text-center text-red-500 col-span-full">Failed to load products. Is the server running?</p>`;
            showToast('Failed to load products.', 'error');
        } finally {
            showLoader(false);
        }
    }

    // --- RENDERING FUNCTIONS ---
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        noResults.classList.toggle('hidden', productsToRender.length > 0);
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card flex flex-col p-4 cursor-pointer';
            productCard.dataset.productId = product.id; // For opening the detail view
            const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
            const reviews = Math.floor(Math.random() * 2000) + 50;

            productCard.innerHTML = `
                <div class="h-48 mb-4 flex items-center justify-center pointer-events-none">
                    <img src="${product.image}" alt="${product.name}" class="max-h-full max-w-full object-contain">
                </div>
                <div class="flex-grow flex flex-col pointer-events-none">
                    <h3 class="product-title font-semibold text-gray-800">${product.name}</h3>
                    <div class="flex items-center my-2">
                        <span class="star-rating">${'★'.repeat(Math.round(rating))}${'☆'.repeat(5 - Math.round(rating))}</span>
                        <span class="text-sm text-gray-500 ml-2">${reviews.toLocaleString()} ratings</span>
                    </div>
                    <p class="text-xl font-bold text-gray-900 my-1">₹${product.price.toFixed(2)}</p>
                    <div class="flex-grow"></div>
                    <button data-product-id="${product.id}" class="add-to-cart-btn w-full mt-4 py-2 rounded-lg font-semibold text-sm pointer-events-auto">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        cartSidebar.innerHTML = `
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-xl font-bold text-gray-800">Your Cart</h2>
                <button id="close-cart-btn" class="text-2xl font-bold text-gray-600 hover:text-gray-900">&times;</button>
            </div>
            <div id="cart-items" class="flex-grow p-4 overflow-y-auto">
                ${cart.length === 0 ? '<p class="text-center text-gray-500">Your cart is empty.</p>' : 
                    cart.map(item => `
                        <div class="flex items-center justify-between py-2 border-b">
                            <div class="flex items-center">
                                <img src="${item.image}" class="w-16 h-16 object-contain rounded-md mr-4">
                                <div>
                                    <p class="font-semibold text-sm">${item.name}</p>
                                    <p class="text-xs text-gray-600">Qty: ${item.quantity}</p>
                                </div>
                            </div>
                            <p class="font-bold text-sm">₹${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    `).join('')
                }
            </div>
            <div class="p-4 border-t bg-gray-50">
                <div class="flex justify-between items-center mb-4 font-bold text-lg">
                    <span>Total:</span>
                    <span id="cart-total">₹${totalCost.toFixed(2)}</span>
                </div>
                <button id="checkout-btn" class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${cart.length === 0 ? 'disabled' : ''}>Proceed to Checkout</button>
            </div>
        `;

        document.getElementById('close-cart-btn').addEventListener('click', closeCart);
        document.getElementById('checkout-btn')?.addEventListener('click', () => {
            if (cart.length > 0) {
                paymentModal.classList.remove('hidden');
            }
        });
    }
    
    // --- EVENT LISTENERS ---
    document.getElementById('logout-btn').addEventListener('click', () => {
        saveCart(); currentUser = null; cart = [];
        shopView.classList.add('hidden');
        authView.classList.remove('hidden');
        loginForm.reset(); updateCartUI();
    });

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        currentUser = document.getElementById('login-email').value;
        authView.classList.add('hidden'); shopView.classList.remove('hidden');
        welcomeUser.textContent = currentUser.split('@')[0];
        loadCart(); fetchProductsFromServer();
        showToast(`Welcome back!`, 'success');
    });

    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        showToast('Registration successful! Please log in.', 'success');
        registerForm.reset(); showLoginLink.click();
    });

    showRegisterLink.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('login-form-container').classList.add('hidden');
        document.getElementById('register-form-container').classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('register-form-container').classList.add('hidden');
        document.getElementById('login-form-container').classList.remove('hidden');
    });

    searchBar.addEventListener('input', e => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    productGrid.addEventListener('click', e => {
        const addToCartBtn = e.target.closest('.add-to-cart-btn');
        const productCard = e.target.closest('.product-card');

        if (addToCartBtn) {
            const productId = parseInt(addToCartBtn.dataset.productId);
            addToCart(productId);
        } else if (productCard) {
            const productId = parseInt(productCard.dataset.productId);
            openProductDetailModal(productId);
        }
    });

    // --- PRODUCT DETAIL MODAL ---
    function openProductDetailModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const description = `Discover the amazing ${product.name}, a top-rated product in the ${product.category} category. Priced at just ₹${product.price.toFixed(2)}, it offers incredible value and quality. Perfect for your needs, this item has received excellent reviews from our customers.`;
        const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
        const reviews = Math.floor(Math.random() * 2000) + 50;

        productDetailModal.innerHTML = `
            <div class="product-detail-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40"></div>
            <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto">
                <button id="close-detail-btn" class="absolute top-3 right-4 text-4xl font-light text-gray-500 hover:text-gray-900">&times;</button>
                <div class="md:w-1/2">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-auto object-contain rounded-lg">
                </div>
                <div class="md:w-1/2 flex flex-col">
                    <h2 class="text-3xl font-bold text-gray-800">${product.name}</h2>
                    <p class="text-sm text-gray-500 mt-1">${product.category}</p>
                    <div class="flex items-center my-4">
                        <span class="star-rating">${'★'.repeat(Math.round(rating))}${'☆'.repeat(5 - Math.round(rating))}</span>
                        <span class="text-sm text-gray-500 ml-2">${reviews.toLocaleString()} ratings</span>
                    </div>
                    <p class="text-gray-600 flex-grow mb-4">${description}</p>
                    <div class="flex items-baseline gap-2 mt-auto">
                         <p class="text-4xl font-bold text-gray-900">₹${product.price.toFixed(2)}</p>
                         <p class="text-sm text-gray-500"> + Free Shipping</p>
                    </div>
                    <button data-product-id="${product.id}" class="add-to-cart-btn-modal w-full mt-4 py-3 rounded-lg font-semibold text-lg">Add to Cart</button>
                </div>
            </div>
        `;

        productDetailModal.classList.remove('hidden');

        document.getElementById('close-detail-btn').addEventListener('click', closeProductDetailModal);
        document.querySelector('.product-detail-overlay').addEventListener('click', closeProductDetailModal);
        document.querySelector('.add-to-cart-btn-modal').addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
            closeProductDetailModal();
        });
    }

    function closeProductDetailModal() {
        productDetailModal.classList.add('hidden');
        productDetailModal.innerHTML = '';
    }

    // --- PAYMENT MODAL LOGIC ---
    document.getElementById('payment-options').addEventListener('change', (e) => {
        if (e.target.value === 'card') {
            cardDetailsForm.classList.remove('hidden');
            codInfo.classList.add('hidden');
        } else if (e.target.value === 'cod') {
            cardDetailsForm.classList.add('hidden');
            codInfo.classList.remove('hidden');
        }
    });

    const closePaymentModal = () => paymentModal.classList.add('hidden');
    document.getElementById('cancel-payment-btn').addEventListener('click', closePaymentModal);
    
    document.getElementById('confirm-payment-btn').addEventListener('click', () => {
         showToast(`Payment successful! Thank you for your order.`, 'success');
         cart = [];
         saveCart();
         updateCartUI();
         closePaymentModal();
         closeCart();
    });

    document.getElementById('place-order-cod-btn').addEventListener('click', () => {
        showToast(`Your order has been placed successfully!`, 'success');
        cart = [];
        saveCart();
        updateCartUI();
        closePaymentModal();
        closeCart();
    });

    // --- CART LOGIC ---
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) cartItem.quantity++; else cart.push({ ...product, quantity: 1 });
        updateCartUI(); saveCart(); showToast(`${product.name} added to cart!`, 'info');
    }

    function saveCart() {
        if (currentUser) localStorage.setItem(`cart_${currentUser}`, JSON.stringify(cart));
    }

    function loadCart() {
        if (currentUser) {
            const savedCart = localStorage.getItem(`cart_${currentUser}`);
            cart = savedCart ? JSON.parse(savedCart) : [];
            updateCartUI();
        }
    }

    document.getElementById('cart-button').addEventListener('click', () => {
        cartSidebar.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
    });

    const closeCart = () => {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
    };
    
    cartOverlay.addEventListener('click', closeCart);
    
    // Initial call to set up the cart UI on page load
    updateCartUI(); 
});