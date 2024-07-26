import { supabase } from "./supabase";

export async function uploadImage(image, bucket) {
  const imageName = `${Math.random()}-${image.name}`.replaceAll('/', '');

  const { data: upload, error: uploadError } = await supabase
    .storage
    .from(bucket)
    .upload(imageName, image)

  if (uploadError !== null) {
    console.log(uploadError);
    throw new Error('image could not be uploaded');
  }

  const { fullPath: uploadPath } = upload;
  const uploadUrl = import.meta.env.VITE_APP_PROJECT_UPLOAD_URL + `/${uploadPath}`;

  return uploadUrl;
}