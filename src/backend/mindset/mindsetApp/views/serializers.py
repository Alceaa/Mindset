from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework import serializers
from mindsetApp.models import User
import re

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class LoginRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)

class RegistrationRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    email = CharField(required=True)
    password = CharField(required=True)

    def validate_email(self, email):
        if User.objects.filter(email=email):
            raise serializers.ValidationError(
                "Пользователь с такой почтой уже существует")
        return email

    def validate_username(self, username):
        if User.objects.filter(username=username):
            raise serializers.ValidationError(
                "Пользователь с таким именем уже существует")
        return username
    
    def validate_password(self, password):
        if len(password) < 8:
            raise serializers.ValidationError(
                "Пароль должен иметь хотя бы 8 символов")
        if not re.fullmatch(r'[A-Za-z0-9@#$%^&+=!]+', password):
            raise serializers.ValidationError(
                "Пароль содержит некорректные символы")
        return password