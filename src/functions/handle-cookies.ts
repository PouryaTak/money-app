export function setCookie(
  name: string,
  value: string,
  expireDays: number = 365,
) {
  const d = new Date();
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function getCookie(name: string) {
  const cookies = document.cookie
    .split(";")
    .find((cookie) => cookie.includes(`${name}=`));
  return cookies ? cookies.split("=")[1] : undefined;
}

export function removeCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
export function clearCookiesForDomain(domain: string | undefined) {
  if (domain) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie =
        "refreshToken" +
        "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=" +
        domain;
    }
  }
}
