
import { supabase } from "@/integrations/supabase/client";

export interface OnboardingData {
  goal: string;
  amount: number;
  timeline: string;
  savingStyle: string;
}

export const onboardingService = {
  async saveOnboardingData(userId: string, data: OnboardingData) {
    const { data: result, error } = await supabase
      .from('onboarding_data')
      .insert([
        {
          user_id: userId,
          goal: data.goal,
          amount: data.amount,
          timeline: data.timeline,
          saving_style: data.savingStyle
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async getOnboardingData(userId: string) {
    const { data, error } = await supabase
      .from('onboarding_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }
};

export default onboardingService;
