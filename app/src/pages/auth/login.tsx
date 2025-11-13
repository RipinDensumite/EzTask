import LoginModule from "../../modules/auth/login";
import { pbClient } from "../../api/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = pbClient.authStore.token || localStorage.getItem("pb_auth_token");
    if (token) {
      navigate("/");
      console.log("Loaded auth token from storage:", token);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div></div>;

  return <LoginModule />;
}
