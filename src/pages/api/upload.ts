import multer from "multer";
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// Configure Multer
const storage = multer.diskStorage({
  destination: './public/uploads', // Save files in the "public/uploads" directory
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${timestamp}${ext}`);
  },
});

const upload = multer({ storage });

// Disable default body parsing in Next.js API for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Handle the upload
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    upload.single('file')(req as any, res as any, (err: any) => {
      if (err) {
        return res.status(500).json({ error: 'File upload failed.' });
      }

      const filePath = `/uploads/${req.file?.filename}`;
      res.status(200).json({ url: filePath });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
