let product;
let quantity = 1;

function loadProduct(){

    product =
        JSON.parse(
            localStorage.getItem(
                "buyNowProduct"
            )
        );

    console.log(product);

    if(!product){

        alert("Product Not Found");

        window.location.href =
            "products.html";

        return;
    }

    document.getElementById(
        "image"
    ).src =
    product.image;

    document.getElementById(
        "name"
    ).innerText =
    product.productname;

    document.getElementById(
        "price"
    ).innerText =
    "₹ " + product.price;

    updateTotal();
}

function updateTotal(){

    document.getElementById(
        "qty"
    ).innerText =
    quantity;

    document.getElementById(
        "total"
    ).innerText =
    product.price * quantity;
}

function increaseQty(){

    quantity++;

    updateTotal();
}

function decreaseQty(){

    if(quantity > 1){

        quantity--;

        updateTotal();
    }
}

function proceedCheckout(){

    const buyNowOrder = {

        productId:
        product.productid,

        productName:
        product.productname,

        image:
        product.image,

        price:
        product.price,

        quantity:
        quantity
    };

    localStorage.setItem(

        "buyNowOrder",

        JSON.stringify(
            buyNowOrder
        )
    );

    window.location.href =
        "checkout.html?mode=buyNow";
}

loadProduct();