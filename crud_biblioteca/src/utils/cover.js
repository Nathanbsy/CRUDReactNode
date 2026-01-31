export function resolveCoverSrc(cover) {
  if (!cover) return null;

  const trimmedCover = cover.trim();
  if (!trimmedCover) return null;

  if (trimmedCover.startsWith("data:image")) {
    return trimmedCover;
  }

  if (
    trimmedCover.startsWith("http://") ||
    trimmedCover.startsWith("https://") ||
    trimmedCover.startsWith("blob:") ||
    trimmedCover.startsWith("/")
  ) {
    return trimmedCover;
  }

  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  if (base64Regex.test(trimmedCover)) {
    return `data:image/*;base64,${trimmedCover}`;
  }

  return trimmedCover;
}
