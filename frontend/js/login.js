async function login() {

    console.log("Login started");

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    console.log(email, password);

    try {

        console.log("Sending request...");

        const response = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        console.log("Response received");

        if(response.ok) {

            alert("Login Successful");

            // redirect to products page
            window.location.href = "products.html";
        }
        else {

            alert("Wrong Email or Password");
        }

    }
    catch(error) {

        console.log("ERROR:", error);

        alert("Backend Connection Failed");
    }
}