from rest_framework import serializers
from .models import User, Case, Device, Variant

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ["id", "name", "description", "added_by", "created_at"]
        extra_kwargs = {"added_by": {"read_only": True}}

    def create(self, validated_data):
        case = Case.objects.create(**validated_data)
        return case

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ["id", "short_name"]

    def create(self, validated_data):
        device = Device.objects.create(**validated_data)
        return device

#     def createWithVariants(self, validated_data, variants_data):
#         case = Case.objects.create(**validated_data)
#         for variant_data in variants_data:
#             Variant.objects.create(case=case, **variant_data)
#         return case

class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = ["id", "case", "brightness", "collection_time", "target_device"]

    def create(self, validated_data):
        variant = Variant.objects.create(**validated_data)
        return variant
