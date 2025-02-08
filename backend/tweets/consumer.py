# backend/tweets/consumer.py

import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class TweetConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print("WebSocket connected!")
        # 全員が参加するグループ "tweets" としてみる
        await self.channel_layer.group_add("tweets", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("tweets", self.channel_name)

    async def receive_json(self, content):
        # クライアントからメッセージを受け取ったときの処理
        # 今回は特になにもしない
        pass

    async def tweet_message(self, event):
        # 送られてきた新着ツイート情報をクライアントにブロードキャスト
        await self.send_json({
            "type": "tweet_message",
            "tweet": event["tweet"],
        })

