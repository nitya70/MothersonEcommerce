async function addToCart(productId) {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please login first");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8080/cart/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    userId: userId,
                    productId: productId,
                    quantity: 1
                })
            }
        );

        if (response.ok) {

            alert("Added to cart successfully");

        } else {

            alert("Failed to add to cart");
        }

    } catch (error) {

        console.error(error);

        alert("Error adding to cart");
    }
}