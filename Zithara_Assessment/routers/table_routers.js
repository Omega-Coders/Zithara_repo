const Router = require('express')
const router = new Router()
const tableController = require('../controllers/table_con')

router.get('/customers', tableController.Table)


module.exports = router