
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

            card.innerHTML = `
                <img src="${product.image}" />
                <h3>${product.productname}</h3>
                <p class="price">₹ ${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
                <button onclick="viewProduct('${product.productid}')">View Product</button>
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

    } catch (error) {
        console.error("Error loading product:", error);
    }
}
