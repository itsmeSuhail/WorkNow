import { ScaleLoader } from 'react-spinners';
import "./Loader.scss"
function Loader() {
  return (
    <div className="loader">
      <ScaleLoader color="#1dbf73" />
    </div>
  );
}

export default Loader;