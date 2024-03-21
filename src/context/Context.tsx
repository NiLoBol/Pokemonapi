import React, { createContext, useEffect, useState } from "react";
import { UserStateType, UserType } from "../interface/pokemonlistType";

type ContextType = {
  children: React.ReactNode;
};
export const DateContext = createContext<UserStateType | null>(null);

export const ContextProvider = ({ children }: ContextType) => {
  const [pokemonlist, setapi] = useState<any>();
  const [user, setuser] = useState<UserType | null>(null);
  const [todolist, settodolist] = useState<string[]>([]);
  const [url, seturl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  const screenW = window.innerWidth;
  const [device, setdevice] = useState<string>("");
  useEffect(() => {
    console.log(screenW);
    
    if (screenW >= 1024) {
      setdevice("desktop");
    } else if (screenW > 500) {
      setdevice("tablet");
    } else {
      setdevice("mobile");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setapi(jsonData);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetchData end");
      }
    };

    fetchData();
  }, [url]);
  return (
    <DateContext.Provider
      value={{
        user,
        setuser,
        todolist,
        settodolist,
        url,
        seturl,
        pokemonlist,
        device,
      }}
    >
      {" "}
      {children}
    </DateContext.Provider>
  );
};
