import React, {useState} from 'react';
import {ArrowDown, ArrowRight, Trash} from 'lucide-react';

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
import {Button} from '@/components/ui/button';

import PokemonCard from './pokemon-card';
import {Pokemon} from './types';

export function TradeStep({
	firstPokemon,
	secondPokemon,
	onDelete,
	step,
	onSelectedFirstPokemon,
	onSelectedSecondPokemon,
	onSwapPokemon,
}: {
	firstPokemon: Pokemon;
	secondPokemon: Pokemon;
	onDelete?: () => void;
	step: number;
	onSelectedFirstPokemon: (newSelectedPokemon: Pokemon) => void;
	onSelectedSecondPokemon: (newSelectedPokemon: Pokemon) => void;
	onSwapPokemon?: () => void;
}) {
	const [showDeleteTradeStepModal, setShowDeleteTradeStepModal] =
		useState(false);

	return (
		<div className="flex flex-col md:flex-row items-center align-middle justify-center space-x-0 md:space-x-4 p-4 bg-card rounded-md border shadow">
			<p className="text-muted-foreground mr-4 hidden md:inline-block">
				#{step + 1}
			</p>
			<div className="flex flex-row md:hidden items-center justify-between w-full mb-4">
				<p className="text-muted-foreground mr-4">#{step + 1}</p>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => setShowDeleteTradeStepModal(true)}
					title="Delete step"
				>
					<Trash className="w-4 h-4" />
				</Button>
			</div>
			<div className="flex flex-col md:flex-row items-center align-middle justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
				<PokemonCard
					first={step === 0}
					selectedPokemon={firstPokemon}
					onSelectedPokemon={onSelectedFirstPokemon}
				/>
				<Button
					className="bg-transparent m-0 p-2 text-muted-foreground"
					variant="secondary"
					size="sm"
					onClick={onSwapPokemon}
					title="Swap pokémon"
				>
					<ArrowDown className="inline-block md:hidden" />
					<ArrowRight className="hidden md:inline-block" />
				</Button>
				<PokemonCard
					selectedPokemon={secondPokemon}
					onSelectedPokemon={onSelectedSecondPokemon}
				/>
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
			<AlertDialog
				open={showDeleteTradeStepModal}
				onOpenChange={setShowDeleteTradeStepModal}
			>
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
							<Button onClick={onDelete}>Delete step</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
