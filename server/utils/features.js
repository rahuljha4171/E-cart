export class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // Search Product
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  // Filter Product
  filter() {
    const queryCopy = { ...this.queryStr };
    // Remove some fields from category
    const removedField = ["keyword", "page", "limit"];

    removedField.forEach((key) => delete queryCopy[key]);
    //filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
