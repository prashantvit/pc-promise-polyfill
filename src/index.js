function pcPromise(promiseFn) {
  var that = this;
  this.resolve = function(data) {
    console.log("resolved", data);
    that.thenFn(data);
  };
  this.reject = function(data) {
    console.log("rejected", data);
  };
  this.promiseFn = promiseFn;
  this.then = function(thenFn) {
    that.thenFn = thenFn;
  };
  setTimeout(() => this.promiseFn(this.resolve, this.reject));
}

var test = new pcPromise(function(resolve, reject) {
  console.log("Proimise Here");
  resolve(1);
  reject(2);
}).then(data => {
  console.log(data, "then data");
});

console.log(test);
document.getElementById("app").innerHTML = JSON.stringify(test);
