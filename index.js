//const chartData = [12, 19, 3, 5, 2, 3];
const express = require('express');
const app = express();
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const Finance = require("./mongoose/financeData.js");

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let data, debt, debtDates, all, allDates;
let expenses = expensesDates = incomes = incomeDates = [];

async function sort(allDates) {
    for (let i = 0; i < allDates.length; i++) {
        for (let j = i; j < allDates.length; j++) {
            if (Object.values(allDates[i])[0].slice(6) === Object.values(allDates[j])[0].slice(6)) {

                if (Object.values(allDates[i])[0].slice(3, 5) == Object.values(allDates[j])[0].slice(3, 5)) {
                    if (Object.values(allDates[i])[0].slice(0, 2) < Object.values(allDates[j])[0].slice(0, 2)) {
                        [allDates[i], allDates[j]] = [allDates[j], allDates[i]];
                    }
                }

                else if (Object.values(allDates[i])[0].slice(3, 5) < Object.values(allDates[j])[0].slice(3, 5)) {
                    [allDates[i], allDates[j]] = [allDates[j], allDates[i]];
                }
            }
            else if (Object.values(allDates[i])[0].slice(6) < Object.values(allDates[j])[0].slice(6)) {
                [allDates[i], allDates[j]] = [allDates[j], allDates[i]];
            }
        }

    }

    await Finance.updateOne({ TrackerDates: data.TrackerDates }, { $set: { TrackerDates: allDates } });
};


async function sortData(allDates, all) {
    for (let i = 0; i < allDates.length; i++) {
        for (let j = 0; j < allDates.length; j++) {
            if (Object.keys(allDates[i])[0] == Object.keys(all[j])[0]) {
                [all[i], all[j]] = [all[j], all[i]];
            }
        }
    }
    await Finance.updateOne({ Tracker: data.Tracker }, { $set: { Tracker: all } });

}


function expenseArray(all, allDates, Nature) {

    let trackNature = Nature;
    incomes = incomeDate = expenses = expensesDates = [];



    allDates.forEach((data) => {
        trackNature.forEach((t) => {
            if (Object.keys(t)[0] == Object.keys(data)[0]) {
                if (Object.values(t)[0] == "expense") {
                    expensesDates = [...expensesDates, data];
                }
                else if (Object.values(t)[0] == "income") {
                    incomeDates = [...incomeDates, data];
                }
            }
        })
    })
    all.forEach((data) => {
        trackNature.forEach((t) => {
            if (Object.keys(t)[0] == Object.keys(data)[0]) {
                if (Object.values(t)[0] == "expense") {
                    expenses = [...expenses, data];
                }
                else if (Object.values(t)[0] == "income") {
                    incomes = [...incomes, data];
                }
            }
        })
    })

}


app.listen("3000", () => {
    console.log("Port is running");
})

app.get("/", (req, res) => {
    res.render("./login/login");
})

app.post("/", (req, res) => {
    res.redirect("/main");
})



app.get("/main", async (req, res) => {
    data = await Finance.findOne({ id: "ddd" });;
    allDates = data.TrackerDates;
    all = data.Tracker;
    trackerNature = data.TrackerNature;
    debt = data.debtTracker;
    debtDates = data.debtTrackerDates;

    sort(allDates);
    sortData(allDates, all);
    sortData(allDates, trackerNature);
    expenseArray(all, allDates, data.TrackerNature);
    console.log(data);
    res.render("./main/main", { data, all, allDates, expense: data.income, expenses, expensesDates, income: data.income, incomes, incomeDates, debt, debtDates, trackerNature });

})

