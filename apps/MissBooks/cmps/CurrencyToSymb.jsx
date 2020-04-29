export default function currencySymb(currency){
    let symb;
    switch (currency) {
        case 'EUR':
            symb = '€';
            break;
        case 'USD':
            symb = '$';
            break;
        case 'ILS':
            symb = '₪';
            break;
    }
    return symb;
}
