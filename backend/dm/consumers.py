# dackend/dm/consumer.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async
from .models import DirectMessage

User = get_user_model()

class DMConsumer(AsyncWebsocketConsumer):
    
    # 1対1チャット用。
    # ws://localhost:8000/ws/dm/<相手ユーザーID>/

    async def connect(self):
        # URLのパラメータとして user_id が来る想定
        self.other_username = self.scope['url_route']['kwargs']['username']
        self.user = self.scope['user']  # ログイン中のユーザー
        print(f"DMConsumer connect: {self.user.username} -> username= {self.other_username}")

        if self.user.is_anonymous:
            # 未ログインなら接続拒否
            print("User is anonymous.")
            await self.close()
            return
        
        try:
            recipient = await sync_to_async(User.objects.get)(username=self.other_username)
            self.other_user_id = recipient.id
            print(f"✅ Recipient found: {recipient.username} (ID: {recipient.id})")
        except User.DoesNotExist:
            print(f"❌ Error: Recipient with username {self.other_username} does not exist.")
            await self.close()
            return

        self.room_name = f"dm_{min(self.user.id, self.other_user_id)}_{max(self.user.id, self.other_user_id)}"
        print(f"✅ Room name: {self.room_name}")
    
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        # テキストメッセージを受け取る
        if text_data is not None:
            data = json.loads(text_data)
            message_content = data.get('content')
            # DBに保存
            dm_obj = await self.save_dm(message_content)

            if dm_obj is None:
                print("❌ Message was not saved due to an error.")
                return 


            # 他方にもブロードキャスト
            await self.channel_layer.group_send(
                self.room_name,
                {
                    'type': 'dm_message',
                    'dm_id': dm_obj.id,
                    'content': message_content,
                    'sender_id': self.user.id
                }
            )

    async def dm_message(self, event):
        """
        グループ内の全クライアントにメッセージを転送
        """
        await self.send(json.dumps({
            'dm_id': event['dm_id'],
            'content': event['content'],
            'sender_id': event['sender_id']
        }))

    @sync_to_async
    def save_dm(self, content):
        try:
            recipient = User.objects.get(id=int(self.other_user_id))
            print(f"✅ Saving message: sender={self.user.id}, recipient={recipient.id}")
        except User.DoesNotExist:
            print(f"Error: recipient user {self.other_user_id} does not exist")
            return None

        return DirectMessage.objects.create(
            sender=self.user,
            recipient=recipient,
            content=content
        )
