import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProbeStrategyProps } from "./ProbeStrategy.types";
import { Input } from "@/components/ui/input";

export function ProbeStrategy({ strategy, onBack }: ProbeStrategyProps) {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Error al procesar la solicitud");
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <p>{strategy.name}</p>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ingresa un valor"
      />
      <Button onClick={handleSubmit}>Enviar a Python</Button>
      <Button onClick={() => onBack()}>Volver</Button>

      {result && (
        <div className="mt-4">
          <p>Resultado del servidor Python:</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
