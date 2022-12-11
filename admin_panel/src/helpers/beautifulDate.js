/**
 *
 * @param {String} date
 * @returns String
 * Convert this ( 2022-12-01T18:23:21.999+00:00 )
 * To this ( December 2022 )
 */

const beautifulDate = (date) => {
  return new Date(date).toLocaleString("en-us", {
    year: "numeric",
    month: "long",
  });
};

export default beautifulDate;
