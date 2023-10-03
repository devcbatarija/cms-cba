export default function Steps({ steps, index, type, description, color }) {
    const chevronStyle = {
        width: "0",
        height: "0",
        borderTop: "16px solid transparent",
        borderBottom: "16px solid transparent",
        position: "absolute",
    };

    const circleStyle = {
        display: "inline-block",
        backgroundColor: color,  // Aplicar el color al círculo
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        margin: "0 10px",
        color: "white"
    };

    const rectangleStyleRight = {
        display: "inline-block",
        backgroundColor: color,  // Aplicar el color al rectángulo derecho
        width: "300px",
        height: "30px",
        margin: "0",
        position: "relative",
        color: "white"
    };

    const rectangleStyleLeft = {
        display: "inline-block",
        backgroundColor: color,  // Aplicar el color al rectángulo izquierdo
        width: "100px",
        height: "30px",
        margin: "0",
        position: "relative",
        color: "white"
    };

    return (
        <div className="text-center">
            <div className="Titulo">
                <div style={{ ...rectangleStyleLeft, width: "30%" }}>
                    <div
                        style={{
                            ...chevronStyle,
                            borderRight: "10px solid white",
                            right: 0,
                        }}
                    ></div>
                    <p>{steps}</p>
                </div>
                <div style={circleStyle}>
                    <p>{index}</p>
                </div>
                <div style={{ ...rectangleStyleRight, width: "55%" }}>
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
            <div className="text-justify  pb-3 pl-10 pr-10 pt-3">
                <p>{description}</p>
            </div>
        </div>
    );
}
