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
