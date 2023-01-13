import json
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from api.models import FreeLancer,Client
from .models import Messages
User=get_user_model()

class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self,data):
        print("fetch")
        messages=Messages.last_10_messages(self)
        content={
           'messages': self.messages_to_json(messages)
        }
        self.send_message(content)
    def messages_to_json(self,messages):
        result=[]
        for message in messages:
            result.append(self.message_to_json(message))
        return result
    def message_to_json(self,message):
        return {
            "client":message.client.user.first_name,
            "freelancer":message.freelancer.user.first_name,
            "content":message.content,
            "timestamp":message.timestamp
        }
            
    def new_messages(self,data):
        email_of_client=data['emailc']
        email_of_freelancer=data['emailf']
        client_user=User.objects.get(email=email_of_client)
        freelancer_user=User.objects.get(email=email_of_freelancer)
        client=Client.objects.get(user=client_user)
        freelancer=FreeLancer.objects.get(user=freelancer_user)
        message=Messages.objects.create(client=client,freelancer=freelancer,content=data['message'])
        content={
            "command":"new_message",
            "message":self.message_to_json(message)
        }
        return self.send_chat_message(content)
        

    commands={
        'fetch_messages':fetch_messages,
        'new_messages':new_messages
    }
        
    def connect(self):
        print("hello")
        #obbaining room_name params from the url route(chat/routing.py)
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        print("text",text_data)
        data = json.loads(text_data)
        print(data)
        self.commands[data['command']](self,data)
        
    def send_chat_message(self,message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

    # Receive message from room group
    def send_message(self,message):
        self.send(text_data=json.dumps(message))
    def chat_message(self, event):
        message = event["message"]
        print(message,"send chat")

        # Send message to WebSocket
        self.send(text_data=json.dumps(message))