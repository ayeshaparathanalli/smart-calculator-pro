let display = document.getElementById("display");
let chart;

// Auto font adjust
function adjustFontSize() {
  let len = display.innerText.length;

  if (len > 15) display.style.fontSize = "24px";
  else if (len > 10) display.style.fontSize = "30px";
  else display.style.fontSize = "36px";
}

// Append
function append(val) {
  if (display.innerText === "0") display.innerText = val;
  else display.innerText += val;
  adjustFontSize();
}

// Clear
function clearDisplay() {
  display.innerText = "0";
}

// Backspace
function backspace() {
  display.innerText = display.innerText.slice(0, -1) || "0";
  adjustFontSize();
}

// Calculate
function calculate() {
  try {
    let exp = display.innerText.replace("×","*").replace("÷","/");
    display.innerText = eval(exp);
    adjustFontSize();
  } catch {
    display.innerText = "Error";
  }
}

// Voice
function startVoice() {
  let rec = new webkitSpeechRecognition();

  rec.onresult = function(e) {
    let speech = e.results[0][0].transcript;

    speech = speech.replace("plus","+")
                   .replace("minus","-")
                   .replace("into","*")
                   .replace("divide","/");

    display.innerText = speech;
    calculate();
  };

  rec.start();
}

// Explain
function explain() {
  alert("Calculated using JavaScript.");
}

// Graph
function drawGraph() {
  let ctx = document.getElementById("chart").getContext("2d");

  let labels = [], data = [];

  for (let x = 0; x <= 10; x++) {
    labels.push(x);
    try {
      let y = eval(display.innerText.replace(/x/g,x));
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
      datasets: [{ data: data }]
    }
  });
}