const CountPrimeNum = (n) => {
  for (let i=2; i<=n; n--) {
    const result = isPrime(n);
    if (result) {
      // console.log(`${n} is primeNum`);
    }
  }
}

const isPrime = (n) => {
  if(n%2==0) {
    return n==2;
  } else if (n%3==0) {
    return n==3;
  } else if (n%5==0) {
    return n==5;
  }
  const rootN =  Math.sqrt(n);
  for (let j=7; j<rootN; j++) {
    if(n%j==0) {
      return false;
    }
  }
  return true;
}

CountPrimeNum(10000000);