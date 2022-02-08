export default function isMobile(v: any): boolean {
    return /^1[0-9][0-9]\d{8}$/.test(v)
  }
  