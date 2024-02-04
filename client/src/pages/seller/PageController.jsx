import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Auth from "./Auth";

export default function PageController() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  console.log(tab);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return <div>{tab === "auth" && <Auth />}</div>;
}
