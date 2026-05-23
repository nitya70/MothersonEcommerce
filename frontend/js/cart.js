async function loadCart() {

    const userId = localStorage.getItem("userId");

    const response = await fetch(
        `http://localhost:8080/cart/${userId}`
    );

    const cart = await response.json();

    const container = document.getElementById("cartContainer");

    container.innerHTML = "";

    cart.products.forEach(product => {

        container.innerHTML += `
            <div>
                <img src="${product.imageUrl}" width="100">

                <h3>${product.productName}</h3>

                <p>Price: ₹${product.price}</p>

                <p>Quantity: ${product.quantity}</p>

                <button onclick="removeItem('${product.productId}')">
                    Remove
                </button>
            </div>
        `;
    });
}

async function removeItem(productId) {

    await fetch(
        `http://localhost:8080/cart/remove/${productId}`,
        {
            method: "DELETE"
        }
    );

    loadCart();
}

function checkout() {

    window.location.href = "checkout.html";
}

loadCart();