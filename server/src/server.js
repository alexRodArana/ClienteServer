const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/calculate", (req, res) => {
  const { num1, num2, operator } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  let result;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        return res.status(400).json({ error: "Cannot divide by zero" });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: "Invalid operator" });
  }

  res.json({ result });
});

// Usar otro puerto si 5000 está ocupado
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));