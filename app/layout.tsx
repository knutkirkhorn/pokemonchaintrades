import {ThemeProvider} from '@/components/theme-provider';
import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import React from 'react';
import {Analytics} from '@vercel/analytics/react';
import {Toaster} from '@/components/ui/toaster';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'PokemonChainTrades',
	description: 'Plan your perfect chain of Pokémon trades',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<Toaster />
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
