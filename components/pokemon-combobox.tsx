'use client';

import React, {useEffect, useState} from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';

export type ComboBoxOption = {
	index: number,
	value: string,
	label: string,
};

function getComboboxDisplay(selectedPokemon: string, pokemonOptions: ComboBoxOption[]) {
	const pokemon = pokemonOptions.find(currentPokemon => currentPokemon.value === selectedPokemon);

	if (!pokemon) return 'Select a Pokemon...';

	return (
		<>
			<Image
				width={40}
				height={40}
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.index + 1}.png`}
				alt={pokemon.label}
			/>
			{pokemon.label}
		</>
	);
}

export function PokemonCombobox({
	pokemonOptions,
	initialSelectedPokemon,
	onSelectedPokemon,
}: {
	pokemonOptions: ComboBoxOption[],
	initialSelectedPokemon: string,
	onSelectedPokemon: (pokemon: string) => void,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedPokemon, setSelectedPokemon] = useState(initialSelectedPokemon);

	useEffect(() => {
		setSelectedPokemon(initialSelectedPokemon);
	}, [initialSelectedPokemon]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={isOpen}
					className="w-full justify-between"
				>
					<div className="flex items-center gap-2">
						{selectedPokemon
							? getComboboxDisplay(selectedPokemon, pokemonOptions)
							: 'Select a Pokemon...'}
					</div>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Select a Pokemon..." />
					<CommandEmpty>No Pokemon found.</CommandEmpty>
					<CommandGroup>
						{pokemonOptions.map(currentPokemon => (
							<CommandItem
								key={currentPokemon.value}
								onSelect={() => {
									setSelectedPokemon(currentPokemon.value);
									setIsOpen(false);
									onSelectedPokemon(currentPokemon.value);
								}}
							>
								<Check
									className={cn(
										'mr-2 h-4 w-4',
										selectedPokemon === currentPokemon.value ? 'opacity-100' : 'opacity-0',
									)}
								/>
								<Image
									width={40}
									height={40}
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.index + 1}.png`}
									alt={currentPokemon.label}
								/>
								{currentPokemon.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
