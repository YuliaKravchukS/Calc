"use strict";
const input = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const calculate = document.querySelector(".calculate");
const addSignDisplay = document.querySelector(".addSignDisplay");

let startValue = 0;
let a = "";
let b = "";
let c = "";
let d = "";
let memory = "";
let sign = "";
let finish = false;
input.value = startValue;

function clearAll() {
  // a = "";
  b = "";
  d = "";
  sign = "";
  addSignDisplay.value = "";
}

const arrNumbers = [
  "00",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const arrSign = ["/", "*", "+", "-", "√", "%"];
const arrAddSign = ["MR", "M-", "M+", "→", "MC", "AC"];

calculate.addEventListener("click", onCalculateClick);

function onCalculateClick(e) {
  let result;
  if (e.target.nodeName !== "BUTTON") return;
  const key = e.target.textContent;

  if (key === "%") {
    const percent = (a * b) / 100;
    input.value = percent;
    b = percent;
    return;
  }
  if (key === "√") {
    const sqrt = Math.sqrt(a);
    input.value = sqrt;
    a = sqrt;
    return;
  }
  console.log(a, sign, b);
  if (arrNumbers.includes(key)) {
    if (b === "" && sign === "") {
      if (key === "." && a === "") {
        a = "0" + key;
      } else if (key === "." && a.toString().includes(key)) {
        return;
      } else {
        a += key;
      }
      input.value = a;
    } else if (a !== "") {
      if (key === "." && b === "") {
        b = "0" + key;
      } else if (key === "." && b.toString().includes(key)) {
        return;
      } else {
        b += key;
      }
      input.value = b;
    } else if (a !== "" && b !== "" && finish) {
      // a = c;
      b = key;
      finish = false;
      input.value = b;
    }
    // else {
    //   b += key;
    //   input.value = b;
    // }
  }

  if (arrSign.includes(key)) {
    sign = key;
    input.value = sign;
    return;
  }

  if (key === "=") {
    switch (sign) {
      case "/":
        if (b === "0" || b === "00") {
          addSignDisplay.value = "Err";
          input.value = "0";
          a = "";
          return;
        }
        a = a / b;
        break;
      case "*":
        a = a * b;
        break;
      case "-":
        a = a - b;
        break;
      case "+":
        a = +a + +b;
        break;
    }
    b = "";
    finish = true;
    input.value = a;
  }
  if (arrAddSign.includes(key)) {
    switch (key) {
      case "MR":
        if (memory !== "") {
          input.value = memory;
          a = memory;
          b = "";
        } else {
          input.value = 0;
        }
        addSignDisplay.value = key;
        break;
      case "M-":
        if (memory !== "") {
          memory -= a;
        } else {
          memory = a;
        }
        clearAll();
        addSignDisplay.value = key;
        break;
      case "M+":
        if (memory !== "") {
          memory += a;
        } else {
          memory = a;
        }
        clearAll();
        addSignDisplay.value = key;
        break;
      case "→":
        input.value = input.value.slice(0, -1);
        if (input.value.length <= 0) input.value = 0;
        break;
      case "MC":
        memory = "";
        addSignDisplay.value = "";
        break;
      case "AC":
        finish = false;
        input.value = startValue;
        // a = "";
        clearAll();
        memory = "";
        break;
    }
  }
}
