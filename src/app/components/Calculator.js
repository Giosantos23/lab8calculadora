'use client';

import React, { useState } from 'react';
import '../Calculator.css';

const digitos_max = 9;
const num_max = 999999999;


const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [operador, setOperador] = useState(null);
  const [primerOperador, setPrimerOperador] = useState(null);
  const [isResult, setIsResult] = useState(false);


  const presionarDigito = (digit) => {
    if (display.length < digitos_max) {
      if (isResult) {
        setDisplay(digit);
        setIsResult(false);
      } else {
        setDisplay((prevDisplay) => prevDisplay + digit);
      }
    }
  };

  const presionarPunto = () => {
    if (isResult) {
      setDisplay('0.');
      setIsResult(false);
    } else if (display.length < digitos_max && !display.includes('.')) {
      setDisplay((prevDisplay) => prevDisplay + '.');
    }
  };


  const presionarMasmenos = () => {
    if (display === '') return;
    if (display.charAt(0) === '-') {
      setDisplay(display.slice(1));
    } else {
      setDisplay('-' + display);
    }
  };

  const presionarOperador = (op) => {
    if (display === '' && op === '-') {
      setDisplay('-');
      return;
    }

    if (primerOperador === null) {
      setPrimerOperador(parseFloat(display));
      setDisplay('');
    } else if (operador) {
      const result = calculate(primerOperador, parseFloat(display), operador);
      if (isError(result)) {
        setDisplay('ERROR');
        resetCalculator();
        return;
      }
      setPrimerOperador(result);
      setDisplay('');
    }
    setOperador(op);
  };

  const handleEqualClick = () => {
    if (operador && primerOperador !== null) {
      const result = calculate(primerOperador, parseFloat(display), operador);
      if (isError(result)) {
        setDisplay('ERROR');
        resetCalculator();
        return;
      }
      setDisplay(result.toString().slice(0, digitos_max));
      setPrimerOperador(null);
      setOperador(null);
      setIsResult(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('');
    setPrimerOperador(null);
    setOperador(null);
  };

  const calculate = (a, b, operator) => {
    let result;
    switch (operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = a / b;
        break;
      default:
        return b;
    }

    if (result < 0 || result > num_max) {
      return 'ERROR';
    }

    return result;
  };

  const isError = (result) => result === 'ERROR';
  const resetCalculator = () => {
    setPrimerOperador(null);
    setOperador(null);
    setIsResult(false);
  };



  return (
    <div className="calculator" data-testid="calculator">
      <div className="display" data-testid="display">{display}</div>
      <div className="buttons">
        <button onClick={handleClearClick}>C</button>
        <button onClick={presionarMasmenos}>+/-</button>
        <button onClick={() => presionarDigito('0')}>0</button>
        <button onClick={() => presionarOperador('/')}>/</button>
        <button onClick={() => presionarDigito('1')}>1</button>
        <button onClick={() => presionarDigito('2')}>2</button>
        <button onClick={() => presionarDigito('3')}>3</button>
        <button onClick={() => presionarOperador('+')}>+</button>
        <button onClick={() => presionarDigito('4')}>4</button>
        <button onClick={() => presionarDigito('5')}>5</button>
        <button onClick={() => presionarDigito('6')}>6</button>
        <button onClick={() => presionarOperador('-')}>-</button>
        <button onClick={() => presionarDigito('7')}>7</button>
        <button onClick={() => presionarDigito('8')}>8</button>
        <button onClick={() => presionarDigito('9')}>9</button>
        <button onClick={() => presionarOperador('*')}>*</button>
        <button onClick={presionarPunto}>.</button>
        <button onClick={handleEqualClick}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
