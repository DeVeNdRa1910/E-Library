export default function getToken() {
  const token = sessionStorage.getItem("token") || "";
  // console.log(token);
  return token;
}