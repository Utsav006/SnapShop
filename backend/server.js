const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// CORRECTED: The products are now in a single flat array.
let products = [
    {
        "id": 1,
        "name": "High-Fidelity Wireless Headphones",
        "price": 149.99,
        "image": "https://abedtahan.com/cdn/shop/files/CONCORD.png?v=1745921730&width=416",
        "category": "Electronics"
    },
    {
        "id": 2,
        "name": "4K Ultra HD Smart TV",
        "price": 499.99,
        "image": "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/LG-4k-ultra-hd-smart-qned-ai-tv-qned82t-55-inch-Front-Side-View.png",
        "category": "Electronics"
    },
    {
        "id": 3,
        "name": "Pro Gaming Mouse",
        "price": 79.99,
        "image": "https://resource.logitechg.com/w_600,h_600,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png?v=1",
        "category": "Electronics"
    },
    {
        "id": 4,
        "name": "Portable Bluetooth Speaker",
        "price": 59.99,
        "image": "https://avstore.in/cdn/shop/products/AVStore-JBL-boombox2-1.jpg?v=1615208720&width=2048",
        "category": "Electronics"
    },
    {
        "id": 5,
        "name": "Latest Model Smartwatch",
        "price": 249.99,
        "image": "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s11-case-unselect-gallery-1-202509_FMT_WHH?wid=752&hei=720&fmt=jpeg&qlt=90&.v=1756344861456",
        "category": "Electronics"
    },
    {
        "id": 6,
        "name": "Compact Digital Camera",
        "price": 399.50,
        "image": "https://i.ytimg.com/vi/WF-SR-wflug/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCEK-YbDXdvVP1e-_1NgWcTqh9nbA",
        "category": "Electronics"
    },
    {
        "id": 7,
        "name": "Mechanical Keyboard",
        "price": 129.99,
        "image": "https://www.popsci.com/wp-content/uploads/2022/02/12/mechanical-keyboard-with-rbg.jpg?quality=85",
        "category": "Electronics"
    },
    {
        "id": 8,
        "name": "Noise-Cancelling Earbuds",
        "price": 189.99,
        "image": "https://themaczone.in/wp-content/uploads/2025/07/Bose-New-QuietComfort-Ultra-Wireless-Noise-Cancelling-Earbuds-Bluetooth-Earbuds-with-Spatial-Audio-and-World-Class-Noise-Cancellation-Black-2.jpg",
        "category": "Electronics"
    },
    {
        "id": 9,
        "name": "Ultra-Thin Laptop",
        "price": 99900,
        "image": "https://m.media-amazon.com/images/I/71AY2Pd3MHL.jpg",
        "category": "Electronics"
    },
    {
        "id": 10,
        "name": "E-Reader Tablet",
        "price": 12910,
        "image": "https://www.hollywoodreporter.com/wp-content/uploads/2022/12/Rakuten-Kobo-Sage-EMBED-2022.jpeg?w=910",
        "category": "Electronics"
    },
    {
        "id": 11,
        "name": "Classic Leather Jacket",
        "price": 199.99,
        "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400",
        "category": "Fashion"
    },
    {
        "id": 12,
        "name": "Designer Denim Jeans",
        "price": 850,
        "image": "https://tiimg.tistatic.com/fp/2/008/568/comfortable-to-wear-designer-jeans-107.jpg",
        "category": "Fashion"
    },
    {
        "id": 13,
        "name": "Comfortable Running Sneakers",
        "price": 1100,
        "image": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1741716872-puma-foreverrun-nitro-2-67d07d7915584.jpg?crop=1xw:1xh;center,top&resize=980:*",
        "category": "Fashion"
    },
    {
        "id": 14,
        "name": "Silk Scarf",
        "price": 3500,
        "image": "https://eloppe.in/cdn/shop/files/F-320.jpg?v=1705121909",
        "category": "Fashion"
    },
    {
        "id": 15,
        "name": "Formal Leather Shoes",
        "price": 150.00,
        "image": "https://www.barkershoes.com/cdn/shop/products/447016_FW23_ARNOLD_CEDAR-CALF_L_1_1024x.png?v=1687182281",
        "category": "Fashion"
    },
    {
        "id": 16,
        "name": "Stylish Sunglasses",
        "price": 65.00,
        "image": "https://assets.ray-ban.com/is/image/RayBan/805289126577__STD__shad__al2.png?impolicy=RB_Product&width=1024&bgc=%23F2F2F2",
        "category": "Fashion"
    },
    {
        "id": 17,
        "name": "Premium Wool Sweater",
        "price": 75.99,
        "image": "https://www.asket.com/assets/images/product-images/the-wool-sweater-navy-1-small-1600.jpg",
        "category": "Fashion"
    },
    {
        "id": 18,
        "name": "Canvas Tote Bag",
        "price": 29.99,
        "image": "https://www.cuyana.com/dw/image/v2/BDJJ_PRD/on/demandware.static/-/Sites-master-catalog-cuyana/default/dw10d32f78/images/2023_09_Classic-Easy-Tote/10010237-261-0000-0_alt_1.jpg?sw=1200&sh=1200",
        "category": "Fashion"
    },
    {
        "id": 19,
        "name": "Cotton T-Shirt Multipack",
        "price": 45.00,
        "image": "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/item/goods_00_422992.jpg",
        "category": "Fashion"
    },
    {
        "id": 20,
        "name": "Luxury Wristwatch",
        "price": 35000,
        "image": "https://m.media-amazon.com/images/I/61qlR6vMT7L._SL1000_.jpg",
        "category": "Fashion"
    },
    {
        "id": 21,
        "name": "Summer Floral Dress",
        "price": 699,
        "image": "https://www.vastranand.in/cdn/shop/files/2_b46fa9ab-1f2b-4128-b8b0-afb513d90588.jpg?v=1743075009&width=1080",
        "category": "Fashion"
    },
    {
        "id": 22,
        "name": "Cargo Shorts",
        "price": 499,
        "image": "https://us.motelrocks.com/cdn/shop/files/ROXE-TOP-BLACK-SATIO-CARGO-SHORT-STONE-208631.jpg?crop=center&height=2428&v=1718958246&width=1920",
        "category": "Fashion"
    },
    {
        "id": 23,
        "name": "Wide-Brim Sun Hat",
        "price": 250,
        "image": "https://images-cdn.ubuy.co.in/64ef5a52ff8cea6ffa07d026-cowin-sun-hat-for-men-sun-protection.jpg",
        "category": "Fashion"
    },
    {
        "id": 24,
        "name": "Leather Belt",
        "price": 39.99,
        "image": "https://m.media-amazon.com/images/I/61s4VkhMhnL._UY1100_.jpg",
        "category": "Fashion"
    },
    {
        "id": 25,
        "name": "Cozy Fleece Hoodie",
        "price": 55.00,
        "image": "https://m.media-amazon.com/images/I/31zHLVgWvPL._AC_SR175,263_QL70_.jpg",
        "category": "Fashion"
    },
    {
        "id": 26,
        "name": "The Midnight Library",
        "price": 159,
        "image": "https://www.bigw.com.au/medias/sys_master/images/images/hec/h25/35070702780446.jpg",
        "category": "Books"
    },
    {
        "id": 27,
        "name": "Atomic Habits",
        "price": 150,
        "image": "https://jamesclear.com/wp-content/uploads/2025/06/atomic-habits-dots.png",
        "category": "Books"
    },
    {
        "id": 28,
        "name": "Dune by Frank Herbert",
        "price": 200,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf-UyoOtN5i1gXC9By1P9qrmFp2Bs7aEl_Fg&s",
        "category": "Books"
    },
    {
        "id": 29,
        "name": "The Psychology of Money",
        "price": 199,
        "image": "https://m.media-amazon.com/images/I/71XEsXS5RlL.jpg",
        "category": "Books"
    },
    {
        "id": 30,
        "name": "Sapiens: A Brief History",
        "price": 200,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0FxCfM-_t-RbeO2sctksNPeHO2cPndNQPLg&s",
        "category": "Books"
    },
    {
        "id": 31,
        "name": "The Great Gatsby",
        "price": 199,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSwVUu5ZKDlaeZn5S7XPEkEjAscw3T-EEbgQ&s",
        "category": "Books"
    },
    {
        "id": 32,
        "name": "To Kill a Mockingbird",
        "price": 150,
        "image": "https://m.media-amazon.com/images/I/81gepf1eMqL.jpg",
        "category": "Books"
    },
    {
        "id": 33,
        "name": "1984 by George Orwell",
        "price": 139,
        "image": "https://m.media-amazon.com/images/I/81+LDW4qePL._UF1000,1000_QL80_.jpg",
        "category": "Books"
    },
    {
        "id": 34,
        "name": "Pride and Prejudice",
        "price": 119,
        "image": "https://cdn.kobo.com/book-images/1a735d96-6075-4bca-87b7-15fb97ee50c7/353/569/90/False/pride-and-prejudice-216.jpg",
        "category": "Books"
    },
    {
        "id": 35,
        "name": "The Hobbit",
        "price": 16.00,
        "image": "https://m.media-amazon.com/images/I/710+HcoP38L._SL1500_.jpg",
        "category": "Books"
    },
    {
        "id": 36,
        "name": "Espresso Machine",
        "price": 2999,
        "image": "https://www.seriouseats.com/thmb/e3XGNX1AlnHXrdxEc7s-yVPr6rQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/badge-sea-product-breville-barista-express-impress-espresso-machine-nsimpson-3341-c2258f63a2074a659f9e7bdc016f5ecf-55131e0fd1fc43b580106c53da08d84c.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 37,
        "name": "Non-Stick Cookware Set",
        "price": 1500,
        "image": "https://m.media-amazon.com/images/I/61tom4ifk+L.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 38,
        "name": "Robotic Vacuum Cleaner",
        "price": 2799,
        "image": "https://www.electrolux.com.au/globalassets/article/robotic-vacuum-cleaner-contender/robotic-contender-og.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 39,
        "name": "Air Fryer Oven",
        "price": 1150,
        "image": "https://kitchenmart.co.in/cdn/shop/products/71QljdLzDSL.jpg?v=1710049747&width=1600",
        "category": "Home & Kitchen"
    },
    {
        "id": 40,
        "name": "High-Speed Blender",
        "price": 990,
        "image": "https://m.media-amazon.com/images/I/71U8kYcxN3L._UF894,1000_QL80_.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 41,
        "name": "Scented Candle Set",
        "price": 299,
        "image": "https://imgcdn.floweraura.com/premium-aromatic-candles-set-9797877gf-A_0.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 42,
        "name": "Plush Throw Blanket",
        "price": 399,
        "image": "https://www.homemonde.in/cdn/shop/files/3_64868358-751b-4854-bd6f-96183bcd62e8.jpg?v=1755777500&width=533",
        "category": "Home & Kitchen"
    },
    {
        "id": 43,
        "name": "Knife Block Set",
        "price": 89.99,
        "image": "https://m.media-amazon.com/images/I/71u9mo+sULL._AC_SL1500_.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 44,
        "name": "Electric Kettle",
        "price": 450,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevWDAtNXOeS2A-scvpDxo1NYkzsCt5Jzk0A&s",
        "category": "Home & Kitchen"
    },
    {
        "id": 45,
        "name": "Memory Foam Pillow",
        "price": 5500,
        "image": "https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Leg-&-Lower-Pain-Relief-Memory-Foam-Pillow---HE07.jpg-1.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 46,
        "name": "Wall Art Prints (Set of 3)",
        "price": 499,
        "image": "https://icmedianew.gumlet.io/pub/media/catalog/product/cache/7c90eecf75182456ca0a208cc3917af8/i/n/india-circus-by-krsnaa-mehta-fluttering-blooms-wall-art-set-of-3-60121013sd00736-2.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 47,
        "name": "Bamboo Cutting Board",
        "price": 249,
        "image": "https://5.imimg.com/data5/SELLER/Default/2023/8/334816048/OP/DT/NB/20409023/bamboo-chopping-board.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 48,
        "name": "Smart Home Hub",
        "price": 8999,
        "image": "https://www.whichhomeautomation.com/blog/wp-content/uploads/2020/02/smart-home-hub-controller.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 49,
        "name": "Silicone Baking Mat Set",
        "price": 199,
        "image": "https://m.media-amazon.com/images/I/71TjPUw-7rL._UF894,1000_QL80_.jpg",
        "category": "Home & Kitchen"
    },
    {
        "id": 50,
        "name": "French Press Coffee Maker",
        "price": 349,
        "image": "https://www.wonderchef.com/cdn/shop/files/6802363.jpg?v=1757415264",
        "category": "Home & Kitchen"
    },
    {
        "id": 51,
        "name": "Organic Extra Virgin Olive Oil",
        "price": 199,
        "image": "https://milletamma.com/cdn/shop/products/1400x1400_43_1500x.jpg?v=1717385735",
        "category": "Groceries"
    },
    {
        "id": 52,
        "name": "Gourmet Dark Roast Coffee",
        "price": 1550,
        "image": "https://images-cdn.ubuy.co.in/64700fc3c662fe1a153fca6f-coffee-bros-dark-roast-mdash.jpg",
        "category": "Groceries"
    },
    {
        "id": 53,
        "name": "Artisanal Pasta",
        "price": 699,
        "image": "https://www.luckystore.in/cdn/shop/files/ANMARA-Artisanal-Pasta_-Gluten-Free-Fusilli_-250-g-luckystore-59854473.png?v=1752228892",
        "category": "Groceries"
    },
    {
        "id": 54,
        "name": "Assorted Herbal Tea Box",
        "price": 1200,
        "image": "https://www.teacupsfull.com/cdn/shop/products/TeaMoods155A5988a.jpg?v=1681519831",
        "category": "Groceries"
    },
    {
        "id": 55,
        "name": "Almond Flour (Gluten-Free)",
        "price": 1199,
        "image": "https://images-cdn.ubuy.co.in/651f6d5f0c13ff73d437f6a1-blue-diamond-almonds-blue-diamond-almond.jpg",
        "category": "Groceries"
    },
    {
        "id": 56,
        "name": "Himalayan Pink Salt",
        "price": 859,
        "image": "https://himalayantradingco.com/cdn/shop/articles/AdobeStock_56772592_4217x.jpeg?v=1570811791",
        "category": "Groceries"
    },
    {
        "id": 57,
        "name": "Pure Maple Syrup",
        "price": 140,
        "image": "https://www.chennaigrocers.com/cdn/shop/products/Maple-Joe-Pure-Maple-Syrup-250g.jpg?v=1661504625&width=1000",
        "category": "Groceries"
    },
    {
        "id": 58,
        "name": "Box of Protein Bars",
        "price": 249,
        "image": "https://calibar.in/cdn/shop/files/ROASTEDCOFFEE.jpg?v=1705325210",
        "category": "Groceries"
    },
    {
        "id": 59,
        "name": "Imported Balsamic Vinegar",
        "price": 199,
        "image": "https://images.jdmagicbox.com/quickquotes/images_main/heinz-vinegar-16-03-2021-086-222982466-9krgv.jpg",
        "category": "Groceries"
    },
    {
        "id": 60,
        "name": "Jar of Organic Honey",
        "price": 459,
        "image": "https://5.imimg.com/data5/ZZ/FJ/TT/ANDROID-34753369/product-jpeg-500x500.jpg",
        "category": "Groceries"
    },
    {
        "id": 61,
        "name": "Vitamin C Serum",
        "price": 220,
        "image": "https://www.sabashop.com/cdn/shop/products/yc-vitamin-c-face-serum-935329.jpg?v=1757159672&width=2048",
        "category": "Beauty"
    },
    {
        "id": 62,
        "name": "Electric Toothbrush",
        "price": 799,
        "image": "https://images.philips.com/is/image/PhilipsConsumer/HX9924_21-IMS-en_US?wid=420&hei=360&$jpglarge$",
        "category": "Beauty"
    },
    {
        "id": 63,
        "name": "Moisturizing Sunscreen SPF 50",
        "price": 160,
        "image": "https://images.ctfassets.net/f3tkdizvrgki/17lK5riiWhiQVT6IIlYALN/50e6fbf4f0da98bb34931ea66bfc7384/ntg_062600479389_ca_ultrasheer_moisturizing_sunscreen_spf_50_50ml_00180_0-fr-ca",
        "category": "Beauty"
    },
    {
        "id": 64,
        "name": "Beard Grooming Kit",
        "price": 350,
        "image": "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/APRIL/7/Oy0BIWpx_861c610b1a6a48239b6d08f56f61ddc2.jpg",
        "category": "Beauty"
    },
    {
        "id": 65,
        "name": "Hydrating Face Mask Set",
        "price": 199,
        "image": "https://freemanbeauty.com/cdn/shop/files/2619948_alt01.png?v=1708972666&width=1260",
        "category": "Beauty"
    },
    {
        "id": 66,
        "name": "Wooden Building Blocks Set",
        "price": 399,
        "image": "https://m.media-amazon.com/images/I/81iTU-npkKL.jpg",
        "category": "Toys & Games"
    },
    {
        "id": 67,
        "name": "Strategy Board Game",
        "price": 49.99,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr5fg1ewYohWmpc7Wg7_gNkzTGgjjecnb3pA&s",
        "category": "Toys & Games"
    },
    {
        "id": 68,
        "name": "Remote Control Car",
        "price": 59.99,
        "image": "https://images-cdn.ubuy.co.in/633ac133d68f75777e335e8d-miebely-remote-control-car-1-12-scale.jpg",
        "category": "Toys & Games"
    },
    {
        "id": 69,
        "name": "1000-Piece Jigsaw Puzzle",
        "price": 24.50,
        "image": "https://m.media-amazon.com/images/I/81GYCnaJTPL._UF1000,1000_QL80_.jpg",
        "category": "Toys & Games"
    },
    {
        "id": 70,
        "name": "Plush Teddy Bear",
        "price": 29.99,
        "image": "https://archiesonline.com/cdn/shop/files/8907089789852_2_1200x.jpg?v=1753948418",
        "category": "Toys & Games"
    }
];
let sellers = [
    { id: 1, name: "Admin", email: "admin@snapshop.com", password: "password123" }
];
let nextProductId = products.length + 1;

app.post('/api/sellers/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (sellers.find(seller => seller.email === email)) {
        return res.status(409).json({ message: "Seller with this email already exists" });
    }
    const newSeller = { id: sellers.length + 1, name, email, password };
    sellers.push(newSeller);
    console.log('New seller registered:', newSeller);
    res.status(201).json({ message: "Seller registered successfully" });
});

app.post('/api/sellers/login', (req, res) => {
    const { email, password } = req.body;
    const seller = sellers.find(s => s.email === email && s.password === password);
    if (seller) {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const { name, price, image, category } = req.body;
    if (!name || !price || !image || !category) {
        return res.status(400).json({ message: "Missing product data" });
    }
    const newProduct = {
        id: nextProductId++,
        name,
        price,
        image,
        category
    };
    products.push(newProduct);
    console.log('Product added:', newProduct);
    res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        const deletedProduct = products.splice(productIndex, 1);
        console.log('Product deleted:', deletedProduct);
        res.status(200).json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Snap Shop server listening at http://localhost:${PORT}`);
});