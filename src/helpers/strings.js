const snakeCaseToCamelCase = (str) => {
  const lowStr = str.toLowerCase();
  const parts = lowStr.split('_');
  const result = parts.reduce((acc, item, index) => `${acc}${index === 0 ? item
    : `${item.charAt(0).toUpperCase()}${item.substring(1).toLowerCase()
    }`}`, '');
  return result;
};

export default { snakeCaseToCamelCase };
