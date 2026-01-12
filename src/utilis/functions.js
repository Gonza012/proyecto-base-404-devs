const getLSItems = (key) => {
  const dataFound = localStorage.getItem(key);
  if (dataFound) {
    return null;
  }
  return JSON.parse(dataFound);
};

const setLSItems = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { setLSItems, getLSItems };
