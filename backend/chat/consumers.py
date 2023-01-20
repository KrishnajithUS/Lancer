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
def new_message_notification(self, event):
    self.send_json(event)
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

    def get_receiver(self):
        usernames=self.conversation_name.split("__")
        for username in usernames:
            if username != self.user.username:
                return User.objects.get(username=username)
    def receive_json(self, content, **kwargs):
        message_type=content["type"]
        if message_type == "read_messages":
            messages_to_me = self.conversation.messages.filter(to_user=self.user)
            messages_to_me.update(read=True)
            print(self.user.username)
            # Update the unread message count
            unread_count = Message.objects.filter(to_user=self.user, read=False).count()
            async_to_sync(self.channel_layer.group_send)(
                self.user.username + "__notifications",
                {
                    "type": "unread_count",
                    "unread_count": unread_count,
                },
            )
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
            notification_group_name = self.get_receiver().username + "__notifications"
            async_to_sync(self.channel_layer.group_send)(
    notification_group_name,
    {
        "type": "new_message_notification",
        "name": self.user.username,
        "message": MessageSerializer(message).data,
    },
)

        print(message_type)
        return super().receive_json(content, **kwargs)
    def chat_message_echo(self, event):
        self.send_json(event)


    def new_message_notification(self, event):
        self.send_json(event)

    def unread_count(self, event):
        self.send_json(event)


def unread_count(self, event):
        #in this we are passing the message to send group by method
        print(event,"hai")
        self.send_json(event)
class NotificationConsumer(JsonWebsocketConsumer):
    print("notification")
    def __init__(self, *args, **kwargs):
       
        super().__init__(args, kwargs)
        self.notification_group_name = None
        self.user = None

    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        self.accept()
        self.notification_group_name = self.user.username + "__notifications"
        print(self.notification_group_name,"group name")
        async_to_sync(self.channel_layer.group_add)(
            self.notification_group_name,
            self.channel_name,
        )
        unread_count = Message.objects.filter(to_user=self.user, read=False).count()
        self.send_json(
    {
        "type": "unread_count",
        "unread_count": unread_count,
    }
)    # private notification group


        # Send count of unread message
    def disconnect(self, code):
            async_to_sync(self.channel_layer.group_discard)(
                self.notification_group_name,
                self.channel_name,
            )
            return super().disconnect(code)
    def new_message_notification(self, event):
        self.send_json(event)

    def unread_count(self, event):
        self.send_json(event)



