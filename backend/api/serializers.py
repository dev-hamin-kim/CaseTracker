from rest_framework import serializers
from .models import User, Case, Device, Variant, VariantPreset, VariantPresetItem, VariantCompletion

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = ["brightness", "collection_time", "target_device"]

class CaseSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, required=False)
    preset = serializers.PrimaryKeyRelatedField(
        queryset=VariantPreset.objects.all(), required=False, write_only=True
    )

    class Meta:
        model = Case
        fields = ["id", "name", "description", "added_by", "created_at",
                  "backlight", "is_shown", "variants", "preset"]
        extra_kwargs = {"added_by": {"read_only": True}}

    def create(self, validated_data):
        variants_data = validated_data.pop("variants", [])
        preset = validated_data.pop("preset", None)
        case = Case.objects.create(**validated_data)

        # If preset provided, apply it
        if preset:
            for item in preset.items.all():
                Variant.objects.create(
                    case=case,
                    brightness=item.brightness,
                    collection_time=item.collection_time,
                    target_device=item.target_device,
                )

        for variant_data in variants_data:
            Variant.objects.create(case=case, **variant_data)
        
        return case

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ["id", "category"]

    def create(self, validated_data):
        device = Device.objects.create(**validated_data)
        return device

class AddVariantSerializer(serializers.Serializer):
    variants = serializers.ListField(
        child=serializers.DictField(),
        required=False
    )
    preset = serializers.PrimaryKeyRelatedField(
        queryset=VariantPreset.objects.all(),
        required=False
    )

    def validate(self, data):
        if not data.get('variants') and not data.get('preset'):
            raise serializers.ValidationError("Either 'variants' or 'preset' must be provided.")
        return data

    def save(self, case):
        variants_data = self.validated_data.get('variants', [])
        preset = self.validated_data.get('preset', None)

        created = []
        if preset:
            for item in preset.items.all():
                created.append(Variant.objects.create(
                    case=case,
                    brightness=item.brightness,
                    collection_time=item.collection_time,
                    target_device=item.target_device,
                    )
                )

        for variant_data in variants_data:
            device_id = variant_data.get("target_device")

            if isinstance(device_id, int):
                try: variant_data["target_device"] = Device.objects.get(pk=device_id)
                except Device.DoesNotExist:
                    raise serializers.ValidationError(
                        {"target_device": f"Device with id={device_id} does not exist."}
                    )

            created.append(Variant.objects.create(case=case, **variant_data))

        return created
    
class VariantPresetItemSerializer(serializers.ModelSerializer):
    target_device_category = serializers.CharField(source='target_device.category', read_only=True)

    class Meta:
        model = VariantPresetItem
        fields = ['id', 'brightness', 'collection_time',
                  'target_device_id', 'target_device_category']

class VariantPresetSerializer(serializers.ModelSerializer):
    items = VariantPresetItemSerializer(many=True, read_only=True)

    class Meta:
        model = VariantPreset
        fields = ['id', 'name', 'description', 'items']

class VariantCompletionSerializer(serializers.ModelSerializer):
    variant_name = serializers.CharField(source='variant.case.name', read_only=True)

    class Meta:
        model = VariantCompletion
        fields = ['id', 'user', 'variant', 'completed', 'completed_at']
#     def createWithVariants(self, validated_data, variants_data):
#         case = Case.objects.create(**validated_data)
#         for variant_data in variants_data:
#             Variant.objects.create(case=case, **variant_data)
#         return case