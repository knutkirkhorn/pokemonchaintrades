import React from 'react';
import {Github, Twitter} from 'lucide-react';
import ThemeSwitcherButton from './theme-switcher-button';
import {Button} from './ui/button';
import HeaderDropdown from './header-dropdown';

export default function Header() {
	return (
		<header className="flex flex-row mb-5">
			<h1 className="text-lg font-bold text-center text-gray-800 dark:text-slate-100">
				Pokemon
				ChainTrades
			</h1>
			<div className="flex justify-end items-center w-full mb-8 sm:mb-0">
				<HeaderDropdown />
				<nav className="hidden sm:flex space-x-4">
					<ThemeSwitcherButton />
					<Button asChild>
						<a
							href="https://github.com/knutkirkhorn/pokemonchaintrades"
							rel="noopener noreferrer"
							target="_blank"
						>
							<Github className="w-4 h-4" />
						</a>
					</Button>
					<Button asChild>
						<a
							href="https://twitter.com/knutkirkhorn"
							rel="noopener noreferrer"
							target="_blank"
						>
							<Twitter className="w-4 h-4" />
						</a>
					</Button>
				</nav>
			</div>
		</header>
	);
}
