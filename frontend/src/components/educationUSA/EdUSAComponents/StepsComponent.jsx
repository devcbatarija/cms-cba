export default function Steps({ steps, index, type, description, color }) {
    const chevronStyle = {
        width: "0",
        // height: "0",
        borderTop: "16px solid transparent",
        borderBottom: "16px solid transparent",
        position: "absolute",
    };

    const circleStyle = {
        // display: "inline-block",
        // backgroundColor: color,  // Aplicar el color al círculo
        // borderRadius: "50%",
        margin: "0 10px",
        color: "white"
    };

    const rectangleStyleRight = {
        // display: "inline-block",
        backgroundColor: color,  // Aplicar el color al rectángulo derecho
        // height: "27px",
        margin: "0",
        position: "relative",
        color: "white"
    };

    const rectangleStyleLeft = {
        // display: "inline-block",
        backgroundColor: color,  // Aplicar el color al rectángulo izquierdo
        // height: "27px",
        margin: "0",
        position: "relative",
        color: "white"
    };

    return (
        <div className="text-center">
            <div className="flex w-full">
                <div className="flex justify-center font-bold uppercase items-center w-5/12 h-8" style={{ ...rectangleStyleLeft }}>
                    <div
                        style={{
                            ...chevronStyle,
                            borderRight: "10px solid white",
                            right: 0,
                        }}
                    ></div>
                    <p>{steps}</p>
                </div>
                <div className="flex justify-center font-bold uppercase items-center w-2/12 h-8 " style={circleStyle}>
                    <p
                    style={{
                        backgroundColor:color
                    }}
                    className="rounded-2xl w-full h-full"
                    >{index}</p>
                </div>
                <div className="flex justify-center font-bold uppercase items-center w-5/12 h-8" style={{ ...rectangleStyleRight,}}>
                    <div
                        style={{
                            ...chevronStyle,
                            borderLeft: "10px solid white",
                            left: 0,
                        }}
                    ></div>
                    <p>{type}</p>
                </div>
            </div>
            <div className="text-justify   pb-3 pl-10 pr-10 pt-3">
                <p>{description}</p>
            </div>
        </div>
    );
}
