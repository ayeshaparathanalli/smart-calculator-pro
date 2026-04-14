let display = document.getElementById("display");
let chart;

// Adjust font size
function adjustFontSize() {
  let length = display.innerText.length;

  if (length > 15) {
    display.style.fontSize = "24px";
  } else if (length > 10) {
    display.style.fontSize = "30px";
  } else {
    display.style.fontSize = "40px";
  }
}

// Append
function append(value) {
  if (display.innerText === "0") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
  adjustFontSize();
}

// Clear
function clearDisplay() {
  display.innerText = "0";
  adjustFontSize();
}

// Backspace
function backspace() {
  display.innerText = display.innerText.slice(0, -1) || "0";
  adjustFontSize();
}

// Calculate
function calculate() {
  try {
    let expression = display.innerText
      .replace("×", "*")
      .replace("÷", "/");

    display.innerText = eval(expression);
    adjustFontSize();
  } catch {
    display.innerText = "Error";
  }
}

// Voice
function startVoice() {
  let recognition = new webkitSpeechRecognition();

  recognition.onresult = function(event) {
    let speech = event.results[0][0].transcript;

    speech = speech.replace("plus", "+");
    speech = speech.replace("minus", "-");
    speech = speech.replace("into", "*");
    speech = speech.replace("divide", "/");

    display.innerText = speech;
    calculate();
  };

  recognition.start();
}

// Explain
function explain() {
  alert("This is calculated using JavaScript evaluation.");
}

// Graph
function drawGraph() {
  let ctx = document.getElementById("chart").getContext("2d");

  let labels = [];
  let data = [];

  for (let x = 0; x <= 10; x++) {
    labels.push(x);
    try {
      let y = eval(display.innerText.replace(/x/g, x));
      data.push(y);
    } catch {
      data.push(0);
    }
  }

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Graph",
        data: data
      }]
    }
  });
}