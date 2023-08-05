const fileUpload = document.getElementById("file");
const statusText = document.getElementById("fileUploadStatus");
const dumpButton = document.getElementById("dumpButton");
const uploadStatus = document.getElementById("uploadStatus");

statusText.innerText = "Upload daylio backup file";

fileUpload?.addEventListener("change", () => {
  const selectedFile = fileUpload.files?.[0];

  if (selectedFile === undefined) {
    statusText.innerText = "Upload daylio backup file";
    dumpButton.disabled = true;
  } else {
    statusText.innerText = "daylio backup uploaded";
    dumpButton.disabled = false;
  }
});

dumpButton.addEventListener("click", () => {
  const selectedFile = fileUpload.files?.[0];
  if (selectedFile === undefined) {
    //Shouldn't get to this state
    statusText.innerText = "File could not be found. Try reuploading";
    return;
  }

  const formData = new FormData();
  formData.append("data", selectedFile);
  fetch("http://localhost:3000/emotions/dump", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.status == 201) {
        uploadStatus.innerText = "Emotions dump successful 👽";
        uploadStatus.style.color = "#37782e";
      } else {
        throw new Error(`Status code invalid: ${response.status}`);
      }
    })
    .catch((e) => {
      console.error(e);
      uploadStatus.innerText = "Emotions dump failed. Fix your app smh";
      uploadStatus.style.color = "#bd2f42";
    });
});
