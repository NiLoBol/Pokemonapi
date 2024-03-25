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
  const [EVOlist, setEvo] = useState<Evo>();
  const [backpokemon, setbackpokemon] = useState<number>();
  const [nextpokemon, setnextpokemon] = useState<number>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          window.location.href = "/";
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

  /// EVO ต้องมาเมื่อมีละไม่มามาเมื่อไม่มี
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

  function organizeData(data: Evo): any[] {
    const result: any[] = [];
    data.forEach((item) => {
      if (!result[item.index]) {
        result[item.index] = [];
      }
      result[item.index].push({ name: item.name, id: item.id });
    });
    return result.filter(Boolean);
  }

  // console.log(Pokelist);

  useEffect(() => {
    if (Pokelist) {
      console.log(Pokelist);
      Pokelist.forEach((element) => {
        const ID = dateContext?.pokemonlist.results
          .filter((item: any) => {
            return item.name === element.name;
          })[0]
          .url.split("/");
        element.id = ID[ID.length - 2];
      });

      const output = organizeData(Pokelist);
      setEvo(output);
      console.log(output);
    }
  }, [Pokelist]);

  useEffect(() => {
    if (pokemon && dateContext?.pokemonlist) {
      console.log(pokemon);
      console.log(device);
      const iddata = dateContext?.pokemonlist?.results.findIndex(
        (e: { name: string; url: string }) => e.name === pokemon.name
      );
      console.log(iddata);
      if (iddata !== -1) {
        // Ensure iddata is valid
        let nextpokemon =
          dateContext?.pokemonlist?.results[iddata + 1]?.url.split("/");

        setnextpokemon(
          nextpokemon ? nextpokemon[nextpokemon.length - 2] : null
        );
        let backpokemon =
          dateContext?.pokemonlist?.results[
            (iddata > 0 ? iddata : 1) - 1
          ]?.url.split("/");
        setbackpokemon(
          backpokemon ? backpokemon[backpokemon.length - 2] : null
        );
      }
    }
  }, [pokemon, dateContext?.pokemonlist]);
  if (pokemon && dateContext?.pokemonlist) {
    return (
      <div className={"max-h-screen  mt-10"}>
        {Pokelist ? (
          <div
            className={`w-full lg:h-[60vw] h-screen bg-${pokemon.types[0].type.name} absolute top-0 lg:top-1/3 -z-10 lg:rounded-t-[40%] `}
          ></div>
        ) : (
          <div
            className={`w-full lg:h-[31.65vw]  h-screen bg-${pokemon.types[0].type.name} absolute top-0 lg:top-1/3 -z-10 lg:rounded-t-[40%] `}
          ></div>
        )}


        <div
          className={
            device == "desktop"
              ? " flex flex-row flex-wrap justify-evenly "
              : " flex flex-row  flex-wrap  bg-" + pokemon.types[0].type.name
          }
        >
          {device !== "mobile" && id !== "1" && id !== undefined ? (
            <a
              href={"/Pokemon/" + backpokemon}
              className="basis-1/12 relative top-[330px] h-20"
            >
              <i className="fa-solid fa-2xl fa-arrow-left"></i>
            </a>
          ) : id === "1" ? (
            <a className="basis-1/12 relative top-[330px] h-20 "></a>
          ) : (
            <a
              href={"/Pokemon/" + backpokemon}
              className="basis-1/12 relative top-[160px]"
            >
              <i className="fa-solid fa-2xl fa-arrow-left"></i>
            </a>
          )}
          <div
            id="pokemon-img"
            className={
              "lg:basis-4/12 basis-9/12 lg:h-1/4 border-[3px] lg:mx-0 mx-auto   p-20  border-" +
              pokemon.types[0].type.name +
              " bg-white rounded-full text-center overflow-hidden"
            }
          >
            <div>
              <img src={pokemon.sprites.other.home.front_default} alt="" />
            </div>
          </div>
          {device == "mobile" && id !== undefined ? (
            <a
              href={"/Pokemon/" + nextpokemon}
              className={"basis-1/12 relative top-[160px] "}
            >
              <i className="fa-solid fa-2xl fa-arrow-right"></i>
            </a>
          ) : null}
          <div
            className={`lg:basis-4/12 basis-full  p-10 border-[3px] rounded-2xl border-${pokemon.types[0].type.name} bg-white  `}
          >
            <h1 className="text-6xl font-bold mb-10"> {pokemon.name}</h1>
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
            <div className="flex flex-wrap flex-row my-10">
              <div className="basis-1/2 flex flex-row">
                <i className="fa-solid fa-arrows-up-down text-5xl me-10"></i>
                <div className="my-3">
                  {(pokemon.height * 0.1).toFixed(2)} M
                </div>
              </div>
              <div className="basis-1/2 flex flex-row">
                <i className="fa-solid fa-weight-scale text-5xl me-10"></i>
                <div className="my-3">
                  {(pokemon.weight * 0.1).toFixed(2)} KG
                </div>
              </div>
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
            <a
              href={"/Pokemon/" + nextpokemon}
              className={"basis-1/12 relative top-[330px] h-20 "}
            >
              <i className="fa-solid fa-2xl fa-arrow-right"></i>
            </a>
          ) : null}
        </div>
        <PokemonEVO
          data={EVOlist ? EVOlist : undefined}
          bg={"bg-" + pokemon.types[0].type.name}
        ></PokemonEVO>
      </div>
    );
  } else {
    return <div>Pokemon ID: {id}</div>;
  }
  return <div></div>;
}
