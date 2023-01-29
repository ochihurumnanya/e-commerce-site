import { ProductsData } from '../context/context';
import { useContext } from 'react';



/**
 * 
 * @param {*contains eg(currency: "en-US, USD",) users' locals(language) and currency code (USD, NGN etc)} currency 
 * @param {*the price to be formarted} price
 * @param {*Object containing exchange rates} data
 * @param {*Currency of the store owner} storeOwnerCurrency
 */
export const formatPrice = (price) => {
    //Global context object
    const { 
        userCurencyCodeAndLocal, 
        currenciesRate, 
        siteConfig
    } = useContext(ProductsData);

    let currency = userCurencyCodeAndLocal
    let data = currenciesRate
    let storeOwnerCurrency = siteConfig.currency

    let locale = currency.split(' ')[0]
    let calRatePrice = price * data[currency.split(' ')[1]]
    let currencyForm = Intl.NumberFormat(locale, {
        style: "currency",
        currency:currency.split(' ')[1]
    })

    if (storeOwnerCurrency.split(' ')[0] == currency.split(' ')[0]){
        return currencyForm.format(price)
    }else{
        return currencyForm.format(calRatePrice)
    }
}