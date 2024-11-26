import { HTMLAttributes, useRef } from "react";
import './imageInput.css';

interface ImageInputProps extends HTMLAttributes<HTMLElement> {
  img: string;
  returnFile:(file:File)=>void,
}

export function ImageInput({ img,returnFile,className, ...props }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        returnFile(event.target.files[0]);
    }
  };

  return (
    <div className={`image__input ${className}`} {...props}>
      <img
        src={img}
        alt="Klikněte pro nahrání souboru"
        onClick={handleImageClick}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/jpeg,image/jpg, image/png, image/bmp, image/webp, image/svg+xml"
      />
    </div>
  );
}