app.post("/main", async (req, res) => {
    data = await Finance.findOne({ id: "ddd" });

    let expenseAmount, incomeAmount;
    let { description, amount, date, nature } = req.body;
    x = date.split('-');
    date = x[2] + '/' + x[1] + '/' + x[0];
    if (nature == "expense") {
        Object.keys(data.monthExpenseTracker).forEach((month) => {
            if (parseInt(month) == parseInt(x[1])) {
                expenseAmount = parseInt(data.monthExpenseTracker[month]) + parseInt(amount);
            }
        })

    }
    else if (nature == "income") {
        Object.keys(data.monthIncomeTracker).forEach((month) => {
            if (parseInt(month) == parseInt(x[1])) {
                incomeAmount = parseInt(data.monthIncomeTracker[month]) + parseInt(amount);
            }
        })

    }

    await Finance.updateOne({ Tracker: data.Tracker }, { $set: { Tracker: [...data.Tracker, { [description]: parseInt(amount) }] } });
    await Finance.updateOne({ TrackerDates: data.TrackerDates }, { $set: { TrackerDates: [...data.TrackerDates, { [description]: date }] } });
    await Finance.updateOne({ TrackerNature: data.TrackerNature }, { $set: { TrackerNature: [...data.TrackerNature, { [description]: nature }] } });
    await Finance.updateOne({ income: data.income }, { $set: { income: incomeAmount } });
    await Finance.updateOne({ expense: data.expense }, { $set: { expense: expenseAmount } });

    if (nature == "expense") {
        Object.keys(data.monthExpenseTracker).forEach(async (month) => {
            data = await Finance.findOne({ id: "ddd" });

            if (month == parseInt(x[1])) {

                await Finance.updateOne({ monthExpenseTracker: data.monthExpenseTracker }, { $set: { monthExpenseTracker: { ...data.monthExpenseTracker, [month]: expenseAmount } } });
            }
        })
    }
    else if (nature == "income") {
        Object.keys(data.monthIncomeTracker).forEach(async (month) => {
            data = await Finance.findOne({ id: "ddd" });

            if (month == parseInt(x[1])) {

                await Finance.updateOne({ monthIncomeTracker: data.monthIncomeTracker }, { $set: { monthIncomeTracker: { ...data.monthIncomeTracker, [month]: incomeAmount } } });
            }
        })
    }

    res.redirect("/main");
});

app.get("/main/budget", async (req, res) => {
    const d = new Date();
    let dname = month[d.getMonth()];

    data = await Finance.findOne({ id: "ddd" });
    console.log(data)
    res.render("./goals/goals.ejs", { data, dname });
});

app.put("/main/budget", async (req, res) => {
    data = await Finance.findOne({ id: "ddd" });

    // let newMonthDates=data.goalsCompleteDate;
    let newMonthDate = Object.values(req.body)[0];
    let index = Object.keys(req.body)[0].slice(12);
    let { description, amount, date, nature } = req.body;

    Object.keys(data.goalsCompleteDate).forEach(async (month) => {
        data = await Finance.findOne({ id: "ddd" });
        console.log(month);
        console.log(index);
        if (parseInt(month) == parseInt(index)) {
            await Finance.updateOne({ goalsCompleteDate: data.goalsCompleteDate }, { $set: { goalsCompleteDate: { ...data.goalsCompleteDate, [month]: newMonthDate } } });
            await Finance.updateOne({ Tracker: data.Tracker }, { $set: { Tracker: [...data.Tracker, { [description]: parseInt(amount) }] } });
            await Finance.updateOne({ TrackerDates: data.TrackerDates }, { $set: { TrackerDates: [...data.TrackerDates, { [description]: date }] } });
            await Finance.updateOne({ TrackerNature: data.TrackerNature }, { $set: { TrackerNature: [...data.TrackerNature, { [description]: nature }] } });
        }
    })

    console.log(data);
    res.redirect("/main/budget");
});

app.post("/main/budget", async (req, res) => {
    data = await Finance.findOne({ id: "ddd" });
    let key = data.goalsTracker.length;
    let { description, amount, month,date } = req.body;
    console.log(req.body);
    x = date.split('-');
    date = x[2] + '/' + x[1] + '/' + x[0];
    console.log(description, amount, date, month);
 /*   await Finance.updateOne({ goalsCompleteDate: data.goalsCompleteDate }, { $set: { goalsCompleteDate: { ...data.goalsCompleteDate, [key]: month } } });
    await Finance.updateOne({ goalsTracker: data.goalsTracker }, { $set: { goalsTracker: [...data.goalsTracker, { [description]: parseInt(amount) }] } });
    await Finance.updateOne({ goalsTrackerDates: data.goalsTrackerDates }, { $set: { goalsTrackerDates: [...data.goalsTrackerDates, { [description]: date }] } });
*/
})