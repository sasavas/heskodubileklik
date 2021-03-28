
var cleave = new Cleave(".credit-card", {
  creditCard: true,
});

new Cleave('.expiry', {
    date: true,
    datePattern: ['m', 'y']
})

new Cleave('.ccv-num', {
    numeric: true,
    blocks: [3]
})