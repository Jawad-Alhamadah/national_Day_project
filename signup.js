let passwordInput = document.getElementById("password-input")
let passwordReInput = document.getElementById("password-re-input")
let emailInput = document.getElementById("email-input")
let emailReInput = document.getElementById("email-re-input")
let signup_btn = document.getElementById("signup-btn")
let usernameInput = document.getElementById("username-input")
let nav_login = document.getElementById("nav-login")

let login_username = document.getElementById("login-username")
let login_password = document.getElementById("login-password")

let login_btn = document.getElementById("login-btn")
let play_btn = document.getElementById("pickmode")


signup_btn.addEventListener("click", e => {
    e.preventDefault()
    let usernameLength = 6
    let passwordRequiedLength = 6
    let isPasswordTooShort = !(passwordInput.value.length >= passwordRequiedLength) ||
        !(passwordReInput.value.length >= passwordRequiedLength)

    let isUsernameTooShort = !(usernameInput.value.length >= usernameLength)

    let allfieldsFull = usernameInput.value === "" || emailInput.value === "" || emailReInput.value === ""
        || passwordInput.value === "" || passwordReInput.value === ""
    if (allfieldsFull) {
        Swal.fire({
            icon: "error",
            title: "Sign Up failed!",
            text: "make sure all fields are filled",
        });
        return
    }


    if (isUsernameTooShort) {
        Swal.fire({
            icon: "error",
            title: "Sign Up failed!",
            text: `Username Must be longer than ${usernameLength} letters`,
        });
        return
    }


    if (isPasswordTooShort) {
        Swal.fire({
            icon: "error",
            title: "Sign Up failed!",
            text: `Your password must be atleast ${passwordRequiedLength} numbers`,
        });
        return

    }

    if (passwordInput.value !== passwordReInput.value) {
        Swal.fire({
            icon: "error",
            title: "Sign Up failed!",
            text: "passwords don't match",
        });
        return

    }

    let isValidEmail = String(emailInput.value).toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (!isValidEmail) {
        Swal.fire({
            icon: "error",
            title: "Sign Up failed!",
            text: "invalid email. Make sure your email is valid",
        });
        return
    }

    if (emailInput.value !== emailReInput.value) {
        Swal.fire({
            icon: "error",
            title: "Sign Up failed!",
            text: "emails don't match",
        });
        return
    }

    fetch(`https://66ed37a9380821644cdbfeb4.mockapi.io/users?username=${usernameInput.value}`)
        .then(res => res.json())
        .then(data => {
           
            if (data.length <= 0 || data === "Not found") {
                fetch(`https://66ed37a9380821644cdbfeb4.mockapi.io/users?email=${emailInput.value}`)
                    .then(res_in => res_in.json())
                    .then(data_in => {
                       
                        if (data_in.length <= 0 || data_in === "Not found") {
                            fetch(`https://66ed37a9380821644cdbfeb4.mockapi.io/users`, {
                                method: "POST",
                                body: JSON.stringify({
                                    username: usernameInput.value,
                                    password: passwordInput.value,
                                    email: emailInput.value
                                }),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                },
                            })
                                .then(res_in_2 => res_in_2.json())
                                .then(data_in_2 => {
                                    
                                    localStorage.setItem("username", data_in_2.username)
                                    localStorage.setItem("email", data_in_2.email)
                                    localStorage.setItem("user_id", data_in_2.id)

                                    Swal.fire({
                                        icon: "success",
                                        title: "SignUp Successful!",

                                    }).then(res => document.getElementById("pickmode").click())


                                })
                            return
                        }

                        Swal.fire({
                            icon: "error",
                            title: "User Sign Up failed!",
                            text: "Email already used",
                        });
                        return


                    })

                return
            }
            else {

                Swal.fire({
                    icon: "error",
                    title: "User Sign Up failed!",
                    text: "Username Already Exists",
                });
                return
            }


        })



})

login_btn.addEventListener("click", e => {
    e.preventDefault()

    if (login_password.value.length <= 0) {
        Swal.fire({
            icon: "error",
            title: "Login failed",
            text: "Password field is empty",
        });
        return

    }

    if (login_username.value.length <= 0) {
        Swal.fire({
            icon: "error",
            title: "Login failed",
            text: "Email field is empty",
        });
        return

    }

    fetch(`https://66ed37a9380821644cdbfeb4.mockapi.io/users?username=${login_username.value}`)
        .then(res => res.json())
        .then(data => {
           
            if (data === undefined || data == "Not found" || data.length <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Login failed",
                    text: "User not found",
                });
                return

            }

            if (data[0].password !== login_password.value) {
                Swal.fire({
                    icon: "error",
                    title: "incorrect password",

                });
                return

            }

            localStorage.setItem("username", data[0].username)
            localStorage.setItem("email", data[0].email)
            localStorage.setItem("user_id", data[0].id)
            play_btn.click()

        })

})

