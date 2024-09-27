let buckets = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

// count the qty of non blanks in the buckets array
function checkBlanks(arr) {
  let counter = 0;
  arr.forEach((element) => {
    if (element != null) {
      counter++;
    }
  });
  return counter;
}

// returns T/F if the buckets array is over 75% capacity
function checkLoad(arr) {
  if (checkBlanks(arr) / arr.length >= 0.75) {
    for (let index = 1; checkBlanks(arr) / arr.length >= 0.5; index++) {
      arr.push(null);
    }
  }
}

// create a hashcode
function hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
  }

  return hashCode;
}

function set(key, value) {
  //run a check on the current load. If the load is over 75% then increase the array size until it's less than 50% load
  checkLoad(buckets);
  const index = hash(key);

  //initialise the bucket as an object
  if (buckets[index] === null) {
    buckets[index] = {};
  }

  //insert the key: value into the array in the bucket location using the hash function
  if (buckets[index] != null && Object.keys(buckets[index])[0] === key) {
    buckets[index] = { [key]: value };
  } else if (buckets[index] != null && Object.keys(buckets[index])[0] != key) {
    buckets[index][key] = { [key]: value };
  } else {
    buckets[index] = { [key]: value };
  }
}

function has(key) {
  const index = hash(key);

  if (buckets[index] === null || buckets[index][key] === undefined) {
    return false;
  } else {
    return true;
  }
}

function get(key) {
  const index = hash(key);
  if (has(key)) {
    return buckets[index][key][key];
  }
}

function remove(key) {
  const index = hash(key);
  delete buckets[index][key];
}

function length() {
  let counter = 0;
  buckets.forEach((element) => {
    if (element != null) {
      counter += Object.keys(element).length;
    }
  });
  return counter;
}

function clear() {
  buckets = [];
  for (let index = 0; index <= 15; index++) {
    buckets.push(null);
  }
}

//set('abc', 'fgh'), set('asdasdeasdsad','12312'), set('asd', 'alsfsal'), set('def','12312')
