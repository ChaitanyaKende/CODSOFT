let outputScreen = document.getElementById("output-screen");
let freshState = true; // Flag to track whether the calculator is in a fresh state

function display(num) {
  if (freshState) {
    // If in a fresh state, overwrite the old value
    outputScreen.value = num;
    freshState = false; // Set the flag to false
  } else {
    // If not in a fresh state, append the new value
    outputScreen.value += num;
  }
}

function Calculate() {
  try {
    outputScreen.value = eval(outputScreen.value);
    freshState = true; // Set the flag to true after calculation
  } catch (err) {
    alert("Invalid");
  }
}

function Clear() {
  outputScreen.value = "";
  freshState = true; // Set the flag to true after clearing
}

function del() {
  outputScreen.value = outputScreen.value.slice(0, -1);
  if (outputScreen.value === "") {
    freshState = true; // Set the flag to true if the display becomes empty
  }
}

document.addEventListener("keydown", function (event) {
  handleKeyboardInput(event.key);
  highlightKey(event.key);
});

function handleKeyboardInput(key) {
  if (/[0-9+\-*/.%]/.test(key)) {
    display(key);
  } else if (key === "Enter") {
    event.preventDefault();
    Calculate();
  } else if (key === "Delete") {
    del();
  } else if (key === "Backspace") {
    Clear();
  }
}

function highlightKey(key) {
  const calculatorKey = document.getElementById(`button-${key}`);
  if (calculatorKey) {
    calculatorKey.classList.add("active");
    setTimeout(() => {
      calculatorKey.classList.remove("active");
    }, 300);
  }
}
