import json
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from .serializers import MessageSerializer
from api.models import FreeLancer,Client
from .models import Message,Conversation
import json
User=get_user_model()
class Encoder(json.JSONEncoder):
    def default(self,obj):
        return json.JSONEncoder(self,obj)
class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status,
    and send notifications.
    """

    def __init__(self, *args, **kwargs):
        
        super().__init__(*args,**kwargs)
       
        self.user=None
        self.conversation_name=None
        self.conversation=None
    @classmethod
    def encode_json(cls, content):
        print(content)
        return json.dumps(content, cls=Encoder)

    def connect(self):
        self.user = self.scope['user']
        if not self.user.is_authenticated:
            return
        self.accept()
        print(self.scope['url_route'])
        self.conversation_name = f"{self.scope['url_route']['kwargs']['conversation_name']}"
        self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)
        async_to_sync(self.channel_layer.group_add)(
        self.conversation_name,
        self.channel_name,
    ) 
        messages = self.conversation.messages.all().order_by("-timestamp")[0:50]
        self.send_json({
    "type": "last_50_messages",
    "messages": MessageSerializer(messages, many=True).data,
})
    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)
    def chat_message_echo(self, event):
        #in this we are passing the message to send group by method
        print(event,"hai")
        self.send_json(event)
    def get_receiver(self):
        usernames=self.conversation_name.split("__")
        for username in usernames:
            if username != self.user.username:
                return User.objects.get(username=username)
    def receive_json(self, content, **kwargs):
        message_type=content["type"]
        if message_type == "chat_message":
            message=Message.objects.create(from_user=self.user,to_user=self.get_receiver(),
                                           content=content["message"],
                                           conversation=self.conversation
                                           )
            async_to_sync(self.channel_layer.group_send)(
            self.conversation_name,
            {
                "type": "chat_message_echo",
                "name": self.user.username,
                "message": MessageSerializer(message).data,
            },
        )
        print(message_type)
        return super().receive_json(content, **kwargs)





# class ChatConsumer(JsonWebsocketConsumer):
#     def fetch_messages(self,data):
#         self.user=self.scope["user"]
#         print(self.user)
#         print("fetch")
#         messages=Messages.last_10_messages(self)
#         content={
#            'messages': self.messages_to_json(messages)
#         }
#         self.send_message(content)
#     def messages_to_json(self,messages):
#         result=[]
#         for message in messages:
#             result.append(self.message_to_json(message))
#         return result
#     def message_to_json(self,message):
#         return {
#             "client":message.client.user.first_name,
#             "freelancer":message.freelancer.user.first_name,
#             "content":message.content,
#             # "timestamp":message.timestamp
#         }
            
#     def new_messages(self,data):
#         print(data,"data in new messages")
#         id_of_client=data['user_id']
#         id_of_freelancer=data['freelancer_id']
#         client_user=User.objects.get(pk=id_of_client)
#         freelancer_user=User.objects.get(pk=id_of_freelancer)
#         client=Client.objects.get(user=client_user)
#         freelancer=FreeLancer.objects.get(user=freelancer_user)
#         message=Messages.objects.create(client=client,freelancer=freelancer,content=data['message'])
#         content={
#             "command":"new_message",
#             "message":self.message_to_json(message)
#         }
#         return self.send_chat_message(content)
        

#     commands={
#         'fetch_messages':fetch_messages,
#         'new_messages':new_messages
#     }
        
#     def connect(self):
#         print("hello")
#         #obbaining room_name params from the url route(chat/routing.py)
#         self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
#         self.room_group_name = "chat_%s" % self.room_name

#         # Join room group
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name, self.channel_name
#         )

#         self.accept()

#     def disconnect(self, close_code):
#         # Leave room group
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name, self.channel_name
#         )

#     # Receive message from WebSocket
#     def receive(self, text_data):
#         print("text",text_data)
#         data = json.loads(text_data)
#         print(data["command"],"printing command")
#         print(data,"this is data")
#         self.commands[data["command"]](self,data)
        
#     def send_chat_message(self,message):
#         # Send message to room group
#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name, {"type": "chat_message", "message": message}
#         )

#     # Receive message from room group
#     def send_message(self,message):
#         self.send(text_data=json.dumps(message))
#     def chat_message(self, event):
#         message = event["message"]
#         print(message,"send chat")

#         # Send message to WebSocket
#         self.send(text_data=json.dumps(message))