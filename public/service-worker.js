// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", (event) => {
  const data = event.data.json(); // Assuming the push notification data is sent as JSON

  var options = {
    body: data.body || "Default Notification Body",
    icon: "/icons/96x96.png",
    badge: "/icons/96x96.png",
    data: {
      url: "https://wappler-dynamic-pwa.herokuapp.com",
    },
  };

  event.waitUntil(
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(
      data.body || "Default Notification Title",
      options
    )
  );
});
