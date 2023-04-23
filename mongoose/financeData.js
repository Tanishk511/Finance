const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Finance', { useNewUrlParser: true }).
    then(function () { console.log('Connection !!!!') });

const financeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    id: {
        type: String
    },
    income: {
        type: Number
    },
    expense: {
        type: Number
    },
    balance: {
        type: Number
    },
    debt: {
        type: Number
    },
    Tracker: {
        type: [Object]
    },
    TrackerDates: {
        type: [Object]
    },
    TrackerNature: {
        type: [Object]
    },
    monthExpenseTracker: {
        type: Object
    },
    monthIncomeTracker:{
        type:Object
    },
    debtTracker: {
        type: [Object]
    },
    debtTrackerDates: {
        type: [String]
    },
    goalsTracker:{
        type:[Object]
    },
    goalsTrackerDates:{
        type:[String]
    },
    goalsCompleteDate:{
        type:Object
    }

});

const Finance = mongoose.model("Finance", financeSchema);

const saveData = async () => {
    const yash = new Finance({
        name: 'Ollie', id: "ddd", income: 6000, expense: 1500, balance: 3000, debt: 1500,
        Tracker:[ { food: 500}, {rent: 1000},{ salary: 5000}, {remmiter: 1000 }],
        TrackerDates:[ { food: "14/02/2024"},{ rent: "15/02/2024"}, {salary: "16/02/2024"},{ remmiter: "18/02/2024" }],
        TrackerNature: [{ food: "expense"}, {rent: "expense"},{ salary: "income"}, {remmiter: "income" },],
        monthExpenseTracker: { 1: 0, 2: 1500, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 },
        monthIncomeTracker: { 1: 0, 2: 1500, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 },
        debtTracker:[{ cars: 500},{ loan: 1000}], debtTrackerDates: ["15/02/2025", "15/02/2025"],
       goalsTracker:[{ bike: 5000},{home: 50000}],goalsTrackerDates: ["18/08/2023","18/08/2024"],goalsCompleteDate:{01:15,02:50}
    });
    await yash.save().then((doc) => {
        console.log(doc);
    })
};
//saveData();
module.exports = Finance;
