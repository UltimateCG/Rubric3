const express = require("express")
const app = express()
const port = 3001
const fs = require('fs');
const path = require('path');
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.post("/data", (req, res) => {
    console.log(req.body);
    const { id, nombre, apellido, titulo, autor, editorial, anyo_publicacion } = req.body;

    if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !anyo_publicacion) {
        return res.redirect("/error.html");
    }

    const contenido = `ID: ${id}\nNombre: ${nombre}\nApellido: ${apellido}\nTítulo: ${titulo}\nAutor: ${autor}\nEditorial: ${editorial}\nAño de publicación: ${anyo_publicacion}\n`;
    const nombreArchivo = `id_${id}.txt`;
    const rutaArchivo = path.join(__dirname, "public", "data", nombreArchivo);

    fs.writeFile(rutaArchivo, contenido, (err) => {
        if (err) {
            console.error("Error al guardar el archivo:", err);
            return res.status(500).send("Error al guardar el archivo.");
        }
        res.redirect(`/download/${nombreArchivo}`);
    });
});

app.get("/download/:nombreArchivo", (req,res) =>{
    const rutaArchivo = path.join(__dirname, "public", "data", req.params.nombreArchivo);
    res.download(rutaArchivo);
})

app.listen(port,()=>(console.log(`app ejecutándose en el puerto ${port}`)))