// eslint-disable-next-line no-restricted-globals
self.addEventListener("push", (event) => {
  const data = event.data.json(); // Assuming the push notification data is sent as JSON

  const options = {
    body: data.body || "Default Notification Body",
    icon: data.icon || "path/to/default/icon.png",
    badge: data.badge || "path/to/default/badge.png",
  };

  event.waitUntil(
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(
      data.title || "Default Notification Title",
      options
    )
  );
});
