from rest_framework import serializers

from .models import Message
from api.serializers import UserSerializer


class MessageSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    to_user = serializers.SerializerMethodField()
    conversation = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = (
            "id",
            "conversation",
            "from_user",
            "to_user",
            "content",
            "timestamp",
            "read",
        )

    def get_conversation(self, obj):
        return str(obj.conversation.id)

    def get_from_user(self, obj):
        return UserSerializer(obj.from_user).data

    def get_to_user(self, obj):
        return UserSerializer(obj.to_user).data
class UserMessageSerializer(serializers.ModelSerializer):
    to_user = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = (

            "to_user",
            
        )



    def get_to_user(self, obj):
        return UserSerializer(obj.to_user).data