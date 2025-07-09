import { Globe } from "lucide-react";
import React from "react";

const PrefencesTab = () => {
	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
				<Globe size={20} />
				<span>Preferences</span>
			</h2>

			<div className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Language
					</label>
					<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
						<option value="en">English</option>
						<option value="id">Bahasa Indonesia</option>
						<option value="zh">中文</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Currency
					</label>
					<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
						<option value="idr">Indonesian Rupiah (IDR)</option>
						<option value="usd">US Dollar (USD)</option>
						<option value="sgd">Singapore Dollar (SGD)</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Time Zone
					</label>
					<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
						<option value="asia/jakarta">Asia/Jakarta (WIB)</option>
						<option value="asia/makassar">
							Asia/Makassar (WITA)
						</option>
						<option value="asia/jayapura">
							Asia/Jayapura (WIT)
						</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default PrefencesTab;
