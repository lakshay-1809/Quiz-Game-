// Animation of the login and register form
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

// Authentification
let username = document.querySelector(".sign-up-name");
let email = document.querySelector(".sign-up-email");
let password = document.querySelector(".sign-up-password");
let register = document.querySelector(".sign-up-btn");

let loginEmail = document.querySelector(".login-email");
let loginPassword = document.querySelector(".login-password");
let login = document.querySelector(".login-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let char =
    " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
let key =
    " lhsuEtfgprimnoaywxBCDGJKLNOPQRTVWXYZ0235678941#%$&'()*+,-./:;<=>?@[]^_`{|}~";
let charArray = char.split("");
let keyArray = key.split("");

register.addEventListener("click", () => {
    let cypherText = "";
    let encrypt = (text) => {
        for (const letter of text) {
            let key = charArray.indexOf(letter);
            cypherText += keyArray[key];
        }
        return cypherText;
    };
    let encryptPassword = encrypt(password.value);
    let user = {
        username: username.value,
        email: email.value,
        password: encryptPassword,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users)); 
    username.value = "";
    email.value = "";
    password.value = "";
});

login.addEventListener("click", () => {
    let normalText = "";
    let decrypt = (text) => {
        for (const letter of text) {
            let key = keyArray.indexOf(letter);
            normalText += charArray[key];
        }
        return normalText;
    };
    let user = users.find((user) => user.email === loginEmail.value);
    if (user) {
        let password = decrypt(user.password);
        if (loginPassword.value === password) {
            alert("Login Successful");
        } else {
            alert("Login Failed");
        }
    } else {
        alert("User not found");
    }
    loginEmail.value = "";
    loginPassword.value = "";
});