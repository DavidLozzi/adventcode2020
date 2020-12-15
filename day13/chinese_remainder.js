const mul_inv = (a, b) => {

  var b0 = b;
  var x0 = 0;
  var x1 = 1;
  var q, tmp;
  if( b== 1){
    return 1;
  }
  while(a>1){
    q = parseInt(a/b);
    tmp = a;
    a = b;
    b = tmp%b;
    tmp = x0;
    x0 = x1 - (q * x0);
    x1 = tmp;
  }
  if(x1 <0){
    x1 = x1+b0;
  }
  return x1;
}

const chineseRemainder = (a, n) =>{
  var p = i = prod = 1;
  var sm = 0;
  for(i=0; i< n.length; i++){
    prod = prod * n[i];
  }
  for(i=0; i< n.length; i++){
    p = prod / n[i];
    sm = sm + ( a[i] * mul_inv(p, n[i]) * p);
  }
  return sm % prod;
}

module.exports = chineseRemainder