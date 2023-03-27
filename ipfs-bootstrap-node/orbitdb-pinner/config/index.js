import defaultconfig from './default.js'
import production from './production.js'
export default process.env.NODE_ENV !== 'production' ? defaultconfig : production

