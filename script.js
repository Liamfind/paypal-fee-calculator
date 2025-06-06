function calculateFees() {
    // Get input values
    const netAmount = parseFloat(document.getElementById('netAmount').value) || 0;
    const fixedFee = parseFloat(document.getElementById('fixedFee').value) || 0;
    const percentageFee = parseFloat(document.getElementById('percentageFee').value) || 0;

    // Convert percentage to decimal
    const percentageDecimal = percentageFee / 100;

    // Calculate gross amount using the formula: G = (N + F) / (1 - P)
    const grossAmount = (netAmount + fixedFee) / (1 - percentageDecimal);

    // Calculate PayPal fee
    const paypalFee = grossAmount * percentageDecimal + fixedFee;

    // Update the results
    document.getElementById('grossAmount').textContent = formatCurrency(grossAmount);
    document.getElementById('paypalFee').textContent = formatCurrency(paypalFee);
    document.getElementById('netAmountResult').textContent = formatCurrency(netAmount);
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

// Add event listeners for input fields
document.getElementById('netAmount').addEventListener('input', calculateFees);
document.getElementById('fixedFee').addEventListener('input', calculateFees);
document.getElementById('percentageFee').addEventListener('input', calculateFees);

// Initial calculation
calculateFees(); 