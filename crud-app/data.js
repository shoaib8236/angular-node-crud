const { faker } = require("@faker-js/faker");

exports.records = (id) => {
  const name = faker.name.firstName();
  const company = faker.company.name()
  const image = faker.internet.avatar();
  const _id = `${id}`;
  return {
    _id,
    name,
    company,
    image,
  };
};
