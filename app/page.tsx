'use client';

import {ComboBoxOption, PokemonCombobox} from '@/components/pokemon-combobox';
import Header from '@/components/header';
import {Button} from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {ArrowRight, Plus, Trash} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import pokemon from 'pokemon';
import Spinner from '@/components/spinner';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const pokemonComboboxOptions: ComboBoxOption[] = pokemon.all().map(pokemonName => ({
	value: pokemonName,
	label: pokemonName,
}));

function PokemonCard({first, selectedPokemon, onSelectedPokemon}: {first?: boolean, selectedPokemon: string, onSelectedPokemon: (newSelectedPokemon: string) => void}) {
	return (
		<Card className="space-y-2">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-semibold">{first ? 'Your pokemon' : 'Others pokemon'}</CardTitle>
			</CardHeader>
			<CardContent>
				<PokemonCombobox
					pokemonOptions={pokemonComboboxOptions}
					initialSelectedPokemon={selectedPokemon}
					onSelectedPokemon={newSelectedPokemon => onSelectedPokemon(newSelectedPokemon)}
				/>
			</CardContent>
		</Card>
	);
}

type PokemonTrade = {
	id: string,
	firstPokemon: string;
	secondPokemon: string;
};

function TradeStep({
	firstPokemon,
	secondPokemon,
	onDelete,
	step,
	onSelectedFirstPokemon,
	onSelectedSecondPokemon,
}:
{
	firstPokemon: string,
	secondPokemon: string,
	onDelete?: () => void,
	step: number,
	onSelectedFirstPokemon: (newSelectedPokemon: string) => void,
	onSelectedSecondPokemon: (newSelectedPokemon: string) => void,
}) {
	const [showDeleteTradeStepModal, setShowDeleteTradeStepModal] = useState(false);

	return (
		<div className="flex flex-row items-center align-middle justify-center space-x-4">
			<p className="text-slate-500 dark:text-slate-300 mr-4">
				#
				{step + 1}
			</p>
			<PokemonCard first={step === 0} selectedPokemon={firstPokemon} onSelectedPokemon={onSelectedFirstPokemon} />
			<ArrowRight className="text-slate-500 dark:text-slate-300" />
			<PokemonCard selectedPokemon={secondPokemon} onSelectedPokemon={onSelectedSecondPokemon} />
			<Button size="sm" variant="secondary" onClick={() => setShowDeleteTradeStepModal(true)} title="Delete step"><Trash className="w-4 h-4" /></Button>
			<AlertDialog open={showDeleteTradeStepModal} onOpenChange={setShowDeleteTradeStepModal}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete trade step?</AlertDialogTitle>
						<AlertDialogDescription>
							You cannot undo this action.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button onClick={onDelete}>
								Delete step
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default function Home() {
	const [pokemonTrades, setPokemonTrades] = useState<PokemonTrade[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const savedPokemonTrades = localStorage.getItem('pokemonTrades');
		if (savedPokemonTrades) {
			setPokemonTrades(JSON.parse(savedPokemonTrades));
		}
		setIsLoading(false);
	}, []);

	const onAddStep = () => {
		const lastPokemon = pokemonTrades.at(-1)?.secondPokemon ?? '';
		const newPokemonTrades = [...pokemonTrades, {id: crypto.randomUUID(), firstPokemon: lastPokemon, secondPokemon: ''}];
		setPokemonTrades(newPokemonTrades);
		localStorage.setItem('pokemonTrades', JSON.stringify(newPokemonTrades));
	};

	const onDeleteStep = (index: number) => {
		const newPokemonTrades = [...pokemonTrades.slice(0, index), ...pokemonTrades.slice(index + 1)];
		setPokemonTrades(newPokemonTrades);
		localStorage.setItem('pokemonTrades', JSON.stringify(newPokemonTrades));
	};

	const onSelectedFirstPokemon = (id: string, selectedPokemon: string) => {
		const newPokemonTrades = pokemonTrades.map(pokemonTrade => {
			if (pokemonTrade.id === id) {
				return {...pokemonTrade, firstPokemon: selectedPokemon};
			}
			return pokemonTrade;
		});
		setPokemonTrades(newPokemonTrades);
		localStorage.setItem('pokemonTrades', JSON.stringify(newPokemonTrades));
	};

	const onSelectedSecondPokemon = (id: string, selectedPokemon: string) => {
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
