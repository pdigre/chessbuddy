export function decodeHex(data: string) {
  const raw = data.replaceAll(' ', '').substring(4, 68);
  let brd = '';
  for (let i = 0; i < 64; i++) {
    const r = i - (i % 8);
    const p = r + (7 - (i % 8));
    const s = raw.charAt(p ^ 1); // reverse row and flip high-low
    const t = ' qkbpnRPrBNQK   '.charAt('0123456789abcdef'.indexOf(s));
    brd += t;
  }
  return brd;
}
