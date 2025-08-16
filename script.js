let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

// Função para adicionar valores ao display
function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

// Função para limpar o display
function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

// Função para deletar o último caractere
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Função para realizar o cálculo
function calculate() {
    try {
        // Substitui o símbolo × por * para o JavaScript entender
        let expression = display.value.replace(/×/g, '*');
        
        // Verifica se a expressão não está vazia
        if (expression === '') {
            return;
        }
        
        // Avalia a expressão matematicamente
        let result = eval(expression);
        
        // Verifica se o resultado é um número válido
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Erro';
        } else {
            // Limita o número de casas decimais para evitar números muito longos
            display.value = parseFloat(result.toFixed(8)).toString();
        }
    } catch (error) {
        display.value = 'Erro';
    }
}

// Adiciona suporte para teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Números e ponto decimal
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    
    // Operadores
    else if (key === '+') {
        appendToDisplay('+');
    }
    else if (key === '-') {
        appendToDisplay('-');
    }
    else if (key === '*') {
        appendToDisplay('*');
    }
    else if (key === '/') {
        event.preventDefault(); // Previne a busca rápida do navegador
        appendToDisplay('/');
    }
    
    // Enter ou = para calcular
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Escape ou Delete para limpar
    else if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
    }
    
    // Backspace para deletar último caractere
    else if (key === 'Backspace') {
        deleteLast();
    }
});

// Previne comportamentos indesejados no campo de input
display.addEventListener('keydown', function(event) {
    event.preventDefault();
});

// Foca no display quando a página carrega
window.addEventListener('load', function() {
    display.focus();
});