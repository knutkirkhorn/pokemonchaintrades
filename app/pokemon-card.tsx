import React, {useEffect, useState} from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Eraser} from 'lucide-react';
import {ComboBoxOption, PokemonCombobox} from '@/components/pokemon-combobox';
import pokemon from 'pokemon';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
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
import {Input} from '@/components/ui/input';
import GameTravelSelector from '@/components/game-travel-selector';
import {Pokemon} from './types';

const pokemonComboboxOptions: ComboBoxOption[] = pokemon.all().map(pokemonName => ({
	value: pokemonName,
	label: pokemonName,
}));

// TODO: add tests for this function
// Example inputs:
// input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] -> `(1 - 10)`
// input: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] -> `(11 - 20)`
function getLevelRange(level: number) {
	if (Number.isNaN(level)) return '';

	const startRange = Math.max(1, Math.floor((level - 1) / 10) * 10 + 1);
	const endRange = Math.min(100, Math.ceil((level) / 10) * 10);
	return `(${startRange} - ${endRange})`;
}

export default function PokemonCard({first, selectedPokemon, onSelectedPokemon}: {first?: boolean, selectedPokemon: Pokemon, onSelectedPokemon: (newSelectedPokemon: Pokemon) => void}) {
	const [selectedPokemonName, setSelectedPokemonName] = useState(selectedPokemon.name);
	const [selectedPokemonLanguage, setSelectedPokemonLanguage] = useState(selectedPokemon.language);
	const [selectedPokemonLevel, setSelectedPokemonLevel] = useState(`${selectedPokemon.level === undefined ? '' : selectedPokemon.level}`);
	const [selectedPokemonGender, setSelectedPokemonGender] = useState(selectedPokemon.gender);
	const [showClearPokemonModal, setShowClearPokemonModal] = useState(false);

	useEffect(() => {
		setSelectedPokemonName(selectedPokemon.name);
		setSelectedPokemonLanguage(selectedPokemon.language);
		setSelectedPokemonLevel(`${selectedPokemon.level === undefined ? '' : selectedPokemon.level}`);
		setSelectedPokemonGender(selectedPokemon.gender);
	}, [selectedPokemon]);

	const onLevelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const parsedLevel = Number.parseInt(event.target.value, 10);

		// If the input contains a non-number character, reset the level
		if (Number.isNaN(parsedLevel)) {
			setSelectedPokemonLevel('');
			onSelectedPokemon({
				...selectedPokemon,
				level: undefined,
			});
			return;
		}

		// Set the level in the range 1 - 100
		const newLevel = Math.max(1, Math.min(100, parsedLevel));
		setSelectedPokemonLevel(`${newLevel}`);
		onSelectedPokemon({
			...selectedPokemon,
			level: newLevel,
		});
	};

	return (
		<>
			<Card className="space-y-2 shadow">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-semibold">{first ? 'Your pokémon' : 'Others pokémon'}</CardTitle>
					<Button
						size="sm"
						variant="secondary"
						title="Clear pokémon"
						className="text-xs"
						onClick={() => setShowClearPokemonModal(true)}
						disabled={
							selectedPokemon.name === ''
							&& selectedPokemon.language === ''
							&& selectedPokemon.level === undefined
							&& selectedPokemon.gender === ''
							&& selectedPokemon.canTravelTo === undefined
						}
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
						onValueChange={selectedLanguage => {
							onSelectedPokemon({
								...selectedPokemon,
								language: selectedLanguage as Pokemon['language'],
							});
							setSelectedPokemonLanguage(selectedLanguage as Pokemon['language']);
						}}
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
					<div className="flex flex-row items-center space-x-2">
						<Input
							className="w-28"
							min={1}
							max={100}
							placeholder="Level"
							value={selectedPokemonLevel}
							onChange={onLevelInputChange}
						/>
						<span className=" text-sm">{getLevelRange(Number.parseInt(selectedPokemonLevel, 10))}</span>
					</div>
					<Select
						defaultValue={selectedPokemonGender}
						value={selectedPokemonGender}
						onValueChange={selectedGender => {
							onSelectedPokemon({
								...selectedPokemon,
								gender: selectedGender as Pokemon['gender'],
							});
							setSelectedPokemonGender(selectedGender as Pokemon['gender']);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="unset">Unset</SelectItem>
							<SelectItem value="female">Female</SelectItem>
							<SelectItem value="male">Male</SelectItem>
						</SelectContent>
					</Select>
					<GameTravelSelector
						games={selectedPokemon.canTravelTo}
						onChange={newGameTravels => {
							onSelectedPokemon({
								...selectedPokemon,
								canTravelTo: newGameTravels,
							});
						}}
					/>
				</CardContent>
			</Card>
			<AlertDialog open={showClearPokemonModal} onOpenChange={setShowClearPokemonModal}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Clear pokémon?</AlertDialogTitle>
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
									level: undefined,
									gender: '',
									canTravelTo: undefined,
								});
								setSelectedPokemonName('');
								setSelectedPokemonLanguage('');
								setSelectedPokemonLevel('');
								setSelectedPokemonGender('');
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
