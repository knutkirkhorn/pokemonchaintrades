import React, {useState} from 'react';
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
import {Pokemon} from './types';

const pokemonComboboxOptions: ComboBoxOption[] = pokemon.all().map(pokemonName => ({
	value: pokemonName,
	label: pokemonName,
}));

export default function PokemonCard({first, selectedPokemon, onSelectedPokemon}: {first?: boolean, selectedPokemon: Pokemon, onSelectedPokemon: (newSelectedPokemon: Pokemon) => void}) {
	const [selectedPokemonName, setSelectedPokemonName] = useState(selectedPokemon.name);
	const [selectedPokemonLanguage, setSelectedPokemonLanguage] = useState(selectedPokemon.language);
	const [showClearPokemonModal, setShowClearPokemonModal] = useState(false);

	return (
		<>
			<Card className="space-y-2">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-semibold">{first ? 'Your pokémon' : 'Others pokémon'}</CardTitle>
					<Button
						size="sm"
						variant="secondary"
						title="Clear pokémon"
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
