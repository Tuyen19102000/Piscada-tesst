import { False, True } from "../../asset";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
const Device = () => {
    const { payload } = useContext(DataContext);
    return <>{payload.message === "true" ? <True /> : <False />}</>;
};
export default Device;
