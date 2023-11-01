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
import {
	ArrowDown,
	ArrowRight,
	Eraser,
	Plus,
	Trash,
} from 'lucide-react';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const pokemonComboboxOptions: ComboBoxOption[] = pokemon.all().map(pokemonName => ({
	value: pokemonName,
	label: pokemonName,
}));

type Pokemon = {
	name: string;
	language: '' | 'english' | 'spanish' | 'french' | 'german' | 'italian' | 'japanese' | 'korean' | 'chinese_simplified' | 'chinese_traditional';
};

function PokemonCard({first, selectedPokemon, onSelectedPokemon}: {first?: boolean, selectedPokemon: Pokemon, onSelectedPokemon: (newSelectedPokemon: Pokemon) => void}) {
	const [selectedPokemonName, setSelectedPokemonName] = useState(selectedPokemon.name);
	const [selectedPokemonLanguage, setSelectedPokemonLanguage] = useState(selectedPokemon.language);
	const [showClearPokemonModal, setShowClearPokemonModal] = useState(false);

	return (
		<>
			<Card className="space-y-2">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-semibold">{first ? 'Your pokemon' : 'Others pokemon'}</CardTitle>
					<Button
						size="sm"
						variant="secondary"
						title="Clear pokemon"
						className="text-xs"
						onClick={() => setShowClearPokemonModal(true)}
					>
						<Eraser className="w-4 h-4 p-0 m-0" />
					</Button>
				</CardHeader>
				<CardContent className="space-y-2">
					<PokemonCombobox
						pokemonOptions={pokemonComboboxOptions}
						initialSelectedPokemon={selectedPokemonName}
						onSelectedPokemon={newSelectedPokemon => {
							onSelectedPokemon({
								...selectedPokemon,
								name: newSelectedPokemon,
							});
							setSelectedPokemonName(newSelectedPokemon);
						}}
					/>
					<Select
						defaultValue={selectedPokemonLanguage}
						value={selectedPokemonLanguage}
						onValueChange={selectedLanguage => onSelectedPokemon({
							...selectedPokemon,
							language: selectedLanguage as Pokemon['language'],
						})}
					>
						<SelectTrigger>
							<SelectValue placeholder="Language" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="english">ENG</SelectItem>
							<SelectItem value="spanish">SP-EU</SelectItem>
							<SelectItem value="french">FRE</SelectItem>
							<SelectItem value="german">GER</SelectItem>
							<SelectItem value="italian">ITA</SelectItem>
							<SelectItem value="japanese">JPN</SelectItem>
							<SelectItem value="korean">KOR</SelectItem>
							<SelectItem value="chinese_simplified">CHS</SelectItem>
							<SelectItem value="chinese_traditional">CHT</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>
			<AlertDialog open={showClearPokemonModal} onOpenChange={setShowClearPokemonModal}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Clear pokemon?</AlertDialogTitle>
						<AlertDialogDescription>
							You cannot undo this action.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button onClick={() => {
								onSelectedPokemon({
									...selectedPokemon,
									name: '',
									language: '',
								});
								setSelectedPokemonName('');
								setSelectedPokemonLanguage('');
							}}
							>
								Clear pokemon
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

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

function TradeStep({
	firstPokemon,
	secondPokemon,
	onDelete,
	step,
	onSelectedFirstPokemon,
	onSelectedSecondPokemon,
}:
{
	firstPokemon: Pokemon,
	secondPokemon: Pokemon,
	onDelete?: () => void,
	step: number,
	onSelectedFirstPokemon: (newSelectedPokemon: Pokemon) => void,
	onSelectedSecondPokemon: (newSelectedPokemon: Pokemon) => void,
}) {
	const [showDeleteTradeStepModal, setShowDeleteTradeStepModal] = useState(false);

	return (
		<div className="flex flex-col md:flex-row items-center align-middle justify-center space-x-0 md:space-x-4 p-4 bg-slate-300 dark:bg-slate-700 rounded-md shadow">
			<p className="text-slate-600 dark:text-slate-300 mr-4 hidden md:inline-block">
				#
				{step + 1}
			</p>
			<div className="flex flex-row md:hidden items-center justify-between w-full mb-4">
				<p className="text-slate-600 dark:text-slate-300 mr-4">
					#
					{step + 1}
				</p>
				<Button size="sm" variant="secondary" onClick={() => setShowDeleteTradeStepModal(true)} title="Delete step"><Trash className="w-4 h-4" /></Button>
			</div>
			<div className="flex flex-col md:flex-row items-center align-middle justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
				<PokemonCard first={step === 0} selectedPokemon={firstPokemon} onSelectedPokemon={onSelectedFirstPokemon} />
				<ArrowDown className="inline-block md:hidden text-slate-600 dark:text-slate-300" />
				<ArrowRight className="hidden md:inline-block text-slate-600 dark:text-slate-300" />
				<PokemonCard selectedPokemon={secondPokemon} onSelectedPokemon={onSelectedSecondPokemon} />
				<Button
					size="sm"
					variant="secondary"
					onClick={() => setShowDeleteTradeStepModal(true)}
					title="Delete step"
					className="hidden md:inline-block"
				>
					<Trash className="w-4 h-4" />
				</Button>
			</div>
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
