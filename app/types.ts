export type Pokemon = {
	name: string;
	language: '' | 'english' | 'spanish' | 'french' | 'german' | 'italian' | 'japanese' | 'korean' | 'chinese_simplified' | 'chinese_traditional';
	level?: number;
	gender: '' | 'unset' | 'female' | 'male';
};
