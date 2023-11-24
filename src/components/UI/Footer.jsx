import React from "react";

const Footer = () => {
	return (
		<div className="bg-red-500 text-white p-6 mt-10 pr-20 py-10">
			<div className="container mx-auto flex justify-between items-center">
				<div>
					<h2 className="text-7xl font-bold mb-2 uppercase">
						Oddity
					</h2>
					<p className="text-3xl">May the odds be in your favour!</p>
				</div>
				<div className="flex gap-10">
					<div>
						<h3 className="text-2xl font-semibold mb-2">
							Quick Links
						</h3>
						<ul className="list-none p-0 m-0 text-lg">
							<li className="mb-1">
								<a href="/">Home</a>
							</li>
							<li className="mb-1">
								<a href="/events">Events</a>
							</li>
							<li className="mb-1">
								<a href="/sportsbook">Sports Book</a>
							</li>
							<li className="mb-1">
								<a href="https://i.pinimg.com/736x/62/cf/01/62cf014609eea4aeead02de3e14a9ef3.jpg">
									Terms & Conditions
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-2xl font-semibold mb-2">
							Follow Us
						</h3>
						<ul className="list-none p-0 m-0 text-lg">
							<li className="mb-1">
								<a href="https://twitter.com/">Twitter</a>
							</li>
							<li className="mb-1">
								<a href="https://www.facebook.com/">Facebook</a>
							</li>
							<li className="mb-1">
								<a href="https://www.instagram.com/">
									Instagram
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
