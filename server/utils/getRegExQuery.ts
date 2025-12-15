const getRegExQuery = (key: string, value: string) => ({
  [key]: { $regex: new RegExp(value, "i") },
});

export default getRegExQuery;
