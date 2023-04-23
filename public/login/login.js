const registerBtns = document.querySelectorAll(".register-btn");
const loginBtns = document.querySelectorAll(".login-btn");
const gif = document.querySelector(".gif img");
const login = document.querySelector(".form .login-btn");

const moveLeft = ()=>{
gif.classList.remove("moveRight");
gif.classList.add("moveLeft");
console.log("a");
};

const moveRight = ()=>{
gif.classList.remove("moveLeft");
gif.classList.add("moveRight");
};


loginBtns[0].addEventListener("click",moveRight);
registerBtns[1].addEventListener("click",moveLeft);


