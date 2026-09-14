import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
export default function UserRoute({ children }) {
  const [ok, setOk] = useState(false);
  const [state, , ready] = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    let active = true;
    setOk(false);
    if (!ready) return;
    if (!state?.token) { router.replace("/login"); return; }
    // Set the token explicitly because child effects can run before provider effects.
    axios.get("/current-user", { headers: { Authorization: `Bearer ${state.token}` } })
      .then(({ data }) => { if (active) setOk(Boolean(data.ok)); })
      .catch(() => { if (active) router.replace("/login"); });
    return () => { active = false; };
  }, [ready, state?.token, router]);
  return ok ? <>{children}</> : <p className="text-center p-4">Loading…</p>;
}
