
import { supabase } from "@/integrations/supabase/client";

export interface PaymentSubmission {
  email: string;
  amount: number;
  transactionId?: string;
  screenshot?: string;
}

export const paymentService = {
  async submitPayment(userId: string, data: PaymentSubmission) {
    const { data: result, error } = await supabase
      .from('payments')
      .insert([
        {
          user_id: userId,
          email: data.email,
          amount: data.amount,
          transaction_id: data.transactionId || null,
          screenshot_url: data.screenshot || null,
          status: 'submitted'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async getUserPayments(userId: string) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createInvestment(userId: string, paymentId: string, amount: number) {
    // Create investment record
    const { data: investment, error: investmentError } = await supabase
      .from('investments')
      .insert([
        {
          user_id: userId,
          payment_id: paymentId,
          principal_amount: amount,
          current_value: amount,
          interest_earned: 0,
          status: 'active'
        }
      ])
      .select()
      .single();

    if (investmentError) throw investmentError;

    // Create initial transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          investment_id: investment.id,
          type: 'investment',
          amount: amount,
          description: 'Initial Investment'
        }
      ])
      .select()
      .single();

    if (transactionError) throw transactionError;

    return { investment, transaction };
  }
};

export default paymentService;
