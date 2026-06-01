async function loadOrders(){

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(

            `http://localhost:8080/orders/${user.email}`
        );

    const orders =
        await response.json();

    console.log(orders);

    const container =
        document.getElementById(
            "ordersContainer"
        );

    container.innerHTML = "";

    if(orders.length === 0){

        container.innerHTML =

        `
        <h2
        style="text-align:center">

        No Orders Found

        </h2>
        `;

        return;
    }
    console.log(orders);
    console.log(typeof orders);
    orders.reverse().forEach(order => {

        let itemsHtml = "";

        order.items.forEach(item => {

            itemsHtml += `

            <div class="order-item">

                <img src="${item.image}">

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
        });

        container.innerHTML += `

        <div class="order-card">

            <div class="order-header">

                <h3>
                    Order ID:
                    ${order.id}
                </h3>

                <div class="status">

                    ${order.status}

                </div>

            </div>

            <p>

                Customer :
                ${order.customerName}

            </p>

            <p>

                Phone :
                ${order.phone}

            </p>

            <p>

                Address :
                ${order.address}

            </p>

            <p>

                Payment :
                ${order.paymentMethod}

            </p>

            <h3>

                Total :
                ₹ ${order.totalAmount}

            </h3>

            ${itemsHtml}

        </div>
        `;
    });
}

loadOrders();