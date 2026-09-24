const USERS_KEY = "authSystemUsers";
const SESSION_KEY = "authSystemSession";

const currentPage = document.body.dataset.page;


function getUsers() {

    const savedUsers = localStorage.getItem(USERS_KEY);

    if (!savedUsers) {
        return [];
    }

    try {
        return JSON.parse(savedUsers);
    } catch (error) {

        console.error(
            "Unable to load users:",
            error
        );

        return [];
    }
}

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


async function hashPassword(password) {

    const encoder = new TextEncoder();

    const passwordData =
        encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            passwordData
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    const hashHex =
        hashArray
            .map(byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("");


    return hashHex;
}


function isValidPassword(password) {

    const hasMinimumLength =
        password.length >= 8;


    const hasNumber =
        /\d/.test(password);


    return hasMinimumLength && hasNumber;
}


function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(email);
}


function showMessage(
    element,
    message,
    type = "error"
) {

    if (!element) {
        return;
    }


    element.textContent = message;

    element.className =
        `form-message ${type}`;
}


function clearMessage(element) {

    if (!element) {
        return;
    }


    element.textContent = "";

    element.className =
        "form-message";
}


const passwordToggleButtons =
    document.querySelectorAll(
        "[data-toggle-password]"
    );


passwordToggleButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const inputId =
                    button.dataset.togglePassword;


                const passwordInput =
                    document.getElementById(
                        inputId
                    );


                if (!passwordInput) {
                    return;
                }


                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";

                    button.textContent =
                        "Hide";

                    button.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    passwordInput.type =
                        "password";

                    button.textContent =
                        "Show";

                    button.setAttribute(
                        "aria-label",
                        "Show password"
                    );
                }
            }
        );
    }
);


if (currentPage === "register") {

    const registerForm =
        document.getElementById(
            "register-form"
        );


    const usernameInput =
        document.getElementById(
            "register-username"
        );


    const emailInput =
        document.getElementById(
            "register-email"
        );


    const passwordInput =
        document.getElementById(
            "register-password"
        );


    const confirmPasswordInput =
        document.getElementById(
            "confirm-password"
        );


    const registerMessage =
        document.getElementById(
            "register-message"
        );


    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            clearMessage(
                registerMessage
            );


            const username =
                usernameInput.value.trim();


            const email =
                emailInput
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;


            const confirmPassword =
                confirmPasswordInput.value;


            if (
                username === "" ||
                email === "" ||
                password === "" ||
                confirmPassword === ""
            ) {

                showMessage(
                    registerMessage,
                    "Please complete all fields."
                );

                return;
            }


            if (!isValidEmail(email)) {

                showMessage(
                    registerMessage,
                    "Please enter a valid email address."
                );

                return;
            }


            if (
                !isValidPassword(password)
            ) {

                showMessage(
                    registerMessage,
                    "Password must contain at least 8 characters and at least one number."
                );

                return;
            }

            if (
                password !==
                confirmPassword
            ) {

                showMessage(
                    registerMessage,
                    "Passwords do not match."
                );

                return;
            }


            const users =
                getUsers();


            const duplicateUser =
                users.some(
                    function (user) {

                        return (
                            user.username
                                .toLowerCase() ===
                            username.toLowerCase()
                            ||
                            user.email === email
                        );
                    }
                );


            if (duplicateUser) {

                showMessage(
                    registerMessage,
                    "An account with that username or email already exists."
                );

                return;
            }

            try {

                const passwordHash =
                    await hashPassword(
                        password
                    );

                const newUser = {

                    id:
                        Date.now()
                            .toString(),

                    username:
                        username,

                    email:
                        email,

                    passwordHash:
                        passwordHash,

                    createdAt:
                        new Date()
                            .toISOString()
                };

                users.push(
                    newUser
                );


                saveUsers(
                    users
                );

                showMessage(
                    registerMessage,
                    "Account created successfully! Redirecting to login...",
                    "success"
                );


                registerForm.reset();

                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1200
                );

            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                showMessage(
                    registerMessage,
                    "Something went wrong. Please try again."
                );
            }
        }
    );
}


if (currentPage === "login") {

    const loginForm =
        document.getElementById(
            "login-form"
        );


    const identifierInput =
        document.getElementById(
            "login-identifier"
        );


    const passwordInput =
        document.getElementById(
            "login-password"
        );


    const loginMessage =
        document.getElementById(
            "login-message"
        );


    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            clearMessage(
                loginMessage
            );

            const identifier =
                identifierInput
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;

            if (
                identifier === "" ||
                password === ""
            ) {

                showMessage(
                    loginMessage,
                    "Please enter your username/email and password."
                );

                return;
            }


            const users =
                getUsers();


            try {

                const enteredPasswordHash =
                    await hashPassword(
                        password
                    );


                const user =
                    users.find(
                        function (user) {

                            const usernameMatch =
                                user.username
                                    .toLowerCase() ===
                                identifier;


                            const emailMatch =
                                user.email ===
                                identifier;


                            const passwordMatch =
                                user.passwordHash ===
                                enteredPasswordHash;


                            return (
                                (usernameMatch ||
                                    emailMatch)
                                &&
                                passwordMatch
                            );
                        }
                    );


                if (!user) {

                    showMessage(
                        loginMessage,
                        "Incorrect username/email or password."
                    );

                    return;
                }


                const session = {

                    userId:
                        user.id,

                    username:
                        user.username,

                    email:
                        user.email,

                    loggedIn:
                        true,

                    loginTime:
                        new Date()
                            .toISOString()
                };


                localStorage.setItem(
                    SESSION_KEY,
                    JSON.stringify(
                        session
                    )
                );


                showMessage(
                    loginMessage,
                    "Login successful! Redirecting...",
                    "success"
                );

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    700
                );

            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showMessage(
                    loginMessage,
                    "Something went wrong. Please try again."
                );
            }
        }
    );
}


function getSession() {

    const savedSession =
        localStorage.getItem(
            SESSION_KEY
        );


    if (!savedSession) {
        return null;
    }


    try {

        return JSON.parse(
            savedSession
        );

    } catch (error) {

        localStorage.removeItem(
            SESSION_KEY
        );


        return null;
    }
}


if (currentPage === "dashboard") {

    const session =
        getSession();


    if (
        !session ||
        session.loggedIn !== true
    ) {

        window.location.replace(
            "login.html"
        );

    } else {


        const dashboardUsername =
            document.getElementById(
                "dashboard-username"
            );


        if (dashboardUsername) {

            dashboardUsername.textContent =
                session.username;
        }


        const logoutButton =
            document.getElementById(
                "logout-btn"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                function () {

                    localStorage.removeItem(
                        SESSION_KEY
                    );

                    window.location.replace(
                        "login.html"
                    );
                }
            );
        }
    }
}