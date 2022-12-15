import { Digest } from "../../types";

const DIGEST_ALGORITHM = 'SHA-1';

export async function digestMessage(message: string): Promise<Digest> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(DIGEST_ALGORITHM, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}
