import React, { useRef } from 'react';

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
    <div>
      <label htmlFor="image">Image</label>
      <div className="flex items-center mt-2">
        <button
          type="button"
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
        >
          Choose File
        </button>
        <span>{value ? value.substring(0, 30) + '...' : 'No file chosen'}</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageInput;
