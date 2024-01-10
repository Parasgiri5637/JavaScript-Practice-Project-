"use strict";

// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2022-11-22T04:11:59.604Z",
    "2022-11-23T17:01:17.194Z",
    "2022-11-24T23:36:17.929Z",
    "2022-11-25T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "en-IN",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2022-21-05T13:15:33.035Z",
    "2022-18-30T09:48:16.867Z",
    "2022-12-05T06:04:23.907Z",
    "2020-08-25T14:18:46.235Z",
    "2020-09-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-09-25T18:49:59.371Z",
    "2020-21-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2021-22-05T13:15:33.035Z",
    "2021-19-30T09:48:16.867Z",
    "2021-13-05T06:04:23.907Z",
    "2020-09-25T14:18:46.235Z",
    "2020-10-05T16:33:06.386Z",
    "2020-05-10T14:43:26.374Z",
    "2019-10-25T18:49:59.371Z",
    "2019-23-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//? ----------------------------------------- Formate Currency

const formate_Currency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

//? ------------------------------------------ Formate Movements Dates

const formate_Move_Date = (date, locale) => {
  const calc_days_Passed = (date1, date2) =>
    Math.round(Math.abs((date1 - date2) / (24 * 60 * 60 * 1000)));

  const passDays = calc_days_Passed(new Date(), date);
  if (passDays === 0) return "Today";
  if (passDays === 1) return "Yesterday";
  if (passDays <= 7) return `${passDays} days ago`;
  else {
    const fdate = new Intl.DateTimeFormat(locale).format(date);
    return fdate;
  }
};

//? --------------------------------------------- Display Movements

const display_Movements = (acct, sort = false) => {
  containerMovements.textContent = "";
  const moves = sort
    ? acct.movements.slice().sort((a, b) => a - b)
    : acct.movements;
  moves.forEach((move, i) => {
    const type = move > 0 ? "deposit" : "withdrawal";

    const date = new Date(acct.movementsDates[i]);
    const display_date = formate_Move_Date(date, acct.locale);

    const display_move = formate_Currency(move, acct.locale, acct.currency);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${display_date}</div>
    <div class="movements__value">${display_move}</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//? ------------------------------- Sorting Movements

let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault;
  display_Movements(current_Account, !sorted);
  sorted = !sorted;
});

// display_Movements(account1.movements);

//? --------------------------------------------- Display Totale Balance

const total_Balance = (acct) => {
  acct.balance = acct.movements.reduce((accu, curr) => accu + curr);
  labelBalance.textContent = formate_Currency(
    acct.balance,
    acct.locale,
    acct.currency
  );
};
// total_Balance(account1.movements);

//? -------------------------------------------- Display In & Out,Interest Summary

const display_Summary = (acct) => {
  //? Display Total Deposit
  const in_Deposit = acct.movements
    .filter((move) => move > 0)
    .reduce((accu, move) => accu + move, 0);
  labelSumIn.textContent = formate_Currency(
    in_Deposit,
    acct.locale,
    acct.currency
  );

  //? Display Total Withdrawal
  const withdrawal = acct.movements
    .filter((move) => move < 0)
    .reduce((accu, move) => accu + move, 0);
  labelSumOut.textContent = formate_Currency(
    withdrawal,
    acct.locale,
    acct.currency
  );

  //? Display Interest
  const interest = acct.movements
    .filter((move) => move > 0)
    .map((move) => (move * 1.2) / 100)
    .filter((move) => move > 0)
    .reduce((accu, move) => accu + move, 0);
  labelSumInterest.textContent = formate_Currency(
    interest,
    acct.locale,
    acct.currency
  );
};
// display_Summary(account1.movements);

//? --------------------------------------- User's Sort Name For Login

const user_Name = (acct) => {
  acct.forEach((acct) => {
    acct.userName = acct.owner
      .toLowerCase()
      .split(" ")
      .map((user) => user[0])
      .join("");
  });
};
user_Name(accounts);

//? ---------------------------------- updateUI

const updateUI = (acct) => {
  //? Display Movement
  display_Movements(acct);
  //? Display Total Balance
  total_Balance(acct);
  //? Display Summary
  display_Summary(acct);
};

//? ---------------------------------------- Login Function

let current_Account, timer;

current_Account = account1;
containerApp.style.opacity = 100;
updateUI(current_Account);

  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("heloo");
    current_Account = accounts.find(
      (acct) => acct?.userName === inputLoginUsername.value
    );
    accounts.find((acc) => console.log(acc.userName));
    if (current_Account?.pin === +inputLoginPin.value) {
      containerApp.style.opacity = 100;

      inputLoginUsername.value = inputLoginPin.value = "";
      inputLoginPin.blur();

      //? Welcome Back Message
      labelWelcome.textContent = `Welcome Back, ${
        current_Account.owner.split(" ")[0]
      }`;
      //? Display Date
      current_Date();

      //? Timer
      if (timer) clearInterval(timer);
      timer = logout_Timer();

      //? update Ui
      updateUI(current_Account);
    }
  });



//? ----------------------------- Current Date

const current_Date = () => {
  const now = new Date();
  const option = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    current_Account.locale,
    option
  ).format(now);
};

//? -------------------------------------------- Trasnfer Money Function

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  //? Check userName and pin in api(object)
  const amount = +inputTransferAmount.value;
  const recieverAcc = accounts.find(
    (acct) => acct?.userName === inputTransferTo.value
  );
  //? Check Condtions for Transfer Money
  if (
    amount > 0 &&
    recieverAcc &&
    current_Account.balance >= amount &&
    recieverAcc.userName !== current_Account.userName
  ) {
    inputTransferTo.value = inputTransferAmount.value = "";

    //? minus and plus amount in current Account and reciever Account
    current_Account.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //? Display Current Dates of transection
    current_Account.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());

    //? Timer
    if (timer) clearInterval(timer);
    timer = logout_Timer();

    //? display amount and dates
    updateUI(current_Account);
  }
});

//? ------------------------------------------ Request Loan Function

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loan_amount = +inputLoanAmount.value;
  if (
    loan_amount > 0 &&
    current_Account.movements.some((move) => move >= loan_amount * 0.1)
  ) {
    setTimeout(() => {
      current_Account.movements.push(loan_amount);

      current_Account.movementsDates.push(new Date().toISOString());

      updateUI(current_Account);
    }, 3000);

    //? timer
    if (timer) clearInterval(timer);
    timer = logout_Timer();

    inputLoanAmount.value = "";
  }
});

//? --------------------------------------- Close Account Function

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputCloseUsername.value === current_Account.userName &&
    +inputClosePin.value === current_Account.pin
  ) {
    //? Return Index of Current Account
    const index = accounts.findIndex((index) => index.userName);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = "";
  }
});

//? ---------------------------------- Logout Timer Function

const logout_Timer = () => {
  const tick = () => {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    time--;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }
  };

  let time = 60;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
