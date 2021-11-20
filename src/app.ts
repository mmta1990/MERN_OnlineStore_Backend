import * as express from 'express'
import { Application } from 'express'
import RouteService from './router/routeService'
import boot from './boot'
import startMiddlewares from './middlewares'

class App {
    private readonly app: Application;
    private readonly port: number;
    private readonly router: RouteService;
    constructor (port: number) {
      this.app = express()
      this.port = port
      this.router = new RouteService(this.app)
    }

    public start (): void {
      boot(this.app)
      this.router.run()
      startMiddlewares(this.app)
      this.app.listen(this.port, () => {
        console.log(`app instance is running on port: ${this.port}`)
      })
    }
}
export default App
