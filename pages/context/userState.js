import { useEffect, useState } from "react";
import UserContext from "./userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Nav from "../../components/navbar";
import Header from "../../components/dropdown";
import { useRouter } from "next/router";

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
        setSession(user.photoURL);
      } else {
        console.log("logged out ");
        router.push("/");
      }
    });
    
  }, [auth]);

  

  const data = {
    user: user,
    session: session,
  };

  return (
    <UserContext.Provider value={data}>
      {user && (
        <>
          <Nav />
          <Header />
        </>
      )}
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
