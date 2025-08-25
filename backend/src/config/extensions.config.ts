export interface BillingConfig {
  publishKey: string;
  secretKey: string;
  checkoutCancel: string;
  checkoutSuccess: string;
}

export const billing: BillingConfig = {
  secretKey: '',
  publishKey: '',
  checkoutCancel: '',
  checkoutSuccess: '',
};
