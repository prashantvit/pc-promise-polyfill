function pcPromise(promiseFn) {
  var that = this;
  let nextData;
  this.thenfn = [];
  this.resolve = function(data) {
    let newData;
    newData = data;
    for (var i = 0; i < that.thenfn.length; i++) {
      newData = that.thenfn[i](newData);
    }
  };
  this.reject = function(error) {
    // console.log("rejected", error);
    that.catchFn(error);
  };
  this.promiseFn = promiseFn;
  this.then = function(thenFn) {
    that.thenfn.push(thenFn);
    return that;
  };
  this.catch = function(catchFn) {
    that.catchFn = catchFn;
    return that;
  };
  setTimeout(() => this.promiseFn(this.resolve, this.reject));
}

var test = new pcPromise(function(resolve, reject) {
  setTimeout(() => {
    resolve(1);
  }, 2000);
  // reject(2);
})
  .then(data => {
    console.log(data, "then data");
    return 2 * data;
  })
  .then(data => {
    console.log(data, "then data");
    return 3 * data;
  })
  .then(data => {
    console.log(data, "then data");
    return 4 * data;
  })
  .then(data => {
    console.log(data, "then data");
    return 4 * data;
  })
  .catch(error => {
    console.log(error, "catched error");
  });

console.log(test);
