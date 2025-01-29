import { HTMLAttributes, useRef,useState, useEffect } from "react";
import './imageInput.css';

interface ImageInputProps extends HTMLAttributes<HTMLElement> {
  img: string;
  returnFile:(file:File)=>void,
}

export function ImageInput({ img,returnFile,className, ...props }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(img);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPreview(URL.createObjectURL(file));
      returnFile(file);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview !== img) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, img]);

  return (
    <div className={`image__input ${className}`} {...props}>
      <img
        src={preview}
        alt="Klikněte pro nahrání souboru"
        onClick={handleImageClick}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/jpeg,image/jpg,image/png,image/bmp,image/webp,image/svg+xml"
      />
    </div>
  );
}
