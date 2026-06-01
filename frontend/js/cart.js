async function loadCart(){

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if(!user){
        return;
    }

    const response =
        await fetch(
            `http://localhost:8080/cart/${user.email}`
        );

    const cartItems =
        await response.json();

    console.log(cartItems);

    const container =
        document.getElementById(
            "cartContainer"
        );

    container.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    const productResponse =
        await fetch(
            "http://localhost:8080/products/all"
        );

    const allProducts =
        await productResponse.json();

    cartItems.forEach(item => {

        const product =
            allProducts.find(

                p => String(
                    p.productid
                ) === String(
                    item.productId
                )
            );

        if(product){

            totalItems += item.quantity;

            totalPrice +=
                product.price *
                item.quantity;

            container.innerHTML += `

            <div class="cart-card">

                <img src="${product.image}">

                <div class="cart-details">

                    <h2>
                        ${product.productname}
                    </h2>

                    <div class="price">
                        ₹ ${product.price}
                    </div>

                    <div class="quantity-box">

                        <button onclick="decreaseQuantity('${item.productId}')">
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button onclick="increaseQuantity('${item.productId}')">
                            +
                        </button>

                    </div>

                    <div class="button-group">

                        <button class="remove-btn"
                                onclick="removeItem('${item.productId}')">

                            Remove

                        </button>

                        <button class="buy-btn"
                                onclick="buyNow('${item.productId}')">

                            Buy Now

                        </button>

                    </div>

                </div>

            </div>
            `;
        }
    });

    document.getElementById(
        "totalItems"
    ).innerText = totalItems;

    document.getElementById(
        "totalPrice"
    ).innerText = totalPrice;
}

function checkout() {

    window.location.href = "checkout.html";
}
async function removeItem(productId){

    await fetch(

        `http://localhost:8080/cart/remove/${productId}`,

        {
            method:"DELETE"
        }
    );

    loadCart();

    updateCartCount();
}
async function increaseQuantity(productId){

    await fetch(

        `http://localhost:8080/cart/increase/${productId}`,

        {
            method:"PUT"
        }
    );

    loadCart();
}
async function decreaseQuantity(productId){

    await fetch(

        `http://localhost:8080/cart/decrease/${productId}`,

        {
            method:"PUT"
        }
    );

    loadCart();
}
loadCart();