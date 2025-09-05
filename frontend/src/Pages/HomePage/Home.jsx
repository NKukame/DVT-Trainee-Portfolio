import Body from "../../components/BodyComp/Body";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    if (window.sessionStorage.getItem("searchPageReloaded")) {
      window.sessionStorage.removeItem("searchPageReloaded", "true");
    }
  }, []);
  return (
    <>
      <Body />
    </>
  );
}

export default Home;
