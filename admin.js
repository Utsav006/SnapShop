document.addEventListener('DOMContentLoaded', () => {
    const sellerAuthView = document.getElementById('seller-auth-view');
    const productManagementView = document.getElementById('product-management-view');
    
    // Forms and containers
    const sellerLoginContainer = document.getElementById('seller-login-container');
    const sellerRegisterContainer = document.getElementById('seller-register-container');
    const sellerLoginForm = document.getElementById('seller-login-form');
    const sellerRegisterForm = document.getElementById('seller-register-form');
    
    // Links to switch forms
    const showRegisterLink = document.getElementById('show-register-form');
    const showLoginLink = document.getElementById('show-login-form');

    // Messages
    const loginErrorMessage = document.getElementById('login-error-message');
    const registerMessage = document.getElementById('register-message');

    // Product Management
    const addProductForm = document.getElementById('add-product-form');
    const adminProductList = document.getElementById('admin-product-list');

    const API_URL = 'http://localhost:3000/api';
    let products = [];

    // --- Form Switching Logic ---
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        sellerLoginContainer.classList.add('hidden');
        sellerRegisterContainer.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        sellerRegisterContainer.classList.add('hidden');
        sellerLoginContainer.classList.remove('hidden');
    });


    // --- Seller Registration ---
    sellerRegisterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        registerMessage.classList.add('hidden');

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch(`${API_URL}/sellers/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Registration failed');
            }

            registerMessage.textContent = 'Registration successful! Please log in.';
            registerMessage.classList.remove('hidden', 'text-red-500');
            registerMessage.classList.add('text-green-500');
            sellerRegisterForm.reset();
            setTimeout(() => showLoginLink.click(), 2000); // Switch to login form after 2 seconds

        } catch (error) {
            registerMessage.textContent = error.message;
            registerMessage.classList.remove('hidden', 'text-green-500');
            registerMessage.classList.add('text-red-500');
        }
    });

    
    // --- Seller Login ---
    sellerLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginErrorMessage.classList.add('hidden');
        
        const email = document.getElementById('seller-email').value;
        const password = document.getElementById('seller-password').value;

        try {
            const response = await fetch(`${API_URL}/sellers/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                sellerAuthView.classList.add('hidden');
                productManagementView.classList.remove('hidden');
                fetchAdminProducts();
            } else {
                throw new Error(result.message || 'Login failed');
            }
        } catch (error) {
            loginErrorMessage.textContent = error.message;
            loginErrorMessage.classList.remove('hidden');
        }
    });


    // --- Product Management Logic ---
    async function fetchAdminProducts() {
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) throw new Error('Failed to fetch');
            products = await response.json();
            renderAdminProducts();
        } catch (error) {
            console.error("Error fetching products:", error);
            adminProductList.innerHTML = `<p class="text-red-500">Could not load products. Please ensure the server is running.</p>`;
        }
    }

    function renderAdminProducts() {
        adminProductList.innerHTML = '';
        if (products.length === 0) {
            adminProductList.innerHTML = `<p class="text-gray-500">No products yet. Add one using the form!</p>`;
            return;
        }

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg border';
            productElement.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${product.image}" alt="${product.name}" class="w-16 h-16 rounded-md object-cover">
                    <div>
                        <p class="font-semibold text-gray-800">${product.name}</p>
                        <p class="text-sm text-gray-600">₹${product.price.toFixed(2)}</p>
                    </div>
                </div>
                <button data-product-id="${product.id}" class="remove-product-btn text-red-500 hover:text-red-700 font-semibold">Remove</button>
            `;
            adminProductList.appendChild(productElement);
        });
    }

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newProduct = {
            name: document.getElementById('product-name').value,
            price: parseFloat(document.getElementById('product-price').value),
            image: document.getElementById('product-image').value,
            category: document.getElementById('product-category').value
        };

        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) throw new Error('Failed to add product');

            const addedProduct = await response.json();
            products.push(addedProduct);
            renderAdminProducts();
            addProductForm.reset();
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Could not add the product. Please check the server connection.");
        }
    });
    
    adminProductList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('remove-product-btn')) {
            const productId = parseInt(e.target.dataset.productId);
            
            if (confirm('Are you sure you want to remove this product?')) {
                 try {
                    const response = await fetch(`${API_URL}/products/${productId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) throw new Error('Failed to delete product');
                    
                    products = products.filter(p => p.id !== productId);
                    renderAdminProducts();
                } catch (error) {
                    console.error("Error deleting product:", error);
                    alert("Could not delete the product. Please check the server connection.");
                }
            }
        }
    });
});