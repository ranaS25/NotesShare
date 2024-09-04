// Utility function example


export const validateEmailsformat = (emails) => {
  
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  for (let email of emails) {
    if(email.trim().length<5) return false
    if (!email.match(validRegex)) return false;
  }
  return true;
};