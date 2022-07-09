import express from "express";
import homeControllers from "../controllers/homeControllers";
import userControllers from "../controllers/userControllers";

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', homeControllers.getHomePage);
    router.get('/crud', homeControllers.getCRUD);
    router.post('/crud-post', homeControllers.postCRUD);
    router.get('/crud-get', homeControllers.displayGetCRUD);
    router.get('/crud-edit', homeControllers.getEditCRUD);
    router.post('/crud-put', homeControllers.putCRUD);
    router.get('/crud-delete', homeControllers.deleteCRUD);

    router.post('/api/login', userControllers.handleLogin);

    // router.post('/api/login', userControllers.handleLogin);

    
    router.get('/baodeptrai', (req, res) => {
        return res.send('hello world bao dep trai')
    });
    return app.use("/",router);
    
}

module.exports = initWebRouter;