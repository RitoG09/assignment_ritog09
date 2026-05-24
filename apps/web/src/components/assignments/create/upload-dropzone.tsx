"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import { CloudUpload, FileImage, FileText, X } from "lucide-react";

interface UploadDropzoneProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
}

const MAX_SIZE = 10 * 1024 * 1024;

export function UploadDropzone({ value, onChange }: UploadDropzoneProps) {
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError("");

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];

        if (rejection.errors?.some((e: any) => e.code === "file-too-large")) {
          setError("File size must be under 10MB");
          return;
        }

        setError("Unsupported file type");
        return;
      }

      const file = acceptedFiles[0];

      if (file) {
        onChange?.(file);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    maxSize: MAX_SIZE,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "application/pdf": [],
    },
  });

  const preview = useMemo(() => {
    if (!value) return null;

    if (value.type.startsWith("image/")) {
      return URL.createObjectURL(value);
    }

    return null;
  }, [value]);

  return (
    <div className="mt-7">
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center rounded-[28px] border-2 border-dashed bg-[#FAFAFA] px-8 py-10 transition-all duration-200 ${
          isDragActive ? "border-[#1E1E1E] bg-[#F5F5F5]" : "border-[#D5D5D5]"
        }`}
      >
        <input {...getInputProps()} />

        {!value ? (
          <>
            <CloudUpload className="h-8 w-8 text-[#1E1E1E]" strokeWidth={2} />

            <p className="mt-5 text-center text-[17px] font-medium text-[#2A2A2A]">
              {isDragActive
                ? "Drop your file here"
                : "Choose a file or drag & drop it here"}
            </p>

            <p className="mt-1.5 text-[14px] text-[#A1A1A1]">
              JPEG, PNG, PDF upto 10MB
            </p>

            <button
              type="button"
              onClick={open}
              className="mt-5 h-[46px] rounded-full bg-[#EFEFEF] px-6 text-[15px] font-semibold text-[#2A2A2A] transition-colors hover:bg-[#E4E4E4]"
            >
              Browse Files
            </button>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between rounded-[22px] border border-[#E8E8E8] bg-white p-4">
              <div className="flex items-center gap-4">
                {/* Preview */}
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F3F3F3]">
                    <FileText className="h-7 w-7 text-[#2A2A2A]" />
                  </div>
                )}

                {/* Info */}
                <div>
                  <p className="max-w-[280px] truncate text-[15px] font-semibold text-[#2A2A2A]">
                    {value.name}
                  </p>

                  <p className="mt-1 text-[13px] text-[#8D8D8D]">
                    {(value.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => onChange?.(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#F3F3F3]"
              >
                <X className="h-5 w-5 text-[#5A5A5A]" />
              </button>
            </div>

            {/* Replace */}
            <button
              type="button"
              onClick={open}
              className="mt-4 text-[14px] font-medium text-[#1E1E1E] underline underline-offset-2"
            >
              Replace file
            </button>
          </div>
        )}
      </div>

      {/* Bottom Text */}
      <p className="mt-4 text-center text-[15px] text-[#7E7E7E]">
        Upload images of your preferred document/image
      </p>

      {/* Error */}
      {error && (
        <p className="mt-3 text-center text-[14px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
