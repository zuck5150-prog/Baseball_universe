import { createClient } from './supabase/client';

export async function signInWithEmail(email:string){
 const supabase=createClient();
 const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:typeof window!=='undefined'?window.location.origin:undefined}});
 if(error)throw error;
}
export async function signOut(){const {error}=await createClient().auth.signOut();if(error)throw error}
export async function currentUser(){const {data,error}=await createClient().auth.getUser();if(error)throw error;return data.user}
