import React from 'react';

const Header = ({

}) => {
	return (
		<header className="bg-white shadow-md">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex justify-center items-center">
					<h1 className="text-4xl font-extrabold text-gray-900">Token Tracker by top price:</h1>
				</div>
			</div>
		</header>
	);
};

export default Header;
