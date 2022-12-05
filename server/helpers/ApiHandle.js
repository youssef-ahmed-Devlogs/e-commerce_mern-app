class ApiHandle {
  constructor(query, urlQueryString) {
    this.query = query;
    this.urlQueryString = urlQueryString;
    this.searchFilter = {};
    this.searchRegExp = RegExp(this.urlQueryString.search); // $regex: /search term/i find when title contain this term insensitive
    this.excludedFields = [
      "page",
      "limit",
      "sort",
      "fields",
      "order",
      "search",
      "categories",
    ];
  }

  filter() {
    const queryStringFilters = { ...this.urlQueryString };
    this.excludedFields.forEach((el) => delete queryStringFilters[el]);

    if (this.query.model.collection.collectionName == "users") {
      this.searchFilter = {
        $or: [
          { firstName: { $regex: this.searchRegExp, $options: "i" } },
          { lastName: { $regex: this.searchRegExp, $options: "i" } },
          { username: { $regex: this.searchRegExp, $options: "i" } },
          { email: { $regex: this.searchRegExp, $options: "i" } },
        ],
      };
    }

    if (
      ["categories", "products"].includes(
        this.query.model.collection.collectionName
      )
    ) {
      this.searchFilter = {
        $or: [
          { title: { $regex: this.searchRegExp, $options: "i" } },
          { description: { $regex: this.searchRegExp, $options: "i" } },
        ],
      };
    }

    let categories;
    if (this.urlQueryString.categories) {
      categories = this.urlQueryString.categories.split(",");
      this.categoriesFilter = { categories: { $in: categories } };
    }

    this.query = this.query.find({
      ...this.categoriesFilter,
      ...this.searchFilter,
      ...queryStringFilters,
    });

    return this;
  }

  sort() {
    if (this.urlQueryString.sort) {
      let sort = this.urlQueryString.sort
        ? this.urlQueryString.sort.split(",")
        : [];
      const order = ["asc", "desc"].includes(this.urlQueryString.order)
        ? this.urlQueryString.order
        : "asc";
      const sortBy = {};

      sort.forEach((ele) => {
        sortBy[ele] = order;
      });

      this.query = this.query.find().sort(sortBy);
    } else {
      this.query = this.query.find().sort({ createdAt: "desc" });
    }

    return this;
  }

  selectFields() {
    if (this.urlQueryString.fields) {
      const fields = this.urlQueryString.fields.split(",").join(" ");
      this.query = this.query.find().select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.urlQueryString.page * 1 || 1;
    const limit = this.urlQueryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiHandle;
