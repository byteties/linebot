const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {2sWN7r6ryLD/Zn/jb4eli5F+RYxneBNHyFcv6cruKRKgyV9GkWDxuOYGp86fLgKEgYEnFYV67E6JR/sP2RdtJoJK3Oj9xoL7uqoEJgxA343g+HQOMg/p6TAAZgTSuVuVhHCm/abDFQiC5zZZKM6AgwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: {
            "type": "bubble", // ①
            "body": { // ②
              "type": "box", // ③
              "layout": "horizontal",　// ④
              "contents": [ // ⑤
                {
                  "type": "text", // ⑥
                  "text": "Hello,"
                },
                {
                  "type": "text", // ⑥
                  "text": "World!"
                }
              ]
            }
          }
    }, (err, res, body) => {
        // console.log('status = ' + res.statusCode);
    });
}