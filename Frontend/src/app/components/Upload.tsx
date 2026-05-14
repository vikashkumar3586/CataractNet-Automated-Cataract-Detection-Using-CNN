import { useState, useRef } from 'react';
import { Upload as UploadIcon, Image as ImageIcon, X, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface UploadProps {
  uploadedImage: string | null;
  onImageUpload: (imageUrl: string) => void;
  onAnalyze: () => void;
  onBack: () => void;
}

export function Upload({ uploadedImage, onImageUpload, onAnalyze, onBack }: UploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onImageUpload('');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 bg-gradient-to-b from-white to-[#e0f2fe]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back */}
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl mb-4 text-foreground">
              Upload Eye Image
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a slit-lamp eye image for automated cataract detection
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
            <div className="p-8">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0891b2] text-white flex items-center justify-center text-lg">
                  1
                </div>
                <h2 className="text-2xl text-foreground">Upload Eye Image</h2>
              </div>

              {!uploadedImage ? (
                <div>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${isDragging
                        ? 'border-[#0891b2] bg-[#e0f2fe]'
                        : 'border-border hover:border-[#0891b2] hover:bg-[#e0f2fe]/50'
                      }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-6">
                        <UploadIcon className="w-10 h-10 text-[#0891b2]" />
                      </div>

                      <h3 className="text-xl mb-3 text-foreground">
                        Drop your image here
                      </h3>

                      <p className="text-muted-foreground mb-6 max-w-sm">
                        Drag and drop a slit-lamp eye image, or click below to select
                      </p>

                      <button
                        onClick={handleUploadClick}
                        className="px-8 py-3 bg-[#0891b2] text-white rounded-xl hover:bg-[#0e7490] transition-colors inline-flex items-center gap-2"
                      >
                        <ImageIcon className="w-5 h-5" />
                        Select Image
                      </button>

                      <p className="text-sm text-muted-foreground mt-6">
                        Supported formats: JPG, PNG, JPEG
                      </p>
                    </div>
                  </div>

                  {/* Guidelines */}
                  <div className="mt-8 p-6 bg-[#e0f2fe] rounded-xl">
                    <h4 className="text-sm mb-3 text-[#0891b2]">
                      Image Guidelines
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Use clear, high-quality slit-lamp images</li>
                      <li>• Ensure the eye and lens are clearly visible</li>
                      <li>• Avoid blurry or poorly lit images</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Preview */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-foreground">Image Preview</h3>
                      <button
                        onClick={handleRemoveImage}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden border bg-gray-50">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full max-h-96 object-contain"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        onImageUpload('');
                        fileInputRef.current?.click();
                      }}
                      className="flex-1 px-6 py-3 border-2 border-[#0891b2] text-[#0891b2] rounded-xl"
                    >
                      Upload Another
                    </button>

                    <button
                      onClick={onAnalyze}
                      className="flex-1 px-6 py-3 bg-[#0891b2] text-white rounded-xl"
                    >
                      Analyze Image
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-[#e0f2fe] rounded-xl text-center text-sm text-[#0891b2]">
                    ✓ Image uploaded successfully. Click "Analyze Image"
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}