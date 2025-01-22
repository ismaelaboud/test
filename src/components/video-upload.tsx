import { useState } from 'react';

type VideoUploadProps = {
    onUpload: (url: string) => void;
  };
  
  export const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
    const [url, setUrl] = useState("");
  
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
    };
  
    const handleEmbed = () => {
      if (url) onUpload(url);
    };
  
    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Paste video URL"
          value={url}
          onChange={handleUrlChange}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="button"
          className="text-blue-500"
          onClick={handleEmbed}
        >
          Embed Video
        </button>
      </div>
    );
  };