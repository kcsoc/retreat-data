import { useState } from "react";

export default function FileUpload() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    }).then(() => {
      // refresh the page
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      window.location.reload();
    });
  };
  return (
    <div>
      <div>
        {/* <img src={createObjectURL} /> */}
        <h4>Select Orders CSV (National Team only!)</h4>
        <a href="https://kcsoc.squarespace.com/api/commerce/orders/export?orderStates=CANCELLED%2CFULFILLED%2CPENDING&orderSubmittedOnMin=2019-09-02T13%3A01%3A43.327Z&orderSubmittedOnMax=2024-11-07T23%3A59%3A59.999Z&productId=65455bdf72efa4676f7f3a4d&includeProductForm=true">CSV download link Weekend Retreat Nov 23 (you have to be logged in)</a>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
        <p>After uploading, wait up to 10 seconds for the page to refresh.</p>
      </div>
    </div>
  );
}
