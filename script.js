// 切换手续费承担方
const modeBtns = document.querySelectorAll('.mode-btn');
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        document.querySelectorAll('.calculation-mode').forEach(div => div.style.display = 'none');
        document.getElementById(`${mode}-mode`).style.display = 'block';
        updateLabels(mode);
        calculateFees();
    });
});

function updateLabels(mode) {
    if (mode === 'company') {
        document.getElementById('grossLabel').textContent = '公司需支付总金额 Company Gross Amount:';
        document.getElementById('netLabel').textContent = '达人实际收到金额 Influencer Net Amount:';
    } else {
        document.getElementById('grossLabel').textContent = '公司支付总金额 Company Gross Amount:';
        document.getElementById('netLabel').textContent = '达人实际收到金额 Influencer Net Amount:';
    }
}

function calculateFees() {
    const mode = document.querySelector('.mode-btn.active').dataset.mode;
    if (mode === 'company') {
        // 公司承担手续费
        const netAmount = parseFloat(document.getElementById('netAmount').value) || 0;
        const fixedFee = parseFloat(document.getElementById('fixedFee').value) || 0;
        const percentageFee = parseFloat(document.getElementById('percentageFee').value) || 0;
        const percentageDecimal = percentageFee / 100;
        const grossAmount = (netAmount + fixedFee) / (1 - percentageDecimal);
        const paypalFee = grossAmount * percentageDecimal + fixedFee;
        updateResults(grossAmount, paypalFee, netAmount);
    } else {
        // 达人承担手续费
        const totalBudget = parseFloat(document.getElementById('totalBudget').value) || 0;
        const fixedFee = parseFloat(document.getElementById('fixedFeeInfluencer').value) || 0;
        const percentageFee = parseFloat(document.getElementById('percentageFeeInfluencer').value) || 0;
        const percentageDecimal = percentageFee / 100;
        const netAmount = totalBudget * (1 - percentageDecimal) - fixedFee;
        const paypalFee = totalBudget * percentageDecimal + fixedFee;
        updateResults(totalBudget, paypalFee, netAmount);
    }
}

function updateResults(grossAmount, paypalFee, netAmount) {
    document.getElementById('grossAmount').textContent = formatCurrency(grossAmount);
    document.getElementById('paypalFee').textContent = formatCurrency(paypalFee);
    document.getElementById('netAmountResult').textContent = formatCurrency(netAmount);
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

// 监听所有输入框
const allInputs = [
    ...document.querySelectorAll('#netAmount, #fixedFee, #percentageFee, #totalBudget, #fixedFeeInfluencer, #percentageFeeInfluencer')
];
allInputs.forEach(input => {
    input.addEventListener('input', calculateFees);
});

// 初始化
updateLabels('company');
document.getElementById('company-mode').style.display = 'block';
calculateFees(); 