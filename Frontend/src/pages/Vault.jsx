import { useState } from "react";

const Vault = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [submittedFile, setSubmittedFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreviewURL(URL.createObjectURL(uploadedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a document before submitting.");
      return;
    }
    setSubmittedFile(file);
  };

  const handleReset = () => {
    setFile(null);
    setPreviewURL("");
    setSubmittedFile(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 md:w-96 text-center">
        <h2 className="text-2xl font-bold text-center mb-4">Upload Document</h2>

        <input
          type="file"
          accept=".pdf, .jpg, .jpeg, .png"
          onChange={handleFileChange}
          className="w-full border px-3 py-2 rounded cursor-pointer"
        />

        {file && (
          <div className="mt-4">
            <p className="font-medium text-gray-700">{file.name}</p>
            {file.type.includes("image") ? (
              <img src={previewURL} alt="Uploaded" className="w-full h-auto mt-2 rounded-lg shadow" />
            ) : file.type === "application/pdf" ? (
              <iframe
                src={previewURL}
                className="w-full h-40 mt-2 border rounded-lg shadow"
                title="PDF Preview"
              ></iframe>
            ) : (
              <p className="text-gray-600">Preview not available for this file type.</p>
            )}
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
            Reset
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>

      {submittedFile && (
        <div className="absolute bottom-10 bg-white shadow-lg rounded-lg p-6 w-80 md:w-96 text-center">
          <h3 className="text-xl font-bold mb-4">Uploaded Document</h3>
          {submittedFile.type.includes("image") ? (
            <img src={URL.createObjectURL(submittedFile)} alt="Uploaded" className="w-full h-auto rounded-lg shadow" />
          ) : submittedFile.type === "application/pdf" ? (
            <iframe
              src={URL.createObjectURL(submittedFile)}
              className="w-full h-40 border rounded-lg shadow"
              title="PDF Preview"
            ></iframe>
          ) : (
            <p className="text-gray-600">Preview not available for this file type.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Vault;
