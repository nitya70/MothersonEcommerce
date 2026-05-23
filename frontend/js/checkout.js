document.getElementById("checkoutForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const customerDetails = {

        fullName: document.getElementById("fullName").value,

        email: document.getElementById("email").value,

        phoneNumber: document.getElementById("phoneNumber").value,

        addressLine1: document.getElementById("addressLine1").value,

        city: document.getElementById("city").value,

        state: document.getElementById("state").value,

        pincode: document.getElementById("pincode").value,

        country: "India"
    };

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    const response = await fetch(
        "http://localhost:8080/orders/place",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                userId: userId,

                customerDetails: customerDetails,

                paymentMethod: paymentMethod
            })
        }
    );

    const data = await response.json();

    alert("Order placed successfully");

    window.location.href = "orders.html";
});