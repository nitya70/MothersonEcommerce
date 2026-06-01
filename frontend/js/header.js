function toggleProfileMenu(){

    const menu =
        document.getElementById("profileMenu");

    if(menu.style.display === "block"){

        menu.style.display = "none";
    }
    else{

        menu.style.display = "block";
    }
}
window.openWishlistPage = function () {
    window.location.href = "wishlist.html";
};

function openProfilePage(){

    window.location.href =
        "profile.html";
}

function openOrdersPage(){

    window.location.href =
        "orders.html";
}

function openCartPage(){

    window.location.href =
        "cart.html";
}

function goToProducts(){

    window.location.href =
        "products.html";
}
async function updateCartCount(){

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if(!user){

        return;
    }

    try{

        /* CART COUNT */

        const cartResponse =
            await fetch(

                `http://localhost:8080/cart/count/${user.email}`
            );

        const cartCount =
            await cartResponse.text();

        document.getElementById(
            "cartCount"
        ).innerText = cartCount;    

    }
    catch(error){

        console.log(error);
    }
}
async function updateWishlistCount(){

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if(!user){

        return;
    }

    try{

        const response =
            await fetch(

                `http://localhost:8080/wishlist/count/${user.email}`
            );

        const count =
            await response.text();

        document.getElementById(
            "wishlistCount"
        ).innerText = count;
    }
    catch(error){

        console.log(error);
    }
    
}