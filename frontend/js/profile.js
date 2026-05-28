// LOAD USER DETAILS

async function loadProfile(){

    try{

        const user =
            JSON.parse(
                localStorage.getItem("user")
                
            );
            console.log(localStorage.getItem("user"));
        if(!user){

            alert("Please Login");

            window.location.href =
                "login.html";

            return;
        }

        document.getElementById("name")
                .value =
                user.name || "";

        document.getElementById("email")
                .value =
                user.email || "";

        document.getElementById("phone")
                .value =
                user.phone || "";

        document.getElementById("address")
                .value =
                user.address || "";
    }
    catch(error){

        console.log(error);

        alert("Failed To Load Profile");
    }
}

/* UPDATE PROFILE */

async function saveProfile(){

    try{

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        const updatedUser = {

            id:user.id,

            name:user.name,

            email:user.email,

            password:user.password,

            phone:
                document.getElementById("phone")
                        .value,

            address:
                document.getElementById("address")
                        .value
        };

        const response = await fetch(

            "http://localhost:8080/api/auth/update",

            {
                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify(updatedUser)
            }
        );

        if(!response.ok){

            throw new Error(
                "Update Failed"
            );
        }

        const savedUser =
            await response.json();

        localStorage.setItem(
            "user",
            JSON.stringify(savedUser)
        );

        alert("Profile Updated");
    }
    catch(error){

        console.log(error);

        alert("Unable To Update");
    }
}

/* LOAD PROFILE */

loadProfile();