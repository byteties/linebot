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
            text: ''
        }]
    })

    if(msg === 'hello')
    {
      body.messages = [
            {
              "type": "flex",
              "altText": "This is a Flex Message",
              "contents": {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Hello,"
                    },
                    {
                      "type": "text",
                      "text": "World!"
                    }
                  ]
                }
              }
            }
          ]        
    } else if(msg === 'order') {
        body.messages = [
            {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "คุณต้องการสั่งอาหารใช่ไหม ?",
                "actions": [
                    {
                      "type": "message",
                      "label": "Yes",
                      "text": "yes"
                    },
                    {
                      "type": "message",
                      "label": "No",
                      "text": "no"
                    }
                ]
            }
          }
        ]
    } else {
        body.messages = [msg + ': เป็นคำสั่งที่ไม่ถูกต้อง']
    }

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}