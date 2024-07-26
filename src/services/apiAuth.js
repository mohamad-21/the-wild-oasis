import { supabase } from './supabase';
import { uploadImage } from './storage';
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error);

  return data;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: ''
      }
    }
  })

  if (error) throw new Error(error);

  return data;
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error);
  return data?.user;
}

export async function updateUserAccount({ fullName, password, avatar }) {
  const updateData = {
    data: {}
  };

  if (password) updateData.password = password;
  if (fullName) updateData.data.fullName = fullName;
  if (avatar) {
    const uploadUrl = await uploadImage(avatar, 'avatars');
    updateData.data.avatar = uploadUrl;
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}