function pcPromise(promiseFn) {
  var that = this;
  let nextData;
  this.resolve = function(data) {
    console.log("resolved", data, that.thenFn);
    if (that.thenFn) {
      nextData = that.thenFn(data);
      // console.log("H1");
      that.thenFn = null;
      // console.log("H2");

      // console.log(nextData, "next");
      if (nextData) {
        setTimeout(() => that.resolve(nextData));
      }
    }
  };
  this.reject = function(error) {
    // console.log("rejected", error);
    that.catchFn(error);
  };
  this.promiseFn = promiseFn;
  this.then = function(thenFn) {
    console.log("then called");
    that.thenFn = thenFn;
    return that;
  };
  this.catch = function(catchFn) {
    that.catchFn = catchFn;
    return that;
  };
  setTimeout(() => this.promiseFn(this.resolve, this.reject));
}

var test = new pcPromise(function(resolve, reject) {
  // console.log("Proimise Here");
  resolve(1);
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
  .catch(error => {
    console.log(error, "catched error");
  });

console.log(test);
document.getElementById("app").innerHTML = JSON.stringify(test);
