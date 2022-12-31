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

    if (errorTypes.includes("required")) this.required(field);
    if (max && maxSize) this.max(field, maxSize);
    if (min && minSize) this.min(field, minSize);
  }

  required(field) {
    if (this.data[field] == "")
      this.errors.push(
        this.messages[field] ? this.messages[field] : "No Message"
      );

    this.objectErrors[field] = this.messages[field]
      ? this.messages[field]
      : "No Message";
  }

  max(field, size = 255) {
    console.log("====================================");
    console.log("max", field);
    console.log("====================================");
  }

  min(field, size = 5) {
    console.log("====================================");
    console.log("min", field);
    console.log("====================================");
  }

  fieldName(name) {
    return;
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
