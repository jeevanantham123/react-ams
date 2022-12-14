import Appointments from "@components/Appointments";
import Pagelayout from "@components/Pagelayout";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Pagelayout>
      <Appointments />
    </Pagelayout>
  );
};

export default HomePage;
