from django.db import models
from django.contrib.auth.models import User

class Case(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    added_by = models.ForeignKey(User, on_delete=models.SET_DEFAULT, related_name="added_cases", default="UNKNOWN")
    created_at = models.DateTimeField(auto_now_add=True)
    backlight = models.BooleanField(default=False)
    is_shown = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class Device(models.Model):
    CATEGORY = models.TextChoices('CATEGORY', 'A B C D E F G H S1 S1_5 DUO')

    short_name = models.CharField(max_length=10,
                                  choices=CATEGORY.choices,
                                  default='EMPTY')
    
class Variant(models.Model):
    brightness = models.CharField(max_length=6)


# class CaseVariant(models.Model):
#     HIGH = "H"
#     MEDIUM = "M"
#     LOW = "L"

#     BRIGHTNESS_OPTION = (
#         (HIGH, "H"),
#         (MEDIUM, "M"),
#         (LOW, "L"),
#     )

#     TIME = models.TextChoices('TIME', 'DAY NIGHT')

#     target_device = models.ForeignKey(Device, on_delete=models.CASCADE)
#     brightness = models.CharField(max_length=6, choices=BRIGHTNESS_OPTION, default="M")
#     collection_time = models.CharField(max_length=5, choices=TIME.choices)
#     backlight = models.BooleanField(default=False)
    target_device = models.ForeignKey(Device,
                                      on_delete=models.ProtectedError)
    

# class CaseAssigned(models.Model):
#     to_collector = models.ForeignKey(Collector, on_delete=models.CASCADE)


# class CompletedCase(models.Model):
#     collector = models.ForeignKey(Collector, on_delete=models.CASCADE)
#     case = models.ForeignKey(Case, on_delete=models.CASCADE)
#     completed_at = models.DateTimeField(auto_now_add=True)