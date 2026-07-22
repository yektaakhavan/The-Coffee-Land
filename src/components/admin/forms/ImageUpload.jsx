import { useState } from "react";

function ImageUpload({ onChange }) {
  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    onChange?.(file);
  }

  return (
    <div>
      <label className="block mb-2 font-semibold">تصویر محصول</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full"
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="
            mt-4
            h-40
            w-40
            rounded-2xl
            object-cover
            border
          "
        />
      )}
    </div>
  );
}

export default ImageUpload;
