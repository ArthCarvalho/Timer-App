const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};


const isEmpty = (string) => {
  if(string.trim() === '') return true;
  else return false;
};

exports.verifyIfEmpty = (string) => isEmpty(string);

exports.verifyPassword = (password) => {
  if(isEmpty(password)) {
    return 'Password must not be empty.';
  }

  // TODO: do additional password verifications here.
  return undefined;
};

exports.verifyEmail = (email) => {
  if(isEmpty(email)) {
    return 'Email must not be empty.';
  } else if(!isEmail(email)){
    return 'Email must be a valid email address.'
  }
  return undefined;
};