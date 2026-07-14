import { useState } from "react";

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-white rounded-3xl shadow p-6 h-[450px] flex items-center justify-center">
        <img
          src={selectedImage}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        <button
          onClick={() => setSelectedImage(product.image)}
          className={`border rounded-xl p-2 transition ${
            selectedImage === product.image
              ? "border-amber-600"
              : "border-gray-300"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </button>
      </div>
    </div>
  );
}

export default ProductGallery;
