import React, { useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ImageInput: React.FC<Props> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onChange(reader.result as string);
      };
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className="bg-slate-200 rounded-md w-full h-48 flex items-center justify-center opacity-60"
      >
        <div>Choose Image</div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageInput;
