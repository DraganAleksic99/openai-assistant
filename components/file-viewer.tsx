import { ChangeEvent } from "react";

export default function FileViewer() {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const data = new FormData();

    if (!event.target.files || event.target.files?.length < 1) return;

    data.append("file", event.target.files[0]);

    await fetch("/api/assistant/files", {
      method: "POST",
      body: data,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-5 bg-[#efefef] overflow-hidden rounded-2xl">
      <div className="flex justify-center p-3">
        <label
          htmlFor="file-upload"
          className="bg-black text-white py-2 px-6 rounded-3xl text-center inline-block cursor-pointer"
        >
          Attach files
        </label>
        <input
          type="file"
          id="file-upload"
          name="file-upload"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
