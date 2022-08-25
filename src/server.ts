import { serverHttp } from "./http";

// Importando a pasta do websocket para que tudo nele fique no ar junto o servidor;
import "./websocket";

serverHttp.listen(3000, () => {
    console.log("Server is running on PORT 3000");
})