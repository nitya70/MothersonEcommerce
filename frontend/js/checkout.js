let orderItems = [];
let grandTotal = 0;

async function loadCheckout(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const mode =
        params.get("mode");

    console.log("Mode:", mode);

    if(mode === "buyNow"){

        loadBuyNowCheckout();

        return;
    }

    loadCartCheckout();
}

async function loadCartCheckout(){

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    document.getElementById("name")
        .innerText = user.name;

    document.getElementById("email")
        .innerText = user.email;

    document.getElementById("phone")
        .innerText = user.phone;

    document.getElementById("address")
        .innerText = user.address;

    const response =
        await fetch(
            `http://localhost:8080/cart/${user.email}`
        );

    const cartItems =
        await response.json();

    const productsResponse =
        await fetch(
            "http://localhost:8080/products/all"
        );

    const products =
        await productsResponse.json();

    const container =
        document.getElementById("items");

    container.innerHTML = "";

    let totalItems = 0;
    let productAmount = 0;cartItems.forEach(item => {

    const product =
        products.find(

            p =>
            String(p.productid) ===
            String(item.productId)
        );

    if(product){

        totalItems += item.quantity;

        productAmount +=
            product.price *
            item.quantity;

        orderItems.push({

            productId:
                item.productId,

            productName:
                product.productname,

            image:
                product.image,

            quantity:
                item.quantity,

            price:
                product.price
        });

        container.innerHTML += `

        <div class="cart-item">

            <img
                src="${product.image}"
                width="120">

            <div>

                <h3>
                    ${product.productname}
                </h3>

                <p>
                    ₹ ${product.price}
                </p>

                <p>
                    Quantity :
                    ${item.quantity}
                </p>

            </div>

        </div>
        `;
    }
});

grandTotal =
    productAmount + 100;

document.getElementById(
    "totalItems"
).innerText =
    totalItems;

document.getElementById(
    "productAmount"
).innerText =
    productAmount;

document.getElementById(
    "grandTotal"
).innerText =
    grandTotal;
if(response.ok){

    alert(
        "Order Placed Successfully"
    );

    updateOrderCount();

    window.location.href =
        "orders.html";
}
}


function loadBuyNowCheckout(){

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const item =
        JSON.parse(
            localStorage.getItem(
                "buyNowOrder"
            )
        );

    console.log(item);

    if(!user || !item){

        alert("Buy Now Data Missing");

        return;
    }

    document.getElementById("name")
        .innerText =
        user.name;

    document.getElementById("email")
        .innerText =
        user.email;

    document.getElementById("phone")
        .innerText =
        user.phone;

    document.getElementById("address")
        .innerText =
        user.address;

    const container =
        document.getElementById("items");

    container.innerHTML = `

    <div class="cart-item">

        <img
            src="${item.image}"
            width="120">

        <div>

            <h3>
                ${item.productName}
            </h3>

            <p>
                ₹ ${item.price}
            </p>

            <p>
                Quantity :
                ${item.quantity}
            </p>

        </div>

    </div>

    `;

    orderItems = [item];

    const productAmount =

        item.price *
        item.quantity;

    grandTotal =
        productAmount + 100;

    document.getElementById(
        "totalItems"
    ).innerText =
    item.quantity;

    document.getElementById(
        "productAmount"
    ).innerText =
    productAmount;

    document.getElementById(
        "grandTotal"
    ).innerText =
    grandTotal;
}

async function placeOrder(){

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const order = {

        userEmail:
        user.email,

        customerName:
        user.name,

        phone:
        user.phone,

        address:
        user.address,

        items:
        orderItems,

        totalAmount:
        grandTotal,

        paymentMethod:
        "COD"
    };

    const response =
        await fetch(

            "http://localhost:8080/orders/place",

            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(order)
            }
        );

    if(response.ok){

        alert(
            "Order Placed Successfully"
        );

        window.location.href =
            "orders.html";
    }
    else{

        alert(
            "Order Failed"
        );
    }
}

loadCheckout();