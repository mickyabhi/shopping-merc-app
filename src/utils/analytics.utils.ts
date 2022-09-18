import analytics from "@react-native-firebase/analytics";

export const trackAnalytics = () => ({
  trackEvents: (event, data = {}) => {
    try {
      analytics().logEvent(event, data);
      console.log("AnalyticData", event, data);
    } catch (error) {
      console.log("trackEvents.error", error);
    }
  },
});
