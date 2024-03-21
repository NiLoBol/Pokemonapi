import React, { useCallback, useContext, useMemo } from "react";
import { DateContext } from "../context/Context";
import PokeCard from "../components/PokeCard";
import { pokemonType } from "../interface/pokemonlistType";
import { useParams } from "react-router-dom";

export default function Home() {
  let id = useParams().id || 0;
  const data = useContext(DateContext);
  const pokemonlist = useMemo(() => {
    const list = data?.pokemonlist?.results;
    return list;
  }, [data]);

  if (pokemonlist && data) {
    console.log(pokemonlist);
    const start = (typeof id === "string" ? parseInt(id, 10) : id) * 20 + 1;
    const end = Math.min(start + 19, pokemonlist.length); // หาจุดสิ้นสุดของข้อมูล
    const filteredPokemon = pokemonlist.slice(start - 1, end); // ตัดส่วนข้อมูลที่ต้องการ

    const pokemon = filteredPokemon;
    console.log(pokemon);

    return (
      <div className="container mx-auto mt-20">
        <div className="grid gap-4 grid-cols-2 xl:grid-cols-4 ">
          {pokemon.map((item: pokemonType) => {
            return <PokeCard name={item.name} url={item.url}></PokeCard>;
          })}
        </div>

        <div className="flex flex-row-reverse justify-between ">
          <button
            onClick={() => {
              window.location.href = `/${
                (typeof id === "string" ? parseInt(id, 10) : id) + 1
              }`;
            }}
            className="text-3xl bg-orange-500 rounded-lg w-64 h-16  my-32"
          >
            next
          </button>
          {(id !== 0 && (id !== "0"))?<button
            onClick={() => {
              if(id==1){
                window.location.href = `/`
              }
              else{
                window.location.href = `/${
                (typeof id === "string" ? parseInt(id, 10) : id) - 1
              }`
              }
              
            }}
            className="text-3xl bg-orange-500 rounded-lg w-64 h-16  my-32"
          >
            back
          </button>
          :null
        }
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto mt-20">
        <div className="text-5xl">Loading...</div>
      </div>
    );
  }
}
