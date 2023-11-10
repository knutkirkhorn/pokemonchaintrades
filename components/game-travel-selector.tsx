import React from 'react';
import {PokemonGame} from '@/app/types';
import {Toggle} from './ui/toggle';

type GameOption = {
	value: PokemonGame,
	text: string,
	title: string,
};

const gameOptions: GameOption[] = [
	{
		value: 'lgpe',
		text: 'LGPE',
		title: 'Toggle Let\'s Go, Pikachu! & Let\'s Go, Eevee!',
	},
	{
		value: 'swsh',
		text: 'SwSh',
		title: 'Toggle Sword & Shield',
	},
	{
		value: 'bdsp',
		text: 'BDSP',
		title: 'Toggle Brilliant Diamond & Shining Pearl',
	},
	{
		value: 'pla',
		text: 'PLA',
		title: 'Toggle Legends: Arceus',
	},
	{
		value: 'sv',
		text: 'SV',
		title: 'Toggle Scarlet & Violet',
	},
];

export default function GameTravelSelector({games, onChange}: {games?: PokemonGame[], onChange: (newGameTravels: PokemonGame[]) => void}) {
	return (
		<div className="flex space-x-2">
			{gameOptions.map(gameOption => (
				<Toggle
					key={gameOption.value}
					pressed={games?.includes(gameOption.value) ?? false}
					onPressedChange={pressed => {
						const newGameTravels = games?.includes(gameOption.value)
							? games.filter(game => game !== gameOption.value)
							: [...(games ?? []), gameOption.value];
						onChange(newGameTravels);
						console.log('pressed', pressed);
					}}
					size="sm"
					variant="outline"
					className=""
					title={gameOption.title}
					aria-label={gameOption.title}
				>
					{gameOption.text}
				</Toggle>
			))}
		</div>
	);
}
