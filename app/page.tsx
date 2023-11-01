'use client';

import Header from '@/components/header';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import Spinner from '@/components/spinner';
import {Pokemon} from './types';
import {TradeStep} from './trade-step';

// TODO: remove this later :)
type LegacyPokemonTrade = {
	id: string,
	firstPokemon: string;
	secondPokemon: string;
};

type PokemonTrade = {
	id: string,
	firstPokemon: Pokemon;
	secondPokemon: Pokemon;
};

export default function Home() {
	const [pokemonTrades, setPokemonTrades] = useState<PokemonTrade[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const savedPokemonTrades = localStorage.getItem('pokemonTrades');
		if (savedPokemonTrades) {
			const parsedPokemonTrades = JSON.parse(savedPokemonTrades).map((pokemonTrade: PokemonTrade | LegacyPokemonTrade) => {
				// TODO: just for backwards compatibility, remove this later :)
				if (typeof pokemonTrade.firstPokemon === 'string' || typeof pokemonTrade.secondPokemon === 'string') {
					return {
						...pokemonTrade,
						firstPokemon: {name: pokemonTrade.firstPokemon, language: ''},
						secondPokemon: {name: pokemonTrade.secondPokemon, language: ''},
					};
				}
				return pokemonTrade;
			});
			setPokemonTrades(parsedPokemonTrades);
		}
		setIsLoading(false);
	}, []);

	const onAddStep = () => {
		const lastPokemon = pokemonTrades.at(-1)?.secondPokemon ?? {name: '', language: ''};
		const newPokemonTrades = [...pokemonTrades, {id: crypto.randomUUID(), firstPokemon: lastPokemon, secondPokemon: {name: '', language: '' as Pokemon['language']}}];
		setPokemonTrades(newPokemonTrades);
		localStorage.setItem('pokemonTrades', JSON.stringify(newPokemonTrades));
	};

	const onDeleteStep = (index: number) => {
		const newPokemonTrades = [...pokemonTrades.slice(0, index), ...pokemonTrades.slice(index + 1)];
		setPokemonTrades(newPokemonTrades);
		localStorage.setItem('pokemonTrades', JSON.stringify(newPokemonTrades));
	};

	const onSelectedFirstPokemon = (id: string, selectedPokemon: Pokemon) => {
		const newPokemonTrades = pokemonTrades.map(pokemonTrade => {
			if (pokemonTrade.id === id) {
				return {...pokemonTrade, firstPokemon: selectedPokemon};
			}
			return pokemonTrade;
		});
		setPokemonTrades(newPokemonTrades);
		localStorage.setItem('pokemonTrades', JSON.stringify(newPokemonTrades));
	};

	const onSelectedSecondPokemon = (id: string, selectedPokemon: Pokemon) => {
		const newPokemonTrades = pokemonTrades.map(pokemonTrade => {
			if (pokemonTrade.id === id) {
				return {...pokemonTrade, secondPokemon: selectedPokemon};
			}
			return pokemonTrade;
		});
		setPokemonTrades(newPokemonTrades);
		localStorage.setItem('pokemonTrades', JSON.stringify(newPokemonTrades));
	};

	return (
		<main className="flex min-h-screen flex-col p-16 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-900 dark:to-black">
			<Header />
			<div className="flex flex-col items-center space-y-4">
				{isLoading ? (
					<div className="flex flex-row items-center">
						<Spinner />
						<span>Loading...</span>
					</div>
				) : (
					pokemonTrades.map((trade, index) => (
						<TradeStep
							key={trade.id}
							firstPokemon={trade.firstPokemon}
							secondPokemon={trade.secondPokemon}
							onSelectedFirstPokemon={selectedPokemon => onSelectedFirstPokemon(trade.id, selectedPokemon)}
							onSelectedSecondPokemon={selectedPokemon => onSelectedSecondPokemon(trade.id, selectedPokemon)}
							onDelete={() => onDeleteStep(index)}
							step={index}
						/>
					))
				)}
				<Button onClick={onAddStep} disabled={isLoading}>
					<Plus className="w-4 h-4 mr-4" />
					Add step
				</Button>
			</div>
		</main>
	);
}
