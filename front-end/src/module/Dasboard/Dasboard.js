import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import GaugeComponent from "react-gauge-component";
const Dasboard = () => {
    const { payload } = useContext(DataContext);
    console.log(payload);
    return (
        <>
            <GaugeComponent
                style={{ width: "50%", height: "50%", margin: "0 auto" }}
                id="simple-gauge"
                value={payload.message}
                labels={{
                    markLabel: {
                        marks: [
                            { value: 20 },
                            { value: 50 },
                            { value: 80 },
                            { value: 100 },
                        ],
                    },
                }}
                needle={{ elastic: true }}
            />
        </>
    );
};
export default Dasboard;
