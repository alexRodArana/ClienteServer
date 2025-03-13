import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setError(null);
    setResult(null);

    if (!num1 || !num2 || !operator) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/calculate", {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        operator,
      });
      setResult(`Resultado: ${response.data.result}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error en la operación");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Calculadora</h1>
      <input
        type="number"
        placeholder="Número 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />
      <select
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      >
        <option value="">Operador</option>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input
        type="number"
        placeholder="Número 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />
      <br />
      <button
        onClick={handleCalculate}
        style={{ margin: "10px", padding: "10px", fontSize: "16px" }}
      >
        Calcular
      </button>
      {result && <h2>{result}</h2>}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
    </div>
  );
}