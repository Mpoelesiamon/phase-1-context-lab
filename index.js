// Function to create an employee record
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to create a time-in event for an employee
function createTimeInEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    });
    return employee;
}

// Function to create a time-out event for an employee
function createTimeOutEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

// Function to find an employee by their first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

// Your code and solution go here...

/* 
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);

    return payable;
};