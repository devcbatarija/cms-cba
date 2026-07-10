const { Programa, conn } = require("../db");

const backfillCategorias = async () => {
    try {
        await Programa.update({ categoria: "Adults" }, { where: { nombre: "Adults" } });
        await Programa.update({ categoria: "Children" }, { where: { nombre: "Children" } });
        await Programa.update({ categoria: "Teens" }, { where: { nombre: "Teens" } });

        console.log("✅ Categorías actualizadas correctamente.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error al actualizar categorías:", error);
        process.exit(1);
    }
};

backfillCategorias();