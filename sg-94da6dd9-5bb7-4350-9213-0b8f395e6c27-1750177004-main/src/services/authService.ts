
import { supabase } from "@/integrations/supabase/client";

export interface SignUpData {
  fullName: string;
  email: string;
  age: number;
  gender: string;
  password: string;
}

export const authService = {
  async signUp(data: SignUpData) {
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Then create the pilot user record
        const { data: userData, error: userError } = await supabase
          .from('pilot_users')
          .insert([
            {
              id: authData.user.id,
              full_name: data.fullName,
              email: data.email,
              age: data.age,
              gender: data.gender,
              password_hash: 'handled_by_supabase_auth'
            }
          ])
          .select()
          .single();

        if (userError) throw userError;

        return { user: authData.user, userData };
      }

      return { user: authData.user, userData: null };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getUserData(userId: string) {
    const { data, error } = await supabase
      .from('pilot_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
};

export default authService;
