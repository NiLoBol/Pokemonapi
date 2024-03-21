import React, { useEffect, useState } from 'react'
import { pokemonType } from '../interface/pokemonlistType';


export default function PokeCard(prop:pokemonType) {
    const  {name, url} = prop;
    const parts = url.split("/");
    const pokemonId = parts[parts.length - 2];

  return (
    <div id={'pokemon-'+pokemonId} className='rounded-xl border-[3px] mx-3' onClick={()=> window.open(`/Pokemon/${pokemonId}`)}>
      <img className='mx-auto h-[200px]' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`} alt="" />
      <div className='text-3xl text-center'>{name}</div>
    </div>
  )
}

