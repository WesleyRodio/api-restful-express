class APIResponses {
  created(resource) {
    return `"${resource}" created successfully!`;
  }

  invalidData() {
    return "Invalid data provieded";
  }

  fieldRequired(field) {
    return `Field "${field}" is required!`;
  }

  invalidField(field, type = null) {
    return `Field "${field}" is invalid!${type ? ` Expected type: ${type}.` : ""}`;
  }
}

export default new APIResponses();
