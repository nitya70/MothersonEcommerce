async function loadWishlist(){

    try{

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        if(!user){

            alert("Please Login");

            return;
        }

        const response =
            await fetch(

                `http://localhost:8080/wishlist/${user.email}`
            );

        const wishlistItems =
            await response.json();

        const productResponse =
            await fetch(

                "http://localhost:8080/products/all"
            );

        const allProducts =
            await productResponse.json();

        const container =
            document.getElementById(
                "wishlistContainer"
            );

        container.innerHTML = "";

        if(wishlistItems.length === 0){

            container.innerHTML = `

                <div class="empty">

                    Wishlist Empty

                </div>
            `;

            return;
        }

        wishlistItems.forEach(item => {

            const product =
                allProducts.find(

                    p =>
                    String(p.productid)
                    ===
                    String(item.productId)
                );

            if(product){

                container.innerHTML += `

                <div class="wishlist-card">

                    <img src="${product.image}">

                    <div class="wishlist-details">

                        <h2>
                            ${product.productname}
                        </h2>

                        <div class="price">
                            ₹ ${product.price}
                        </div>

                        <div class="rating">
                            ⭐ ${product.rating}
                        </div>

                    </div>

                    <div class="button-group">

                        <button class="view-btn"
                                onclick="viewProduct('${product.productid}')">

                            View Product

                        </button>

                        <button class="cart-btn"
                                onclick="addToCart('${product.productid}')">

                            Add To Cart

                        </button>

                    </div>

                </div>
                `;
            }
        });

    }
    catch(error){

        console.log(error);
    }
}

loadWishlist();