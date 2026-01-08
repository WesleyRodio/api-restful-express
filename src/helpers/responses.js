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

  atLeastOneFieldRequired(resource, issues) {
    console.log(issues);

    const issueFields = issues.map(issue => issue.path.join("."));
    return `At least one field is required to update the ${resource}. Provided fields: ${issueFields.join(", ")}`;
  }
}

export default new APIResponses();
