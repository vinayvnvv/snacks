function Pro(body) {
    var thenCall;
    var catchCall;
    body(
        (resolve) => {
            thenCall(resolve);
        },
        (reject) => {
            catchCall(reject);
        }
    )
    this.then = (callback) => {
        thenCall = callback;
        return this
    }
    this.catch = (callback) => {
        catchCall = callback;
    }
}

const pro = new Pro((resolve, reject) => {
    setTimeout(() => {
        reject('err');
    }, 3000)
})
pro.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})