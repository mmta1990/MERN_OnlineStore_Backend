/* eslint-disable no-unused-vars */
import { Application, Request, Response, Router } from 'express'
import authRouter from '../components/auth/AuthRouter'
import userAdminRouter from '../components/users/admin/usersRouter'
import userFrontRouter from '../components/users/front/Router'
import productsAdminRouter from '../components/product/admin/Router'
import productsFrontRouter from '../components/product/front/Router'
import categoriesAdminRouter from '../components/category/admin/CategoryRouter'
import categoriesRouter from '../components/category/front/Router'

import orderAdminRouter from '../components/order/admin/OrderRouter'
import orderFrontRouter from '../components/order/front/Router'
import couponAdminRouter from '../components/coupon/admin/CouponRouter'
import couponRouter from '../components/coupon/front/Router'
import paymentAdminRouter from '../components/payment/admin/PaymentRouter'
import paymentFrontRouter from '../components/payment/front/Router'
import shipmentRouter from '../components/shipment/ShipmentRouter'
import settingRouter from '../components/settings/SettingRouter'
import commentRouter from '../components/comments/CommentRouter'
import purchaseRouter from '../components/purchase/Router'
import homeRouter from '../components/home/Router'
import RouteEngine from './router'

class RouteService {
    private app: Application;
    private router: RouteEngine;

    public constructor (app: Application) {
      this.app = app
      this.router = new RouteEngine()
      this.bindRouters()
    }

    public bindRouters () {
      // admin
      this.router.registerRouter('/api/v1/admin/products', productsAdminRouter)
      this.router.registerRouter('/api/v1/admin/coupons', couponAdminRouter)
      this.router.registerRouter('/api/v1/admin/users', userAdminRouter)
      this.router.registerRouter('/api/v1/admin/payments', paymentAdminRouter)
      this.router.registerRouter('/api/v1/admin/orders', orderAdminRouter)
      this.router.registerRouter('/api/v1/admin/categories', categoriesAdminRouter)


      // front
      this.router.registerRouter('/api/v1/auth', authRouter)
      this.router.registerRouter('/api/v1/home', homeRouter)
      this.router.registerRouter('/api/v1/users', userFrontRouter)
      this.router.registerRouter('/api/v1/products', productsFrontRouter)
      this.router.registerRouter('/api/v1/categories', categoriesRouter)
      this.router.registerRouter('/api/v1/coupons', couponRouter)
      this.router.registerRouter('/api/v1/settings', settingRouter)
      this.router.registerRouter('/api/v1/shipments', shipmentRouter)
      this.router.registerRouter('/api/v1/payments', paymentFrontRouter)
      this.router.registerRouter('/api/v1/comments', commentRouter)
      this.router.registerRouter('/api/v1/purchase', purchaseRouter)
      this.router.registerRouter('/api/v1/orders', orderFrontRouter)

    }

    public run () {
      this.router.getRouters().forEach((router: Router, route: string) => {
        this.app.use(route, router)
      })
    }
}

export default RouteService
