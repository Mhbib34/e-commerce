// app/product/detail/[id]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { cookies } from "next/headers";

// Server-side API calls
async function getProductById(id: string) {
	try {
		// Gunakan API_BASE_URL (tanpa NEXT_PUBLIC_) untuk server-side
		const apiUrl = process.env.API_BASE_URL || "http://localhost:5000/api";
		const url = `${apiUrl}/product/${id}`;

		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		const res = await fetch(url, {
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch product: ${res.status}`);
		}

		const data = await res.json();

		return data;
	} catch (error) {
		console.error("❌ Error fetching product:", error);
		return null;
	}
}

async function getTopProducts() {
	try {
		const apiUrl = process.env.API_BASE_URL || "http://localhost:5000/api";
		const url = `${apiUrl}/product/top`;

		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		const res = await fetch(url, {
			cache: "no-store", // Ganti ke no-store untuk debugging
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		});

		if (!res.ok) {
			console.error("❌ API Error:", res.status, res.statusText);
			throw new Error(`Failed to fetch top products: ${res.status}`);
		}

		const data = await res.json();

		return data;
	} catch (error) {
		console.error("❌ Error fetching top products	:", error);
		return [];
	}
}

// Generate metadata for SEO
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;

	const product = await getProductById(id);

	if (!product) {
		return {
			title: "Product Not Found",
			description: "The requested product could not be found.",
		};
	}

	return {
		title: `${product.name} - ${product.brand}`,
		description: product.description,
		openGraph: {
			title: `${product.name} - ${product.brand}`,
			description: product.description,
			images: [
				{
					url: product.image,
					width: 1200,
					height: 630,
					alt: product.name,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${product.name} - ${product.brand}`,
			description: product.description,
			images: [product.image],
		},
	};
}

// Main server component
export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	// Fetch data on server
	const [product, topProducts] = await Promise.all([
		getProductById(id),
		getTopProducts(),
	]);

	// Handle product not found
	if (!product) {
		notFound();
	}

	return (
		<ProductDetailClient
			initialProduct={product.product}
			initialTopProducts={topProducts.product}
			productId={id}
		/>
	);
}
