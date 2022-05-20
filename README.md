520到了，身为程序员的大直男们同胞们还不知道如何表白？

<!-- more -->

<p><img src="https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/biaobai/pageemail.jpg" /></p>

#### 一个简单的信封表白程序由前端原生js + 后端nodejs（接收邮件）
#### 程序体验
<p>微信扫描二维码体验</p>
<p><img src="https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/biaobai/bbqr.png" /></p>

#### 前端介绍
<p>如果点击了跳动的爱心，会开始放烟花来庆祝，否则退出程序到信封页面</p>

<p>表白信封下面的两颗心代表同意和拒绝，会发送请求给后端，进行邮件通知。</p>

```js
// 点击爱心发送请求
// type:0 点击了爱心，type:1 点击了心碎
// email： 点击心后将发送通知邮箱告知是否表白成功
agree.onclick = function() {
    console.log('爱心发送~接受爱意');
    let type = 0
    let email = '3067881369@qq.com'
    request(type, email).then(res=> {
        // console.log(res)
        if(res.data.code == 200) {
            // 开始放烟花
            fireworks()
            localStorage.setItem('isok', true)
            document.querySelector('.love_wrap').remove()
        }
    })
    hint('对方已经收到你的心意~')
}
cancel.onclick = function() {
    console.log('爱心发送~拒绝爱意');
    let type = 1
    let email = '3067881369@qq.com'
    request(type, email).then(res=> {
        // console.log(res)
        hint('来日方长，江湖再见~')
        localStorage.setItem('isok', false)
        document.querySelector('.love_wrap').remove()
        document.querySelector('.wrap_books').classList.add('removesDispaly')
        close()
    })
}
```

<p><img src="https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/biaobai/email.png" /></p>


```js
// 这里发送请求采用的axios模块，封装一个promise
<script src="./public/axios.min.js"></script>
function request(type, email) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',//提交方法
            url: 'http://124.223.198.104:3123/api/smsemail',//提交地址
            params: {
                type,
                email
            }
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
```
<p>爱心只可点一次，会记录本地存储（机会只有一次），如果再想点的话，就得清空浏览器或者微信缓存</p>

#### 烟花效果的实现

```js
const list = ["red", "yellow", "green", "blue", "orange", "black",
    "LightPink","Magenta","DarkSlateBlue","MediumBlue","DoderBlue",
    "PaleGodenrod","Salmon","IndianRed","Maroon","DimGray",
    "OrangeRed","LightSalmon","Chocolate","DarkGreen","Lime",
    "Gold","Magenta","LawnGreen","MediumBlue","RoyalBlue",
    "PaleGreen","SeaGreen","Turquoise","DarkTurquoise","DeepSkyBlue",
    "Aqua","LightGoldenrodYellow"]; //颜色

var Number = 30 //数量  太大会奔溃
var magnitude = 200 //绽放大小范围 PX
const size = [10, 15] //小球大小范围 PX
const velocity = 1;  //停留时间  S
var timeli = 0.5;  //烟花发射速度 S
var sotp = false  //停止烟花
var timeList ; //计时器
function method(x, y,e) {
    const box = document.createElement("div");
    box.className = 'div'
    box.id = 'item'+e
    box.style.left = x + "px";
    box.style.top = y + "px";
    box.style.width = magnitude + "px"
    box.style.height = magnitude + "px"
    document.querySelector('.wrap_books').appendChild(box);
    const div = document.getElementById(`item${e}`)
    for (let i = 0; i < Number; i++) {
        const index = Math.floor(Math.random() * list.length);
        const a = Math.floor(Math.random() * (size[0] - size[1])) + size[1]
        const color = list[index];
        const bondsman = document.createElement("span");
        bondsman.classList.add("bondsman");
        bondsman.style.background = color;
        bondsman.style.left = '50%';
        bondsman.style.top = '50%';
        bondsman.style.width = a + 'px';
        bondsman.style.height = a + 'px';
        bondsman.style.transition = velocity + 's';
        bondsman.style.opacity = 0
        div.appendChild(bondsman);
    }
    const time = velocity * 1000
    const span = div.getElementsByClassName("bondsman");
    setTimeout(() => {
        for (let i = 0; i < span.length; i++) {
            if (Math.round(Math.random())) {
                span[i].style.left = Math.floor(Math.random() * (100 - 0)) + 0 + '%'
                span[i].style.top = Math.floor(Math.random() * (100 - 0)) + 0 + '%'
                span[i].style.opacity = 1
            } else {
                span[i].style.left = Math.floor(Math.random() * (100 - 0)) + 0 + '%'
                span[i].style.top = Math.floor(Math.random() * (100 - 0)) + 0 + '%'
                span[i].style.opacity = 1
            }
            setTimeout(() => {
                span[i].style.opacity = 0;
            }, time / 2)
        }
    }, 100)

    setTimeout(() => {
        document.querySelector('.wrap_books').removeChild(div)
    }, time + 100)
}
function wire(e) {
    return new Promise((resolve)=>{
    const box = document.createElement("div");
    box.className = 'span'
        box.id = 'index'+e
    box.style.left = Math.floor(Math.random() * (90 - 10)) + 10 + '%'
    box.style.top = '100%'
    box.style.transition = velocity + 's'
        box.opacity = 0;
    document.querySelector('.wrap_books').appendChild(box);
    const span = document.getElementById(`index${e}`)
    setTimeout(() => {
        span.style.top = Math.floor(Math.random() * (50 - 15)) + 15 + '%'
    }, 200)
        setTimeout(() => {
            span.opacity = 1;
        }, 300)
    setTimeout(() => {
        let data = {
            span:span,e:e}
        resolve(data)
    }, velocity * 1000 + 100)
    })
}

function fireworks(){
    I = 0
    timeList = setInterval(() => {
        wire(I++).then((data)=>{
            method(data.span.offsetLeft, data.span.offsetTop,data.e)
            setTimeout(()=>{
                document.querySelector('.wrap_books').removeChild(data.span)
            },100)
        })
    }, timeli*1000)
}

function closefireworks(){
    clearInterval(timeList)
    stop = false
}
```

#### 后端介绍
<p>后端使用`express`框架搭建服务，发送邮箱使用 `nodemailer` 模块,跨域采用`cors`模块</p>

```js
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
```
#### 部署
<p>小编在腾讯云买的服务器，前端建了站点挂载静态页面，后端使用pm2管理进程</p>

#### 推荐工具--草料二维码
* [草料二维码](https://www.coderutil.com/) 
<p>将部署好的前端项目地址生成二维码，然后发送给爱慕已久的女神，诚意满满~</p>

#### 完整项目地址
* [see github](https://github.com/huazizhanyes/confession/) 