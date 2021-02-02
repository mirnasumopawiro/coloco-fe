const validation = {
  isPasswordValid: (data) => {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;
    return re.test(data);
  },
  isEmail: (data) => {
    const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(data);
  },
  isNumericOnly: (data) => {
    const re = /^[0-9]+$/;
    return re.test(data);
  },
  hasError: (errorMessage) => {
    let newErrorMessage = validation.flattenObject(errorMessage);
    return Object.keys(newErrorMessage).length === 0 ? false : true;
  },
  flattenObject: (ob) => {
    var toReturn = {};

    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if (typeof ob[i] === "object") {
        var flatObject = validation.flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + "." + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  },
};

export default validation;
