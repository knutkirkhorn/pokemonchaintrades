export type PokemonGame = 'lgpe' | 'swsh' | 'bdsp' | 'pla' | 'sv';

export type Pokemon = {
	name: string;
	language: '' | 'english' | 'spanish' | 'french' | 'german' | 'italian' | 'japanese' | 'korean' | 'chinese_simplified' | 'chinese_traditional';
	level?: number;
	gender: '' | 'unset' | 'female' | 'male';
	canTravelTo?: PokemonGame[];
};
