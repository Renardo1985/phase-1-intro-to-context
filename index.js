function createEmployeeRecord(eArray){
   
    const employee = {}
    employee.firstName = eArray[0];
    employee.familyName = eArray[1];
    employee.title = eArray[2];
    employee.payPerHour = eArray[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
}

function createEmployeeRecords(arrs){
const employeeArray = [];
    for (let i = 0; i < arrs.length; i++){
        employeeArray[i] = createEmployeeRecord(arrs[i])
    }
    return employeeArray;
}

function createTimeInEvent(eObj,timeString){
    const punch = {};
    punch.type = "TimeIn";
    punch.hour = parseInt(timeString.split(' ')[1]);
    punch.date = timeString.split(' ')[0];
    eObj.timeInEvents.push(punch)
    return eObj;
}

function createTimeOutEvent(eObj,timeString){
    const punch = {};
    punch.type = "TimeOut";
    punch.hour = parseInt(timeString.split(' ')[1]);
    punch.date = timeString.split(' ')[0];
    eObj.timeOutEvents.push(punch)
    return eObj;
}

function hoursWorkedOnDate(eObj,date){
    const startTime = eObj.timeInEvents.find(time =>time.date===date).hour/100;
    const endTime = eObj.timeOutEvents.find(time =>time.date===date).hour/100;

    return endTime - startTime;
}
function wagesEarnedOnDate(eObj, date){
    const hours = hoursWorkedOnDate(eObj,date);
    const pay = hours*eObj.payPerHour;
    return pay;
}
function allWagesFor (eObj) 
{
    const dates = eObj.timeInEvents.map(function(e){return e.date});    
    const pay = dates.reduce(function (memo, d) {return memo + wagesEarnedOnDate(eObj, d)}, 0)
    return pay;
}


 function calculatePayroll(eObj){
    let payroll = eObj.reduce(function(memo,eObj){
       return memo+allWagesFor(eObj)
   },0)
   return payroll;
 }