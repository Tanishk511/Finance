/*
let sumbittedGoals = document.querySelectorAll(".submittedGoal");
let totalGoals = document.querySelectorAll(".totalGoal");
let removeGoalBtns = document.querySelectorAll(".removeGoal");

for (let i = 0; i < removeGoalBtns.length; i++) {
    removeGoalBtns[i].addEventListener("click", () => {
        if (parseInt(totalGoals[i].innerHTML) > parseInt(sumbittedGoals[i].innerHTML)) {
            sumbittedGoals[i].innerHTML = parseInt(sumbittedGoals[i].innerHTML) + 1;
        }
    })
}*/

let body = document.querySelector(".popupScreen");
let popoutBtn = document.querySelector(".popoutBtn");
let popupBtn = document.querySelector(".popupBtn");
let addTransactions = document.querySelector(".add-transactions");


// let debtBtn =document.querySelector(".transactions-head .debtBtn");

popupBtn.addEventListener("click",()=>{
    body.style.backgroundColor ="rgba(0, 0, 0, 0.35)";
    body.style.display ="block";
addTransactions.style.display = "block";

})

popoutBtn.addEventListener("click",()=>{ 
addTransactions.style.display = "none";
body.style.display ="none";

});
