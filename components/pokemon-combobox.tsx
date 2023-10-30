'use client';

import React, {useState} from 'react';
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

export type ComboBoxOption = {
	value: string,
	label: string,
};

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

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={isOpen}
					className="w-[200px] justify-between"
				>
					{selectedPokemon
						? pokemonOptions.find(currentPokemon => currentPokemon.value === selectedPokemon)?.label
						: 'Select a Pokemon...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
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
								{currentPokemon.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
