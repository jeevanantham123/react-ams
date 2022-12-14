import Pagelayout from "@components/Pagelayout";
import Products from "@components/Products";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Pagelayout>
      <Products />
    </Pagelayout>
  );
};

export default HomePage;
