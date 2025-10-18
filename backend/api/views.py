from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from .serializers import UserSerializer, CaseSerializer, DeviceSerializer
from .models import User, Case, Device

# ===== USER VIEWS ======

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# ===== CASE VIEWS ======

class CreateCase(generics.ListCreateAPIView):
    serializer_class = CaseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return Case.objects.filter(added_by=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
        else:
            print(serializer.errors)
        
class CaseDelete(generics.DestroyAPIView):
    serializer_class = CaseSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Case.objects.all()

class CaseList(generics.ListAPIView):
    serializer_class = CaseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Case.objects.all()
    

# ===== DEVICE VIEWS ======

class DeviceListCreate(generics.ListCreateAPIView):
    serializer_class = DeviceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Device.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class DeviceList(generics.ListAPIView):
    serializer_class = DeviceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Device.objects.all()

# class CaseDone(generics.UpdateAPIView):
#     serializer_class
#     permission_classes = [IsAuthenticated]