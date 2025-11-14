from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.utils import timezone
from datetime import date

from .serializers import UserSerializer, CaseSerializer, DeviceSerializer, VariantSerializer, VariantCompletionSerializer, AddVariantSerializer
from .models import User, Case, Device, Variant, VariantCompletion

# ===== USER VIEWS ======

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class HideUserView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return User.objects.all()
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(is_active=False)
        else:
            print(serializer.errors)

class UserFullNameView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        full_name = user.get_full_name_with_unique_suffix()
        return Response({"fullname": full_name})
    
class UserDailyCompletionView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        today = timezone.localdate()
        start_of_day = timezone.make_aware(
            timezone.datetime.combine(today, timezone.datetime.min.time())
        )
        end_of_day = timezone.make_aware(
            timezone.datetime.combine(today, timezone.datetime.max.time())
        )

        completed_today = VariantCompletion.objects.filter(
            user=user,
            completed=True,
            completed_at__range=(start_of_day, end_of_day)
        ).count()

        return Response({"count": completed_today})
# ===== CASE VIEWS ======
class CaseListCreateView(generics.ListCreateAPIView):
    serializer_class = CaseSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [IsAuthenticated()]
    
    def get_queryset(self):
        if self.request.method == 'GET':
            return Case.objects.filter(is_shown=True).only('id', 'name', 'description')
        return Case.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
        else:
            print(serializer.errors)

class CaseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CaseSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsAdminUser()]
    
    def get_queryset(self):
        if self.request.method == 'GET':
            return Case.objects.filter(is_shown=True).prefetch_related(
                'variants__target_device'
            ).select_related('added_by')
        return Case.objects.all()

# ===== DEVICE VIEWS ======

class DeviceListCreate(generics.ListCreateAPIView):
    serializer_class = DeviceSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Device.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class DeviceList(generics.ListAPIView):
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Device.objects.all()
    
class ViewDevice(generics.RetrieveAPIView):
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated]

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
class CompleteVariantView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        """
        Marks a variant as completed by the current user.
        """
        try:
            variant = Variant.objects.get(pk=pk)
        except Variant.DoesNotExist:
            return Response({"detail": "Variant not found."}, status=status.HTTP_404_NOT_FOUND)

        # Either get existing or create a new completion record
        completion, created = VariantCompletion.objects.get_or_create(
            user=request.user,
            variant=variant,
            defaults={"completed": True, "completed_at": timezone.now()},
        )

        # If it already existed but wasn't completed, mark it now
        if not created:
            if not completion.completed:
                completion.completed = True
                completion.completed_at = timezone.now()
                completion.save()

        serializer = VariantCompletionSerializer(completion)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        VariantCompletion.objects.filter(user=request.user, variant_id=pk).update(
        completed=False, completed_at=None
        )
        return Response({"detail": "Variant unmarked as completed."}, status=status.HTTP_200_OK)

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