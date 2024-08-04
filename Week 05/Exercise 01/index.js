function apply(operation) {
    let result;
    const number1 = parseFloat(document.getElementById('number1').value);
    const number2 = parseFloat(document.getElementById('number2').value);

    if (isNaN(number1) || isNaN(number2)) {
        alert("Please enter valid numbers in both fields.");
        return;
    }

    switch (operation) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            if (number2 === 0) {
                alert("Cannot divide by zero.");
                return;
            }
            result = number1 / number2;
            break;
        default:
            alert("Invalid operation.");
            return;
    }

    document.getElementById('result').value = result;
}