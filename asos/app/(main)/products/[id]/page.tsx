import { fetchProduct } from '@/app/lib/data';
import ProductDetail from '@/components/products/ProductDetail';
import { notFound } from 'next/navigation';

type Props = {
    params: { id: string; };
}

export default async function Page({ params }: Props) {
  const id = params.id;
  const product = await fetchProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductDetail product={product} />
    </main>
  );
}