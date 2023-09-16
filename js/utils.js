function getMonthName(monthNumber) {
    switch(monthNumber) {
        case 0:
            return 'Janeiro';
            break;
        case 1:
            return 'Fevereiro';
            break;
        case 2:
            return 'Março';
            break;
        case 3:
            return 'Abril';
            break;
        case 4:
            return 'Maio';
            break;
        case 5:
            return 'Junho';
            break;
        case 6:
            return 'Julho';
            break;
        case 7:
            return 'Agosto';
            break;
        case 8:
            return 'Setembro';
            break;
        case 9:
            return 'Outubro';
            break;
        case 10:
            return 'Novembro';
            break;
        case 11:
            return 'Dezembro';
            break;
    }
}

export { getMonthName };

function formatCurrency(value) {

    value = `R$${Number(value).toFixed(2)}`.replace('.', ',');

    return value;
}

export { formatCurrency };

function verifyMoreThanThreeDC(transaction) {

    if(
        String(transaction).includes('.') &&
        String(transaction).substring(transaction.indexOf('.')).length > 3
    ) {
        return true;
    }

    return false;
}

export { verifyMoreThanThreeDC };

function verifyTransactionAction(transaction, component) {
    if(transaction.includes('+')) {
        component.style.color = 'rgb(0, 196, 0)';
    }
    else if(transaction.includes('-')) {
        component.style.color = 'red';
    }
}

export { verifyTransactionAction };