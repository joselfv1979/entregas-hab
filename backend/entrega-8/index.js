const loanCalc = require('loan-calc');
const yargs = require('yargs').argv;
// Utilizo la librería 'loan-calc' que te ayuda a realizar el cálculo de la cuota mensual y los intereses de una hipoteca, a partir de unos parámetros (cantidad prestada, tasa interés anual y cantidad de meses para devolver el préstamo) que le paso al ejecutar la aplicación, estos parámetros van precedidos de su correspondientes argumentos, que se configuran utilizando la librería 'yargs'.

// variable que almacena la cuota mensual
const monthlyPayment = loanCalc.paymentCalc({
    amount: yargs.a,
    rate: yargs.r,
    termMonths: yargs.t
});

// variable que almacena los intereses totales generados
const totalInterest = loanCalc.totalInterest({
    amount: yargs.a,
    rate: yargs.r,
    termMonths: yargs.t
});

// Ejemplo de llamada por consola: index.js -a 200000 -r 4 -t 240 => Salida esperada: Cuota mensual de la hipoteca 1211.96€, cantidad total de intereses a pagar: 90870.56€

console.log(`Cuota mensual de la hipoteca: ${monthlyPayment}€, cantidad total de intereses a pagar: ${totalInterest}€`);