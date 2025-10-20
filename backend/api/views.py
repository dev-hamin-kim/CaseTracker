from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.utils import timezone

from .serializers import UserSerializer, CaseSerializer, DeviceSerializer, VariantSerializer, VariantCompletionSerializer, AddVariantSerializer
from .models import User, Case, Device, Variant, VariantCompletion

# ===== USER VIEWS ======

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# ===== CASE VIEWS ======

class CreateCase(generics.CreateAPIView):
    serializer_class = CaseSerializer
    permission_classes = [IsAuthenticated]
    
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
    
class ViewCaseVariants(generics.RetrieveAPIView):
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

# ===== VARIANT VIEWS ======

class CreateVariant(generics.CreateAPIView):
    serializer_class = VariantSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Variant.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class VariantList(generics.ListAPIView):
    serializer_class = VariantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Variant.objects.all()

# ===== VARIANT PRESET VIEWS ======
# TODO: complete variant preset views
# class VariantPresetViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = VariantPreset.objects.prefetch_related('items__target_device').all()
#     serializer_class = VariantPresetSerializer
#     permission_classes = [IsAdminUser]

# ===== VARIANT COMPLETION VIEWS ======
class VariantCompletionViewSet(viewsets.ModelViewSet):
    serializer_class = VariantCompletionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return VariantCompletion.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        if instance.completed and not instance.completed_at:
            instance.completed_at = timezone.now()
            instance.save()

# ===== ADD VARIANT TO CASE VIEWS ======
class AddVariantToCaseView(generics.GenericAPIView):
    serializer_class = AddVariantSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        try:
            case = Case.objects.get(pk=pk)
        except Case.DoesNotExist:
            return Response({"detail": "Case not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True) # ???

        created_variants = serializer.save(case=case)

        response_serializer = VariantSerializer(created_variants, many=True)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)