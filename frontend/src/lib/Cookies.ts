export function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // 1 day in milliseconds
  const expires: string = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function getCookie(name: string): string | null {
  const cookieArr: string[] = document.cookie.split(';');
  
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie: string = cookieArr[i].trim();
    
    // Check if this cookie's name matches the desired one
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  
  return null; // Return null if cookie not found
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}