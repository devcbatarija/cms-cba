const rectangleStyle1 = {
    width: "20px",
    height: "30px",
    position: "relative",
};

const chevronStyle1 = {
    width: "0",
    height: "0",
    borderTop: "20px solid transparent",
    borderBottom: "20px solid transparent",
    position: "absolute",
    left: "0"
};
export default function Flecha({color}) {
    return (
        <div className="flex p-3">
            <div style={rectangleStyle1}>
                <div
                    style={{
                        ...chevronStyle1,
                        borderRight: `20px solid ${color}`,
                        left: "0",
                    }}
                ></div>
            </div>
            <div className="flex gap-1">
                <div
                    style={{
                        width: "20px",
                        height: "40px",
                        backgroundColor: `${color}`
                    }}
                ></div>
                <div
                    style={{
                        width: "40px",
                        height: "40px",

                        backgroundColor: `${color}`
                    }}
                ></div>
            </div>
        </div>  
    );
}