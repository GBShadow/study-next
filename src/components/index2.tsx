import { GetServerSideProps } from 'next';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {

  return (
    <>
     <section>
       <h1>Products</h1>

       <ul>
         {recommendedProducts.map((product: IProduct) => (
           <li key={product.id}>{product.title}</li>
         ))}
       </ul>
     </section>
     </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async() => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json()

  return {
    props: {
      recommendedProducts
    }
  }
}
