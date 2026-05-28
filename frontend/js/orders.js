async function loadOrders() {

    const userId = localStorage.getItem("userId");

    const response = await fetch(
        `http://localhost:8081/orders/${userId}`
    );

    const orders = await response.json();

    const container =
        document.getElementById("ordersContainer");

    container.innerHTML = "";

    orders.forEach(order => {

        container.innerHTML += `
            <div>

                <h3>Order ID: ${order.id}</h3>

                <p>Status: ${order.orderStatus}</p>

                <p>Total: ₹${order.totalAmount}</p>

            </div>
        `;
    });
}

loadOrders();