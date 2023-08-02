import { FC, ReactNode, useEffect, useReducer } from "react";
import { Usuario } from "../../interfaces";
import { AuthContext, authReducer } from ".";
import { entriesApi } from "../../baseUrlApi";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export interface AuthState {
  isLoggedIn: boolean;
  user?: Usuario;
}

interface Props {
  children: ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "[Auth] - Login", payload: data.user as Usuario });
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const { data } = await entriesApi.get("/usuarios/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      console.log("Valid token: " + token);
      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    correoElectronico: string,
    contrasenia: string
  ): Promise<boolean> => {
    try {
      const { data } = await entriesApi.post("/usuarios/login", {
        correoElectronico,
        contrasenia,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const regiterUser = async (
    nombre: string,
    correoElectronico: string,
    contrasenia: string,
    role: string,
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await entriesApi.post("/usuarios/register", {
        nombre,
        correoElectronico,
        contrasenia,
        role,
        sucursalOFranquicia,
        nombreSucursalOFranquicia,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data as string,
        };
      }

      return {
        hasError: true,
        message: "No se puedo crear el usuario - intente de nuevo",
      };
    }
  };

  const logout = async () => {
    // Cookies.remove("token");
    // router.replace("/");
    Cookies.remove("next-auth.callback-url");
    Cookies.remove("next-auth.csrf-token");
    await signOut({ redirect: true });
    router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        loginUser,
        regiterUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
