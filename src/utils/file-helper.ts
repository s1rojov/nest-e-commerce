import path from 'path';
export const editedFileName = (req: any, file: any, callback: any) => {
  callback(
    null,
    file.fieldname + '-' + Date.now() + path.extname(file.originalname),
  );
};
