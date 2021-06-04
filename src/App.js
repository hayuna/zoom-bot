import "./App.css";
import * as base64JS from "js-base64";
import * as hmacSha256 from "crypto-js/hmac-sha256";
import * as encBase64 from "crypto-js/enc-base64";

declare var ZoomMtg;

ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.5/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const generateSignature = () => {
  let signature = "";
  // Prevent time sync issue between client signature generation and zoom
  const ts = new Date().getTime() - 30000;
  try {
    const msg = base64JS.Base64.encode(
      process.env.REACT_APP_API_KEY + process.env.REACT_APP_MEETING_ID + ts + 1
    );
    const hash = hmacSha256.default(msg, process.env.REACT_APP_SECRET);
    signature = base64JS.Base64.encodeURI(
      `${process.env.REACT_APP_API_KEY}.${
        process.env.REACT_APP_MEETING_ID
      }.${ts}.1.${encBase64.stringify(hash)}`
    );
  } catch (e) {
    console.log("error");
  }
  return signature;
};

function App() {
  console.log(process.env);
  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  console.log(process.env);
  const apiKey = process.env.REACT_APP_API_KEY;
  const meetingNumber = process.env.REACT_APP_MEETING_ID;
  const userName = "BOT";

  function getSignature(e) {
    e.preventDefault();
    startMeeting(generateSignature());
  }

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: "https://www.facebook.com/groups/programmersonlyapp/",
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: "",
          passWord: "",
          success: (success) => {
            console.log(success);
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
}

export default App;
