const text = 'These are my phone numbers:1234567890 and 11122233344. Is your number 1231231231?';

//const regex = /\d{10,11}/g; // Extract any number.
const regex = /\b\d{10,11}\b/g; // Extract standalone numbers.

const numbers = text.match(regex);

console.log(numbers)