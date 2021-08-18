function reverseStr(str) {
  var reversedStr = str.split("").reverse().join("");
  return reversedStr;
}

var isPalindrome = (str) => {
  var stringReversed = reverseStr(str);
  return str === stringReversed;
};

var convertDateToString = (date) => {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
};

var getAllDateFormats = (date) => {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

var checkWetherPalindromeOrNot = (date) => {
  var listOfDateFormats = getAllDateFormats(date);
  var flag = false;

  for (let i = 0; i < listOfDateFormats.length; i++) {
    if (isPalindrome(listOfDateFormats[i])) {
      flag = true;
      break;
    }
  }

  return flag;
};

var isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
};

var getNextDate = (date) => {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // for day, year and leap year
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  // for month
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

var getNextPalindrome = (date) => {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkWetherPalindromeOrNot(nextDate);
    if (isPalindrome) {
      break;
    }

    nextDate = getNextDate(nextDate);
  }

  return [ctr, nextDate];
};

var dateInput = document.getElementById("birth-date");
var submitBtn = document.getElementById("submit-button");
var result = document.getElementById("result");

result.style.display = "none";


var clickHandler = (e) => {
  var bdayStr = dateInput.value;

  if (bdayStr !== "") {
    result.style.display = "block";
    var listOfDate = bdayStr.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
  }

  var isPalindrome = checkWetherPalindromeOrNot(date);

  if (isPalindrome) {
    result.innerText = "Yay!, your birthday is a palindrome";
  } else {
    var [ctr, nextDate] = getNextPalindrome(date);
    result.innerText = `Sorry, your birthday is not a palindrome! The next palindrome is in ${ctr} days on ${nextDate.day}-${nextDate.month}-${nextDate.year}`;
  }
};

submitBtn.addEventListener("click", clickHandler);
