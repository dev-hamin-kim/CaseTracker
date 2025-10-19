from django.db import models
from django.contrib.auth.models import AbstractUser

# ===== USER MODELS ======
class User(AbstractUser):
    pass

# ===== CASE MODELS ======
class Case(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="added_cases", null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    backlight = models.BooleanField(default=False)
    is_shown = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
# ===== DEVICE MODELS ======
    
class Device(models.Model):
    CATEGORY = models.TextChoices('CATEGORY', 'A B C D E F G H S1 S1_5 DUO')

    short_name = models.CharField(max_length=10,
                                  choices=CATEGORY.choices,
                                  default='EMPTY')
    
# ===== VARIANT MODELS ======
class Variant(models.Model):
    TIME = models.TextChoices('TIME', 'DAY NIGHT')
    BRIGHTNESS = models.TextChoices('BRIGHTNESS', 'HIGH MEDIUM LOW')

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
                                      on_delete=models.ProtectedError)
    

# class CaseAssigned(models.Model):
#     to_collector = models.ForeignKey(Collector, on_delete=models.CASCADE)


# class CompletedCase(models.Model):
#     collector = models.ForeignKey(Collector, on_delete=models.CASCADE)
#     case = models.ForeignKey(Case, on_delete=models.CASCADE)
#     completed_at = models.DateTimeField(auto_now_add=True)