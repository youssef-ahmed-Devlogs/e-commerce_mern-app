/**
 *
 * @param {object} queriesObject
 * @returns String
 *
 * queriesObject = {
 *    search: "new item",
 *    role: "admin"
 *    sort: "createdAt"
 * }
 *
 * Will return query String like this:
 * search=new%item&role=admin&sort=createdAt
 */
const parseQueries = (queriesObject) => {
  // Filter undefined or empty or null and remove it
  const keysFilter = Object.keys(queriesObject);
  keysFilter.forEach((key) => {
    if (
      queriesObject[key] === "" ||
      queriesObject[key] === undefined ||
      queriesObject[key] === null
    ) {
      delete queriesObject[key];
    }
  });

  // Make query string
  const keys = Object.keys(queriesObject);
  let queries = "";

  keys.forEach((key, index) => {
    queries += `${key}=${queriesObject[key]}`;
    if (index < keys.length - 1) queries += "&";
  });

  return queries;
};

export default parseQueries;
