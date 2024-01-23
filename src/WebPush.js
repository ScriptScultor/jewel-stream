import React, { useEffect, useState } from "react";
import { HttpMethod, makeApiRequest } from "./data/axios";
const WebPush = ({ subscribeUserEnabled }) => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const initPushSubscription = async () => {
      if (subscribeUserEnabled && "serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register(
          `${process.env.PUBLIC_URL}/service-worker.js`
        );
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          // console.log(JSON.stringify(subscription));
          // Replace this with your actual API call to edit the product
        const result = await makeApiRequest({
          method: HttpMethod.POST, // or "PATCH" based on your API
          url: `/jewelstream/api/v1/jewelStreamSubscribeNotification`,
          data: subscription, // Send the edited product data
        });
          setSubscription(subscription);
        } else {
          const publicKey =
            "BD9pp06B2Iiwsan9aS4giv_i13H03JuR_0Gfz02HRE2eQQx63yrLP-OlRDX0plAtQ3IgJAGvVwHZEoRawd6SH_U"; // Replace with your VAPID public key
          const pushSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(publicKey),
          });

          console.log(JSON.stringify(pushSubscription));
          setSubscription(pushSubscription);
        }
      }
    };

    initPushSubscription();
  }, [subscribeUserEnabled]);

  return (
    <div>
      {subscription ? (
        <p>Subscribed to push notifications!</p>
      ) : (
        <p>Push notifications not supported or not enabled.</p>
      )}
    </div>
  );
};

export default WebPush;

// Utility function to convert base64 to Uint8Array
const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};
