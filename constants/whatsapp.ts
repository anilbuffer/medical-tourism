/**
 * Central WhatsApp configuration and link helpers
 */

// Placeholder WhatsApp phone number (international format without '+', spaces, or special characters)
export const WHATSAPP_PHONE =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_WHATSAPP_PHONE) ||
  '1234567890';

// Default pre-filled message for WhatsApp inquiries
export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello! I would like to chat with the care coordination team.';

/**
 * Returns a standardized WhatsApp Click-to-Chat URL with an encoded message.
 * @param customMessage Optional message text to pre-fill in the chat input.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

// Precomputed default WhatsApp chat URL
export const WHATSAPP_URL = getWhatsAppUrl();
