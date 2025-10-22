from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# ===== USER MODELS ======
class User(AbstractUser):
    pass

# ===== CASE MODELS ======
class Case(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200, blank=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="added_cases", null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    backlight = models.BooleanField(default=False)
    is_shown = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
# ===== DEVICE MODELS ======
    
class Device(models.Model):
    CATEGORY = models.TextChoices('CATEGORY', 'A B C D E F G H S1 S1_5 DUO')

    category = models.CharField(max_length=10,
                                  choices=CATEGORY.choices,
                                  default='EMPTY')
    
# ===== VARIANT MODELS ======
class Variant(models.Model):
    TIME = models.TextChoices('TIME', 'DAY NIGHT')
    BRIGHTNESS = models.TextChoices('BRIGHTNESS', 'HIGH MEDIUM LOW')
    ACCESSORY = models.TextChoices('ACCESSORY', 'NONE GLASSES HAT MASK GLASSES_HAT GLASSES_MASK HAT_MASK GLASSES_HAT_MASK ETC')

    case = models.ForeignKey(Case,
                             on_delete=models.PROTECT,
                             related_name="variants")
    brightness = models.CharField(max_length=6,
                                  choices=BRIGHTNESS.choices,
                                  default='EMPTY')
    collection_time = models.CharField(max_length=5,
                                       choices=TIME.choices,
                                       default='EMPTY')
    target_device = models.ForeignKey(Device,
                                      on_delete=models.PROTECT)
    accessory = models.CharField(max_length=20,
                                 choices=ACCESSORY.choices,
                                 default='EMPTY')
    completed_by = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='VariantCompletion',
        related_name='completed_variants')
    
class VariantPreset(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=200, blank=True)

class VariantPresetItem(models.Model):
    preset = models.ForeignKey(VariantPreset,
                               on_delete=models.CASCADE,
                               related_name="items")
    brightness = models.CharField(max_length=6,
                                  choices=Variant.BRIGHTNESS.choices,
                                  default='EMPTY')
    collection_time = models.CharField(max_length=5,
                                       choices=Variant.TIME.choices,
                                       default='EMPTY')
    target_device = models.ForeignKey(Device,
                                      on_delete=models.PROTECT)
    accessory = models.CharField(max_length=20,
                                 choices=Variant.ACCESSORY.choices,
                                 default='EMPTY')
    
class VariantCompletion(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE,
                             related_name="variant_completions")
    variant = models.ForeignKey(Variant,
                                on_delete=models.CASCADE,
                                related_name="completions")
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'variant')



# class CaseAssigned(models.Model):
#     to_collector = models.ForeignKey(Collector, on_delete=models.CASCADE)

