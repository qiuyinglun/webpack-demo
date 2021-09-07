const promiseArray = [
    new Promise(() => {}),
    new Promise(() => {})
];

promiseArray.map(promise => {
    console.log(promise)
});