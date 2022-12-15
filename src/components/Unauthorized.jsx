import { useNavigate } from "react-router-dom";
import Pagelayout from "@components/Pagelayout";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Pagelayout>
      <div className="App">
        <section>
          <h1>Unauthorized</h1>
          <br />
          <p>You do not have access to the requested page.</p>
          <div className="flexGrow">
            <button onClick={goBack}>Go Back</button>
          </div>
        </section>
      </div>
    </Pagelayout>
  );
};

export default Unauthorized;
