const express = require('express');
const ExpressError = require('./expressError')

const app = express();

function changeToNums(req, res, next) {
    try {
        let nums = req.query.nums;
        if (!nums) throw new ExpressError(`nums are required`, 400)
        let arr = nums.split(",")
        let numArr = []

        for (let i = 0; i < arr.length; i++) {
            if (isNaN(arr[i])) throw new ExpressError(`${arr[i]} is not a number`, 400)
            else {
                numArr.push(Number(arr[i]))
            }
        }
        return numArr
    } catch (e) {
        next(e)
    }
}

function getMean(arr) {
    let length = arr.length
    let sum = arr.reduce((acc, curr) => {
        return acc + curr
    })
    return sum / length
}

app.get("/mean", (req, res, next) => {
    const numArr = changeToNums(req, res, next)
    let mean = getMean(numArr)

    return res.json({ response: { operation: "mean", value: mean } })

})

app.get("/median", (req, res, next) => {
    const numArr = changeToNums(req, res, next)
    let median;
    numArr.sort((a, b) => a - b);
    let indx = Math.floor(numArr.length / 2)
    if (numArr.length % 2 == 1) median = numArr[indx]
    else median = getMean([numArr[indx], numArr[indx - 1]])
    return res.json({ response: { operation: "median", value: median } })
})

app.get("/mode", (req, res, next) => {
    const numArr = changeToNums(req, res, next)
    let object = {}
    for (let i = 0; i < numArr.length; i++) {
        object[numArr[i]] ? object[numArr[i]]++ : object[numArr[i]] = 1
    }
    let biggestVal = 0;
    let biggestKey = 0;
    Object.keys(object).forEach(key => {
        let value = object[key]
        if (value > biggestVal) {
            biggestVal = value
            biggestKey = key
        }
    })

    return res.json({ response: { operation: "mode", value: biggestKey } })
})

// If no other route matches, respond with a 404
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

// Error handler
app.use(function (err, req, res, next) { //Note the 4 parameters!
    // the default status is 500 Internal Server Error

    let status = err.status || 500;
    let message = err.msg;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
});




