/* eslint-disable no-undef */
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

// eslint-disable-next-line no-restricted-globals
self.addEventListener("notificationclick", function (event) {
  let url = "https://youtube.com";
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    // eslint-disable-next-line no-restricted-globals, no-undef
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      // eslint-disable-next-line no-undef
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
