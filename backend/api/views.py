from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from .serializers import UserSerializer, CaseSerializer
from .models import Case

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CaseListCreate(generics.ListCreateAPIView):
    serializer_class = CaseSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Case.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
        
class CaseDelete(generics.DestroyAPIView):
    serializer_class = CaseSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Case.objects.all()

class CaseList(generics.ListAPIView):
    serializer_class = CaseSerializer
    permission_classes = [IsAuthenticated]


# class CaseDone(generics.UpdateAPIView):
#     serializer_class
#     permission_classes = [IsAuthenticated]