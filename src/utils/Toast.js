import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast() {
  return (
    <ToastContainer
      className="toaster-container"
      position="bottom-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      toastClassName="light-toast"
      rtl={false}
      autoClose={3000}
      draggable
      pauseOnHover={false}
    />
  );
}

export function notifyToast(message, type, position, time) {
  toast(
    <div style={{ height: "80%" }}>
      {/* <img
        src="https://pickzon.com/app/site/public/image/web-footer.jpg"
        className="rounded mr-2"
        style={{ width: 20, marginRight: 10, marginTop: -2 }}
        alt=""
      /> */}
      {message}
    </div>,
    { type: type }, // info , success, warning, error
    // { position: position },
    // { autoClose: parseInt(time) * 1000 }
  );

}

export function notifyToastMultipleMessage(message, itemMesage) {
  toast(
    <div style={{ paddingTop: 6, fontWeight: "bold", color: "#767676" }}>
      <img
        src="https://pickzon.com/app/site/public/image/web-footer.jpg"
        class="rounded mr-2"
        style={{ width: 20, marginRight: 10, marginTop: -2 }}
        alt=""
      />
      {message}
      <div class="toast-body">{`${itemMesage}`}</div>
    </div>,
    { autoClose: 2000 }
  );
}
export default Toast;