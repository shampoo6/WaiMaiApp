const sdk = require('./alipaySdk').getSdk()
const {v4: uuid} = require('uuid')
const express = require('express');
const cors = require('cors')
const path = require("path");
const app = express();

const config = require('./config')

app.use(cors())
app.use('/', express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// 获取支付宝订单字符串
app.post('/alipayOrderInfo', (req, res) => {
    const orderInfo = sdk.sdkExec('alipay.trade.app.pay', {
        // 支付完成后接收通知用的 url
        notify_url: config.serverUrl + '/alipayNotify',
        bizContent: {
            out_trade_no: uuid().replace(/-/g, ''),
            product_code: "FAST_INSTANT_TRADE_PAY",
            subject: "大乐透",
            body: "购买一个商品",
            total_amount: (Math.round(Math.random() * 10000) * 0.01).toFixed(2)
        }
    })
    res.json({orderInfo})
})

// 支付宝主动通知接口
app.post('/alipayNotify', (req, res) => {
    console.log('收到支付宝回调')
    console.log(req.body)
    console.log('商家订单号: ', req.body.out_trade_no)
    console.log('支付宝订单号: ', req.body.trade_no)
    // 验签
    const signRes = sdk.checkNotifySign(req.body);
    console.log('验签结果: ', signRes)
    res.json({msg: 'ok'})
})

// 支付宝订单查询接口
app.post('/alipayOrderQuery', async (req, res) => {
    // 获取商家订单号
    const {orderNo} = req.body
    // 调用查询订单api
    const result = await sdk.exec('alipay.trade.query', {
        bizContent: {
            out_trade_no: orderNo
        }
    });
    console.log(result)
    res.json(result)
})

// 支付宝卖家退款
app.post('/alipayRefund', async (req, res) => {
    // 获取商家订单号
    const {orderNo} = req.body
    // 查询订单
    let result = await sdk.exec('alipay.trade.query', {
        bizContent: {
            out_trade_no: orderNo
        }
    });
    // 退款
    result = await sdk.exec('alipay.trade.refund', {
        bizContent: {
            out_trade_no: orderNo,
            refund_amount: Number(result.totalAmount)
        }
    });
    console.log('退款结果')
    console.log(result)
    res.json(result)
})

// 支付宝手机网页支付
app.post('/wapPay', async (req, res) => {
    const result = sdk.sdkExec('alipay.trade.wap.pay', {
        notify_url: config.serverUrl + '/alipayNotify',
        bizContent: {
            out_trade_no: uuid().replace(/-/g, ''),
            product_code: "QUICK_WAP_WAY",
            subject: "大乐透",
            body: "购买一个商品",
            total_amount: (Math.round(Math.random() * 10000) * 0.01).toFixed(2)
        }
    });
    console.log(result)
    res.json({result})
})

app.listen(80, () => {
    console.log('server: http://127.0.0.1')
})