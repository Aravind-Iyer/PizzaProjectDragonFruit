/**
 * Validates a card number using the Luhn Algorithm.
 * @param {string} cardNumber - The card number to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.

function validateCardNumber(cardNumber) {
    if (!cardNumber || typeof cardNumber !== 'string') return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

/**
 * Validates if the amount is greater than zero.
 * @param number amount - The amount to validate.
 * @returns boolean - Returns true if the amount is valid, false otherwise.
function validateAmount(amount) {
    return typeof amount === 'number' && amount > 0;
}

module.exports = {
    validateCardNumber,
    validateAmount,
};
*/


/**
 * Validates a card number to ensure it is 16 digits.
 * @param {string} cardNumber - The card number to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validateCardNumber(cardNumber) {
    return cardNumber && typeof cardNumber === 'string' && cardNumber.length === 16 && /^\d+$/.test(cardNumber);
}

module.exports = {
    validateCardNumber,
};
