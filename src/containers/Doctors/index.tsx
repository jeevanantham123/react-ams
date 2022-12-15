import Appointments from "@components/Appointments";
import Pagelayout from "@components/Pagelayout";

interface DoctorsPageProps {}

const DoctorsPage: React.FC<DoctorsPageProps> = () => {
  return (
    <Pagelayout>
      <Appointments />
    </Pagelayout>
  );
};

export default DoctorsPage;
