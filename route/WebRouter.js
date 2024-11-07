import express from 'express'
import aboutPage from '../controllers/AboutController'
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/about', aboutPage) // Gọi controller xử lý route
    return app.use('/', router)
}
export default initWebRoute


