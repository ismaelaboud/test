type FileUploadProps = {
    onUpload: (file: File) => void;
  };
  
  export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onUpload(file);
    };
  
    return (
      <input
        type="file"
        className="w-full p-2 border rounded-md"
        onChange={handleFileChange}
      />
    );
  };