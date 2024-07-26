import { supabase } from "./supabase";
import { uploadImage } from './storage';

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.log(error.message);
    throw new Error('an error occurred to getting cabins');
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  if (error) {
    console.log(error.message);
    throw new Error('cabin could not be deleted');
  }
}

export async function addCabin(data) {
  const { image } = data;

  const uploadUrl = await uploadImage(image, 'cabin-images')

  const { data: cabins, error } = await supabase
    .from('cabins')
    .insert([{ ...data, image: uploadUrl }])
    .select()

  if (error) {
    console.log(error.message);
    throw new Error('cabin could not be added');
  }
  return cabins;
}

export async function editCabin(data) {

  const { newData, id } = data;

  const haveNewImage = typeof newData.image === 'object';

  const imageUrl = haveNewImage ? await uploadImage(newData.image, 'cabin-images') : newData.image;

  const { data: cabin, error } = await supabase
    .from('cabins')
    .update({ ...newData, image: imageUrl })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.log(error.message);
    throw new Error('cabin could not be updated');
  }
  return cabin;
}