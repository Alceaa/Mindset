from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import LoginRequestSerializer, RegistrationRequestSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect
from mindsetApp.models import User
from rest_framework.views import APIView
from django.utils.decorators import method_decorator

class Login(APIView):
    @method_decorator(permission_classes([AllowAny]))
    @method_decorator(csrf_protect)
    def post(self, request):
        if request.method == 'POST':
            serializer = LoginRequestSerializer(data=request.data)
            if serializer.is_valid():
                authenticated_user = authenticate(**serializer.validated_data)
                if authenticated_user is not None:
                    login(request, authenticated_user)
                    return Response({"status": "Success"}, status=200)
                else:
                    return Response({"error": "Введенные данные неверны"}, status=403)
            else:
                return Response(serializer.errors, status=400)
        return Response({'detail': 'Invalid request method'}, status=405)
    
class Registration(APIView):
    @method_decorator(permission_classes([AllowAny]))
    @method_decorator(csrf_protect)
    def post(self, request):
        if request.method == 'POST':
            serializer = RegistrationRequestSerializer(data=request.data)
            if serializer.is_valid():
                User.objects.create_user(**serializer.validated_data)
                return Response({"status": "Success"}, status=200)
            else:
                return Response(serializer.errors, status=400)
        return Response({'detail': 'Invalid request method'}, status=405)