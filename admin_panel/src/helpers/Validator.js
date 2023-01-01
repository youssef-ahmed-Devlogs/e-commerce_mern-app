class Validator {
  constructor(data) {
    this.data = data;
    this.errors = [];
    this.objectErrors = {};
  }

  prepare() {
    const validationFields = Object.keys(this.validation);
    const dataFields = Object.keys(this.data);

    validationFields.forEach((validationField) => {
      if (dataFields.includes(validationField)) {
        this.selectErrorType(this.validation[validationField], validationField);
      } else {
        this.errors.push(validationField);
      }
    });

    return this;
  }

  selectErrorType(errorTypes, field) {
    // ==== Get max validation and extract it ["max:20"] => "max" "20" ========
    const extractMax = errorTypes.find((item) => item.startsWith("max"));
    let [max, maxSize] = extractMax != undefined ? extractMax.split(":") : "";
    // ========================================================================
    // ==== Get min validation and extract it ["min:20"] => "min" "20" ========
    const extractMin = errorTypes.find((item) => item.startsWith("min"));
    let [min, minSize] = extractMin != undefined ? extractMin.split(":") : "";
    // ========================================================================

    if (max && maxSize) this.max(field, maxSize);
    if (min && minSize) this.min(field, minSize);
    if (errorTypes.includes("email")) this.email(field);
    if (errorTypes.includes("required")) this.required(field);
  }

  required(field) {
    if (this.data[field] == "") {
      this.errors.push(
        this?.messages[field]?.require
          ? this?.messages[field]?.require
          : "No Message"
      );

      this.objectErrors[field] = this?.messages[field]?.require
        ? this?.messages[field]?.require
        : "No Message";
    }
  }

  max(field, size = 255) {
    if (this.data[field].length > size) {
      this.errors.push(
        this?.messages[field]?.max ? this?.messages[field]?.max : "No Message"
      );

      this.objectErrors[field] = this?.messages[field]?.max
        ? this?.messages[field]?.max
        : "No Message";
    }
  }

  min(field, size = 5) {
    if (this.data[field].length < size) {
      this.errors.push(
        this?.messages[field]?.min ? this?.messages[field]?.min : "No Message"
      );

      this.objectErrors[field] = this?.messages[field]?.min
        ? this?.messages[field]?.min
        : "No Message";
    }
  }

  email(field) {
    const validateEmail = String(this.data[field])
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!validateEmail) {
      this.errors.push(
        this?.messages[field]?.email
          ? this?.messages[field]?.email
          : "No Message"
      );

      this.objectErrors[field] = this?.messages[field]?.email
        ? this?.messages[field]?.email
        : "No Message";
    }
  }

  setValidation(validation) {
    this.validation = validation;
    return this;
  }

  setMessages(messages) {
    this.messages = messages;
    return this;
  }

  getErrors() {
    return this.errors;
  }

  getObjectErrors() {
    return this.objectErrors;
  }
}

export default Validator;
