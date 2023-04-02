export const APP_MESSAGE = {
  ADDED_SUCCESSFULLY: (fieldName) => `Add ${fieldName} successfully`,
  UPDATED_SUCCESSFULLY: (fieldName) => `Update ${fieldName} successfully`,
  REMOVED_SUCCESSFULLY: (fieldName) => `Remove ${fieldName} successfully`,
  DELETED_SUCCESSFULLY: (fieldName) => `Delete ${fieldName} successfully`,
  SEND_OTP_SUCCESSFULLY: 'Send OTP code successfully',
  CONFIRM_OTP_SUCCESSFULLY: 'Confirm OTP code successfully',
  LOGOUT_SUCCESSFULLY: 'Logout successfully',
  FORBIDDEN: 'You do not have permission',
  OUT_OF_STOCK: (name) => `${name} is out of stock`,
  QUANTITY_ALLOWED: (quantity, name) => `Only ${quantity} or less quantities of ${name} allowed`,
};
