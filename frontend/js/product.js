// product.js

let allProducts = [];

let wishlist = JSON.parse(
    localStorage.getItem("wishlist")
) || [];

let cart = [];

// ---------------- LOAD ALL PRODUCTS ----------------
async function loadProducts() {

    try {
        const response = await fetch("http://localhost:8080/products/all");
        const products = await response.json();

        console.log(products);

        const container = document.getElementById("products");

        if (!container) return;   // 🔥 IMPORTANT FIX

        container.innerHTML = "";

        products.forEach(product => {

            const card = document.createElement("div");
            card.className = "product-card";
            const isWishlisted =
            wishlist.includes(
    String(product.productid)
)

            card.innerHTML = `

    <div class="wishlist-icon"
         onclick="toggleWishlist('${product.productid}')">

         ${isWishlisted ? "❤️" : "🤍"}

    </div>

    <img src="${product.image}" />

    <h3>${product.productname}</h3>

    <p class="price">
        ₹ ${product.price}
    </p>

    <p class="rating">
        ⭐ ${product.rating}
    </p>

    <button class="view-btn"
            onclick="viewProduct('${product.productid}')"> View Product</button>
`;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
}


// ---------------- VIEW PRODUCT ----------------
function viewProduct(productid) {
    window.location.href = "product.html?id=" + productid
}


// ---------------- LOAD SINGLE PRODUCT ----------------
async function loadProductDetails() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    if (!id) return;

    try {
        const res = await fetch("http://localhost:8080/products/" + id)
        const product = await res.json()

        if (document.getElementById("productname"))
            document.getElementById("productname").innerText = product.productname

        if (document.getElementById("price"))
            document.getElementById("price").innerText = "₹ " + product.price

        if (document.getElementById("rating"))
            document.getElementById("rating").innerText = "⭐ " + product.rating

        if (document.getElementById("image"))
            document.getElementById("image").src = product.image

        if (document.getElementById("description"))
            document.getElementById("description").innerText = product.description
        if(document.getElementById("cartBtn")){

    document.getElementById("cartBtn")
    .onclick = function(){

        addToCart(product.productid);
    };
}
    } 
    catch (error) {
        console.error("Error loading product:", error);
    }
}




// SEARCH PRODUCTS
function searchProducts() {

    const searchText =
        document.getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    console.log("Search:", searchText);

    const filteredProducts =
        allProducts.filter(product => {

            const productName =
                product.productname
                ? product.productname.toLowerCase()
                : "";

            return productName.includes(searchText);
        });

    console.log(filteredProducts);

    loadProducts(filteredProducts);
}
// FILTER PRODUCTS
function filterProducts() {

    const filterValue =
        document.getElementById("priceFilter")
        .value;

    let filteredProducts = [...allProducts];

    if(filterValue === "low") {

        filteredProducts =
            filteredProducts.filter(
                product => product.price < 500
            );
    }
    else if(filterValue === "medium") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.price >= 500 &&
                    product.price <= 2000
            );
    }
    else if(filterValue === "high") {

        filteredProducts =
            filteredProducts.filter(
                product => product.price > 2000
            );
    }

    loadProducts(filteredProducts);
}

// SORT PRODUCTS
function sortProducts() {

    const sortValue =
        document.getElementById("sortFilter")
        .value;

    let sortedProducts = [...allProducts];

    if(sortValue === "lowToHigh") {

        sortedProducts.sort(
            (a,b) => a.price - b.price
        );
    }
    else if(sortValue === "highToLow") {

        sortedProducts.sort(
            (a,b) => b.price - a.price
        );
    }

    loadProductDetails(sortedProducts);
}
//Wishlist Toggle
async function toggleWishlist(productid){

    try{

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        if(!user){

            alert("Please Login");

            return;
        }

        const wishlistItem = {

            userEmail: user.email,

            productId: String(productid)
        };
        console.log("Logged User:", user);
        console.log("Email:", user.email);

        const response =
            await fetch(

                "http://localhost:8080/wishlist/toggle",

                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify(
                        wishlistItem
                    )
                }
            );

        const message =
            await response.text();

        console.log(message);

        // ONLY CHANGE UI
        // BASED ON BACKEND RESPONSE

        if(message === "Added"){

            wishlist.push(
                String(productid)
            );
        }
        else if(message === "Removed"){

            wishlist =
                wishlist.filter(
                    id =>
                    id !== String(productid)
                );
        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        loadProducts();

        updateWishlistCount();

    }
    catch(error){

        console.log(error);
    }
}
// ADD TO CART
async function addToCart(productid){

    try{

        console.log(productid);

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        if(!user){

            alert("Please Login");

            return;
        }

        const cartItem = {

            userEmail: user.email,

            productId: String(productid),

            quantity: 1
        };

        console.log(cartItem);

       const response =
await fetch(
    "http://localhost:8080/cart/add",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(cartItem)
    }
);

const message =
await response.text();

if(message === "Already Exists"){

    alert("Product already exists in cart");

    return;
}

alert("Added To Cart");

updateCartCount();
    }
    catch(error){

        console.log(
            "Cart Error:",
            error
        );
    }
}

// PROFILE MENU
function toggleProfileMenu() {

    const menu =
        document.getElementById("profileMenu");

    if(menu.style.display === "block") {

        menu.style.display = "none";
    }
    else {

        menu.style.display = "block";
    }
}
function logoutUser() {

    // clear storage if used
    localStorage.clear();
    sessionStorage.clear();

    alert("Logout Successful");

    // navigate to register/login page
    window.location.href = "login.html";
}
function openProfilePage() {

    window.location.href =
        "profile.html";
}
function openWishlistPage() {

    window.location.href =
        "wishlist.html";
}

function openOrdersPage() {

    window.location.href =
        "orders.html";
}
function buyNow(productid) {

    const product =
        allProducts.find(
            p => p.productid === productid
        );

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    orders.push(product);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    alert("Order Placed Successfully");
}
function updateWishlistCount(){

    const count =
        document.getElementById(
            "wishlistCount"
        );

    if(count){

        count.innerText =
            wishlist.length;
    }
}

async function buyNow(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        params.get("id");

    const response =
        await fetch(

            `http://localhost:8080/products/${productId}`
        );

    const product =
        await response.json();

    localStorage.setItem(

        "buyNowProduct",

        JSON.stringify(product)
    );

    window.location.href =
        "buy.html";
}
// LOAD PRODUCTS WHEN PAGE OPENS
loadProducts();
