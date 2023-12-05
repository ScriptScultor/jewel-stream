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

const payloadFromSubscription = function (subscription) {
  var key = subscription.getKey ? subscription.getKey("p256dh") : "";
  var auth = subscription.getKey ? subscription.getKey("auth") : "";
  // NOTE: p256dg and auth are encoded into std base64, NOT urlsafe base64
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: key
        ? btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
        : "",
      auth: auth
        ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth)))
        : "",
    },
  };
};

const urlB64ToUint8Array = function (base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export {
  formatTimestamp,
  calculateMaxHeight,
  createDebounced,
  payloadFromSubscription,
  urlB64ToUint8Array,
};
