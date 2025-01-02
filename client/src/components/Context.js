import { createContext } from "react";

const UserContext = createContext();


function UserProvider({children}){
    return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
}
export { UserContext, UserProvider };