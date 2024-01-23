import { User } from "../types";

export async function submitHandler(
  details: { [key: string]: string },
  errorRef: React.RefObject<HTMLDivElement>,
  setUser: (user: User) => void,
  pushState: (path: string) => void,
  isLogin: boolean
) {
  if (details.name && details.name.length < 3 && !isLogin) {
    errorRef.current!.style.backgroundColor = "red";
    errorRef.current!.innerHTML = "Name must be at least 3 characters long";
    return;
  }
  if (details.password.length < 6) {
    errorRef.current!.style.backgroundColor = "red";
    errorRef.current!.innerHTML = "Password must be at least 6 characters long";
    return;
  }
  let response;
  if (isLogin) {
    response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
  } else {
    response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
  }
  const data = await response.json();
  if (data.error) {
    errorRef.current!.style.backgroundColor = "red";
    errorRef.current!.innerHTML = data.error;
    return;
  }
  errorRef.current!.style.backgroundColor = "green";
  errorRef.current!.innerHTML = `User ${
    isLogin ? "Logged In" : "Registered"
  } Successfully`;
  setUser(data.user);
  setTimeout(() => {
    errorRef.current!.style.display = "none";
    pushState("/");
  }, 3000);
}
