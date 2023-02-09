// import  { crypto, timingSafeEqual } from 'crypto';
import * as crypto from 'crypto';

/** Encrypt a string */
export function encryptSha256(text: string, encryptionKey: string): string {
  const key = crypto.createHash('sha256').update(encryptionKey).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  encrypted = Buffer.concat([iv, encrypted]);
  return encrypted.toString('hex');
}

/** Decrypt a cipher text */
export function decryptSha256(cipherText: string, encryptionKey: string): string {
  const key = crypto.createHash('sha256').update(encryptionKey).digest();
  const iv = Buffer.from(cipherText, 'hex').subarray(0, 16);
  const encryptedText = Buffer.from(cipherText, 'hex').subarray(16);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
}
