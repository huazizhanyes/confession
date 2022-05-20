const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const app = express()
app.use(cors())
var options;
app.get('/api/smsemail', async(req, res) => {
    console.log(req.query)
    const email = req.query.email
    let mailTransport = nodemailer.createTransport({
        // host: 'smtp.qq.email',
        service: 'qq',
        secure: true,	//安全方式发送,建议都加上
        auth: {
            "user": '2585717148@qq.com', 		// 你自己的邮箱的邮箱地址
            "pass": 'oipsiempoxwveabh'
        }
    })
    
    if (req.query.type === "0") {
        options = {
            from: '2585717148@qq.com', // 发件人地址
            to: email, // 收件人地址，多个收件人可以使用逗号分隔
            subject: 'hzzy表白邮箱', // 邮件标题
            bcc: '密送',
            html: `
                <h1>尊贵的</h1>
                <p style="font-size: 18px;color:#000;">
                    喜结良缘
                </p>
                `
        }
    } else {
        options = {
            from: '2585717148@qq.com', // 发件人地址
            to: email, // 收件人地址，多个收件人可以使用逗号分隔
            subject: 'hzzy表白邮箱', // 邮件标题
            bcc: '密送',
            html: `
                <h1>尊贵的</h1>
                <p style="font-size: 18px;color:#000;">
                    拒绝，另寻良缘
                </p>
                `
        }
    }

    mailTransport.sendMail(options, function (err, msg) {
        if (err) {
            console.log(err);
            res.send({
                code: '201',
                message: "发送失败"
            });
        } else {
            res.send({
                code: '200',
                message: '心意已转达~'
            });
        }
    })
})

app.listen(3123, () => {
    console.log('running...');
})