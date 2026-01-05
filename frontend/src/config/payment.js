// Payment Configuration
// Update these IBANs when you have the correct ones

export const PAYMENT_CONFIG = {
  ibans: {
    nicolo: 'IT00NICOLE_IBAN_0001', // Replace with real IBAN
    andrea: 'IT00ANDREA_IBAN_0002'  // Replace with real IBAN
  },
  recipients: {
    nicolo: 'Nicolò Casertano',
    andrea: 'Andrea Bon'
  },
  splitRatio: 0.5 // 50/50 split
}

export function getIBANs() {
  return PAYMENT_CONFIG.ibans
}

export function getRecipients() {
  return PAYMENT_CONFIG.recipients
}

export function calculateSplit(total) {
  const half = total * PAYMENT_CONFIG.splitRatio
  return {
    nicolo: half,
    andrea: half
  }
}
