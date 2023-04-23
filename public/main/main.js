let body = document.querySelector(".popupScreen");
let transactionsBody = document.querySelectorAll(".transactions-body>div");
let popoutBtn = document.querySelector(".popoutBtn");
let popupBtn = document.querySelector(".popupBtn");
let addTransactions = document.querySelector(".add-transactions");
let btns = document.querySelectorAll(".transactions-head>button");

// let debtBtn =document.querySelector(".transactions-head .debtBtn");

for (let i = 0; i < btns.length-1; i++) {
    btns[i].addEventListener("click", () => {
        transactionsBody.forEach((body) => { body.style.display = "none" });
        transactionsBody[i].style.display = "block";
    })
}
popupBtn.addEventListener("click",()=>{
    body.style.backgroundColor ="rgba(0, 0, 0, 0.35)";
    body.style.display ="block";
addTransactions.style.display = "block";

})

popoutBtn.addEventListener("click",()=>{ 
addTransactions.style.display = "none";
body.style.display ="none";

});

