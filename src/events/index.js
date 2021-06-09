import { zoom } from "../utils";

const onUserJoin = (e) => {
  console.log("onUserJoin", e);
};

const onUserLeave = (e) => {
  console.log("onUserLeave", e);
};

const onUserIsInWaitingRoom = (e) => {
  console.log("onUserIsInWaitingRoom", e);
  setTimeout(() => {
    document
      .querySelector(
        "button.zmu-btn.ax-outline.zmu-btn--primary.zmu-btn__outline--blue"
      )
      .click();
  }, 1000);
};

const onMeetingStatus = (e) => {
  // {status: 1(connecting), 2(connected), 3(disconnected), 4(reconnecting)}
  console.log("onMeetingStatus", e);
};

const mute = (userId) => {
  zoom.mute({ userId, mute: true });
};

zoom.inMeetingServiceListener("onUserJoin", onUserJoin);
zoom.inMeetingServiceListener("onUserLeave", onUserLeave);
zoom.inMeetingServiceListener("onUserIsInWaitingRoom", onUserIsInWaitingRoom);
zoom.inMeetingServiceListener("onMeetingStatus", onMeetingStatus);
