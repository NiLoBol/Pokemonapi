import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { DateContext } from "../context/Context";
import { pokemonTypecolor } from "../interface/data";
import {
  Evo,
  pokemonType,
  pokemonTypeInterface,
} from "../interface/pokemonlistType";
import PokemonEVO from "../components/PokemonEVO";

export default function Pokemon() {
  let { id } = useParams();
  const [pokemon, setpokemon] = useState<any>();
  const [sp, setsp] = useState<any>();
  const [Pokelist, setPokelist] = useState<Evo>();
  const dateContext = useContext(DateContext);
  const device = dateContext?.device;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setpokemon(jsonData);
        return jsonData;
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        // console.log(jsonData.evolution_chain.url);
        try {
          const response = await fetch(jsonData.evolution_chain.url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData2 = await response.json();
          // console.log(jsonData2.chain);
          setsp(jsonData2.chain);
          return jsonData2;
        } catch (error) {
          console.log(error);
          return null;
        }
        return jsonData;
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    fetchData();
  }, []);

  // const [PokemonEvo,setEvo] =useState<any>();
  let Evolist: Evo = [];
  useEffect(() => {
    function getEvotion(data: any, index: number) {
      if (data && data.evolves_to.length > 0) {
        Evolist.push({ name: data.species.name, index: index });
        console.log(Evolist);
        setPokelist(Evolist);
        data.evolves_to.map((item: any) => {
          getEvotion(item, index + 1);
        });
      } else if (data && data.evolves_to.length == 0) {
        Evolist.push({ name: data.species.name, index: index });
        console.log(Evolist);
      } else {
        console.log("not evo");
      }
    }
    getEvotion(sp, 1);
  }, [sp]);

  if (pokemon) {
    // console.log(pokemon);
    console.log(device);

    return (
      <div className="max-h-screen  ">
        <div
          className={`w-full lg:h-[60vw] h-screen bg-${pokemon.types[0].type.name} absolute top-0 lg:top-1/2 -z-10 lg:rounded-t-[40%] `}
        ></div>
        <div className="w-screen hidden h-20 flex flex-row justify-evenly bg-black">
          <a
            className={`basis-1/4 ${
              id !== undefined && parseInt(id) - 1 == 0
                ? ""
                : "bg-white text-5xl font-extrabold text-center disabled m-3 "
            }`}
            href={
              id !== undefined && parseInt(id) - 1 == 0
                ? ""
                : `/Pokemon/${id !== undefined ? parseInt(id) - 1 : null}`
            }
          >
            {id !== undefined ? parseInt(id) - 1 : null}
          </a>

          <a
            className="basis-1/4 bg-white text-5xl font-extrabold text-center m-3"
            href={id !== undefined ? `/Pokemon/${parseInt(id) + 1}` : ""}
          >
            {id !== undefined ? parseInt(id) + 1 : null}
          </a>
        </div>

        <div
          className={
            device == "desktop"
              ? " flex flex-row flex-wrap justify-evenly py-10 "
              : " flex flex-row  flex-wrap  py-10 bg-" +
                pokemon.types[0].type.name
          }
        >
           {device !== "mobile"? (
            <div className="basis-1/12 relative top-[330px]">TEST</div>
          ) : <div className="basis-1/12 relative top-[160px]">TEST</div>}
          <div
            id="pokemon-img"
            className={"lg:basis-4/12 basis-9/12 lg:h-1/4 border-[3px] lg:mx-0 mx-auto   p-20  border-"+pokemon.types[0].type.name+ " bg-white rounded-full text-center overflow-hidden"}
          >
            <div>
              <img src={pokemon.sprites.other.home.front_default} alt="" />
            </div>
          </div>
          {device == "mobile" ? (
            <div className="basis-1/12 relative top-[160px]">TEST</div>
          ) : null}
          <div
            className={`lg:basis-4/12 basis-full  p-10 border-[3px] rounded-2xl border-${pokemon.types[0].type.name} bg-white  `}
          >
            <h1 className="text-6xl font-bold "> {pokemon.name}</h1>

            <div>
              {pokemon.stats.map(
                (item: {
                  base_stat: number;
                  effort: number;
                  stat: { name: string; url: string };
                }) => {
                  return (
                    <div className="">
                      <div className="mb-1 text-base font-medium dark:text-white uppercase text-2xl font-semibold">
                        {item.stat.name} : {item.base_stat}
                      </div>
                      <div className="w-full  bg-gray-200 rounded-full h-1.5 mb-4 ">
                        <div
                          className={`bg-${pokemon.types[0].type.name} h-1.5 rounded-full`}
                          style={{ width: `${item.base_stat / 2}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex flex-row flex-wrap justify-evenly">
              {pokemon.types.map((item: pokemonTypeInterface) => {
                return (
                  <div
                    id={item.slot + ""}
                    className={`basis-28 bg-${item.type.name} p-2 text-center font-bold text-slate-700 rounded-3xl`}
                  >
                    {item.type.name}
                  </div>
                );
              })}
              {/* TYPE  */}

              <div className="hidden">
                <div className="basis-28 border-bug hidden">
                  ใช้เพราะถ้าไม่มีสีข้างบนจะไม่มา น่าจะเกิดจาก
                  สีถูกเรนเดอร์ก่อนที่ตัวแปรจะเป็นข้อความ
                </div>
                <div className="basis-28 border-dark hidden">Test</div>
                <div className="basis-28 border-dragon hidden">Test</div>
                <div className="basis-28 border-electric hidden">Test</div>
                <div className="basis-28 border-fairy hidden">Test</div>
                <div className="basis-28 border-fighring hidden">Test</div>
                <div className="basis-28 border-fire hidden">Test</div>
                <div className="basis-28 border-flying hidden">Test</div>
                <div className="basis-28 border-ghost hidden">Test</div>
                <div className="basis-28 border-normal hidden">Test</div>
                <div className="basis-28 border-grass hidden">Test</div>
                <div className="basis-28 border-ground hidden">Test</div>
                <div className="basis-28 border-ice hidden">Test</div>
                <div className="basis-28 border-poison hidden">Test</div>
                <div className="basis-28 border-psychic hidden">Test</div>
                <div className="basis-28 border-rock hidden">Test</div>
                <div className="basis-28 border-steel hidden">Test</div>
                <div className="basis-28 border-water hidden">Test</div>
                <div className="basis-28 bg-bug hidden">Test</div>
                <div className="basis-28 bg-dark hidden">Test</div>
                <div className="basis-28 bg-dragon hidden">Test</div>
                <div className="basis-28 bg-electric hidden">Test</div>
                <div className="basis-28 bg-fairy hidden">Test</div>
                <div className="basis-28 bg-fighring hidden">Test</div>
                <div className="basis-28 bg-fire hidden">Test</div>
                <div className="basis-28 bg-flying hidden">Test</div>
                <div className="basis-28 bg-ghost hidden">Test</div>
                <div className="basis-28 bg-normal hidden">Test</div>
                <div className="basis-28 bg-grass hidden">Test</div>
                <div className="basis-28 bg-ground hidden">Test</div>
                <div className="basis-28 bg-ice hidden">Test</div>
                <div className="basis-28 bg-poison hidden">Test</div>
                <div className="basis-28 bg-psychic hidden">Test</div>
                <div className="basis-28 bg-rock hidden">Test</div>
                <div className="basis-28 bg-steel hidden">Test</div>
                <div className="basis-28 bg-water hidden">Test</div>
              </div>
            </div>
          </div>
          {device == "desktop" ? (
            <div className="basis-1/12 relative top-[330px]">TEST</div>
          ) : null}
          <PokemonEVO data={Pokelist ? Pokelist : undefined}></PokemonEVO>
        </div>
      </div>
    );
  } else {
    return <div>Pokemon ID: {id}</div>;
  }
  return <div></div>;
}
