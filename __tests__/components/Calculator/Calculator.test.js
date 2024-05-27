import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import "@testing-library/jest-dom"
import Calculator from '@/app/components/Calculator';

describe('Componente de calculatodora', () => {
    test('La pantalla muestra los numeros exactos que se presionan', () => {
      render(<Calculator />);
  
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('9'));
      fireEvent.click(screen.getByText('2'));
  
      expect(screen.getByText('392')).toBeInTheDocument();
    });
    test('Se renderiza el componente de la calculadora', () => {
        const { getByTestId } = render(<Calculator />);
        const calculatorComponent = getByTestId('calculator');
        expect(calculatorComponent).toBeInTheDocument();
    });
    test('Se realiza el operador de suma correctamente', () => {
        render(<Calculator />);
    
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('='));
    
        expect(screen.getByTestId('display')).toHaveTextContent('3');
    });
    test('La división por cero da error', () => {
        render(<Calculator />);
    
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('/'));
        fireEvent.click(screen.getByText('0'));
        fireEvent.click(screen.getByText('='));
    
        expect(screen.getByTestId('display')).toHaveTextContent('ERROR');
    });
    test('Se limpia la pantalla cuando el botón C se presiona', () => {
        render(<Calculator />);
    
        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('C'));
    
        expect(screen.getByTestId('display')).toHaveTextContent('');
    });
    
});  