import { useContext, createContext, useState, ReactNode } from "react";

interface AuthType {
  isAuthed: boolean;
  setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
  user?: {
    username: string;
    token: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<
      | {
          username: string;
          token: string;
        }
      | undefined
    >
  >;
}
const AuthContext = createContext<AuthType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function Auth({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] =
    useState<{ username: string; token: string } | undefined>();

  return (
    <AuthContext.Provider value={{ isAuthed, setIsAuthed, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
