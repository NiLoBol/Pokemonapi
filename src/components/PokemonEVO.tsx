import React, { useContext, useEffect, useMemo, useState } from "react";
import { Evo } from "../interface/pokemonlistType";
import { DateContext } from "../context/Context";

type Props = {
  data?: Evo;
  bg: string;
};
export default function PokemonEVO(props: Props) {
  const dataContext = useContext(DateContext);

  const data = props.data;
  console.log(data);

  // function organizeData(data: Evo): any[] {
  //   const result: any[] = [];
  //   data.forEach((item) => {
  //     if (!result[item.index]) {
  //       result[item.index] = [];
  //     }
  //     result[item.index].push({ name: item.name, id: item.id });
  //   });
  //   return result.filter(Boolean);
  // }

  const classimg = useMemo(() => {
    if (data !== undefined && dataContext !== null) {
      if (data.length === 4) {
        return "grid gap-24  grid-cols-4";
      } else if (data.length === 3) {
        return "grid gap-24  grid-cols-3";
      } else if (data.length === 2) {
        return "grid gap-24  grid-cols-2";
      } else if (data.length === 1) {
        return "grid gap-24  grid-cols-1";
      }
    }
  }, [data]);

  if (data !== undefined && dataContext !== null) {
    // const pokemonlist = useMemo(() => {
    //  return dataContext.pokemonlist.results.filter((item:any) =>{return item.name} )
    // }, [dataContext]);

    // data.forEach((element) => {
    //   const ID = dataContext.pokemonlist.results
    //     .filter((item: any) => {
    //       return item.name === element.name;
    //     })[0]
    //     .url.split("/");
    //   element.id = ID[ID.length - 2];
    // });

    // const output = organizeData(data);
    // console.log(output);
    return (
      <div className={" w-full mx-auto "+props.bg }>
        <div className="container mx-auto m-20">
          <div className="rounded-2xl bg-white border  w-full  py-10">
            <h1 className="text-5xl font-bold text-center mb-10">
              {" "}
              Pokémon Evolution
            </h1>
            <div className={dataContext.device !== "mobile" ? classimg : ""}>
              {data.map((item: any) => {
                console.log(item);

                if (Array.isArray(item)) {
                  return (
                    <div className="my-auto mx-20">
                      {item.map((pokemon: any) => {
                        console.log(pokemon);
                        return (
                          <div>
                            <a href={"/Pokemon/" + pokemon.id}>
                              <img
                                className="max-h-[400px] mx-auto"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
                                alt=""
                              />
                            </a>
                            <div className="text-3xl text-center font-bold my-5">
                              {pokemon.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                } else {
                  return <div>{item.name} : id not work</div>;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
