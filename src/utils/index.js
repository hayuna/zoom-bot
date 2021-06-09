import * as base64JS from "js-base64";
import * as hmacSha256 from "crypto-js/hmac-sha256";
import * as encBase64 from "crypto-js/enc-base64";

export const generateSignature = () => {
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

export const zoom = window.ZoomMtg;
