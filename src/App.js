import "./App.css";
import { generateSignature, zoom } from "./utils";
import "./events";

zoom.preLoadWasm();
zoom.prepareWebSDK();

const App = () => {
  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  const apiKey = process.env.REACT_APP_API_KEY;
  const meetingNumber = process.env.REACT_APP_MEETING_ID;
  const userName = "BOT";

  function getSignature(e) {
    e.preventDefault();
    startMeeting(generateSignature());
  }

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    zoom.init({
      leaveUrl: "https://www.facebook.com/groups/programmersonlyapp/",
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        zoom.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: "",
          passWord: "",
          success: (success) => {
            console.log(success);
            const user = zoom.getCurrentUser({});
            console.log(user);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className="App">
      <main>
        <button onClick={getSignature}>Create Meeting</button>
      </main>
    </div>
  );
};

export default App;
