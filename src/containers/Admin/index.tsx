import Pagelayout from "@components/Pagelayout";
import Users from "@components/Users";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  return (
    <Pagelayout>
      <Users />
    </Pagelayout>
  );
};

export default AdminPage;
