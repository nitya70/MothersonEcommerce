async function register() {

    console.log("Register button clicked");

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    console.log(userData);

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        console.log("Response received");

        const data = await response.json();

        console.log(data);

        alert("Registration successful! ");
        window.location.href = "login.html";
    } catch (error) {

        console.error("ERROR:", error);

        alert("Backend connection failed");
    }
}