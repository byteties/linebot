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
    let body

    if(msg === 'hello')
    {
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [
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
        })
    } else if(msg === 'order') {
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [
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
                          "text": "ขอรายละเอียด"
                        },
                        {
                          "type": "message",
                          "label": "No",
                          "text": "อื่นๆ"
                        }
                    ]
                }
              }
            ]
        })
    } else if(msg === "ขอรายละเอียด") {
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [
                {
                  "type": "flex",
                  "altText": "This is a Flex Message",
                  "contents": {
                    "type": "carousel",
                    "contents": [
                      {
                        "type": "bubble",
                        "hero": {
                          "type": "image",
                          "size": "full",
                          "aspectRatio": "20:13",
                          "aspectMode": "cover",
                          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png"
                        },
                        "body": {
                          "type": "box",
                          "layout": "vertical",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Arm Chair, White",
                              "wrap": true,
                              "weight": "bold",
                              "size": "xl"
                            },
                            {
                              "type": "box",
                              "layout": "baseline",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "$49",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "xl",
                                  "flex": 0
                                },
                                {
                                  "type": "text",
                                  "text": ".99",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "sm",
                                  "flex": 0
                                }
                              ]
                            }
                          ]
                        },
                        "footer": {
                          "type": "box",
                          "layout": "vertical",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "button",
                              "style": "primary",
                              "action": {
                                "type": "uri",
                                "label": "Add to Cart",
                                "uri": "https://linecorp.com"
                              }
                            },
                            {
                              "type": "button",
                              "action": {
                                "type": "uri",
                                "label": "Add to wishlist",
                                "uri": "https://linecorp.com"
                              }
                            }
                          ]
                        }
                      },
                      {
                        "type": "bubble",
                        "hero": {
                          "type": "image",
                          "size": "full",
                          "aspectRatio": "20:13",
                          "aspectMode": "cover",
                          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png"
                        },
                        "body": {
                          "type": "box",
                          "layout": "vertical",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Metal Desk Lamp",
                              "wrap": true,
                              "weight": "bold",
                              "size": "xl"
                            },
                            {
                              "type": "box",
                              "layout": "baseline",
                              "flex": 1,
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "$11",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "xl",
                                  "flex": 0
                                },
                                {
                                  "type": "text",
                                  "text": ".99",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "sm",
                                  "flex": 0
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": "Temporarily out of stock",
                              "wrap": true,
                              "size": "xxs",
                              "margin": "md",
                              "color": "#ff5551",
                              "flex": 0
                            }
                          ]
                        },
                        "footer": {
                          "type": "box",
                          "layout": "vertical",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "button",
                              "flex": 2,
                              "style": "primary",
                              "color": "#aaaaaa",
                              "action": {
                                "type": "uri",
                                "label": "Add to Cart",
                                "uri": "https://linecorp.com"
                              }
                            },
                            {
                              "type": "button",
                              "action": {
                                "type": "uri",
                                "label": "Add to wish list",
                                "uri": "https://linecorp.com"
                              }
                            }
                          ]
                        }
                      },
                      {
                        "type": "bubble",
                        "body": {
                          "type": "box",
                          "layout": "vertical",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "button",
                              "flex": 1,
                              "gravity": "center",
                              "action": {
                                "type": "uri",
                                "label": "See more",
                                "uri": "https://linecorp.com"
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]        
        })
    } else if(msg==="เมนู"){
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [
                {
                  "type": "flex",
                  "altText": "This is a Flex Message",
                  "contents": {
                    "type": "bubble",
                    "hero": {
                      "type": "image",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
                      "size": "full",
                      "aspectRatio": "20:13",
                      "aspectMode": "cover",
                      "action": {
                        "type": "uri",
                        "uri": "https://linecorp.com"
                      }
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "md",
                      "action": {
                        "type": "uri",
                        "uri": "https://linecorp.com"
                      },
                      "contents": [
                        {
                          "type": "text",
                          "text": "Brown's Burger",
                          "size": "xl",
                          "weight": "bold"
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "box",
                              "layout": "baseline",
                              "contents": [
                                {
                                  "type": "icon",
                                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_regular_32.png"
                                },
                                {
                                  "type": "text",
                                  "text": "$10.5",
                                  "weight": "bold",
                                  "margin": "sm",
                                  "flex": 0
                                },
                                {
                                  "type": "text",
                                  "text": "400kcl",
                                  "size": "sm",
                                  "align": "end",
                                  "color": "#aaaaaa"
                                }
                              ]
                            },
                            {
                              "type": "box",
                              "layout": "baseline",
                              "contents": [
                                {
                                  "type": "icon",
                                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_large_32.png"
                                },
                                {
                                  "type": "text",
                                  "text": "$15.5",
                                  "weight": "bold",
                                  "margin": "sm",
                                  "flex": 0
                                },
                                {
                                  "type": "text",
                                  "text": "550kcl",
                                  "size": "sm",
                                  "align": "end",
                                  "color": "#aaaaaa"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "text",
                          "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
                          "wrap": true,
                          "color": "#aaaaaa",
                          "size": "xxs"
                        }
                      ]
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "spacer",
                          "size": "xxl"
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "color": "#905c44",
                          "action": {
                            "type": "uri",
                            "label": "Add to Cart",
                            "uri": "https://linecorp.com"
                          }
                        }
                      ]
                    }
                  }
                }
              ]        
        })
    }
    else {
        body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
                type: 'text',
                text: msg + ': เป็นคำสั่งที่ไม่ถูกต้อง'
            }]
        })
    }

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}