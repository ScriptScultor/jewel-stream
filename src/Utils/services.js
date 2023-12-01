// Custom formatting function for the 'timestamp' column
const formatTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    return "Invalid Date";
  }
};

const calculateMaxHeight = () => {
  const screenHeight = window.innerHeight;
  // Subtract any additional padding or margins as needed
  const maxHeight = screenHeight - 100; // Adjust 100 to your preferred value
  return `${maxHeight}px`;
};

const createDebounced = (callback, delay) => {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
};

export { formatTimestamp, calculateMaxHeight, createDebounced };
