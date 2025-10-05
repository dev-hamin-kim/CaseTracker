from django.db import models
from django.contrib.auth.models import User

class Case(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="added_cases")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Variant(models.Model):
    brightness = models.CharField(max_length=6)

# class Device(models.Model):
#     S1 = "S1"
#     S1_5 = "S1.5"
#     DUO = "DUO"
#     A = "A"
#     B = "B"
#     C = "C"
#     D = "D"
#     E = "E"
#     F = "F"
#     G = "G"
#     H = "H"

#     DEVICE_LIST = (
#         (S1, "S1"),
#         (S1_5, "S1.5"),
#         (DUO, "DUO"),
#         (A, "A"),
#         (B, "B"),
#         (C, "C"),
#         (D, "D"),
#         (E, "E"),
#         (F, "F"),
#         (G, "G"),
#         (H, "H"),
#     )

#     name = models.CharField(max_length=5, choices=DEVICE_LIST, default="EMPTY")

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

# class CaseAssigned(models.Model):
#     to_collector = models.ForeignKey(Collector, on_delete=models.CASCADE)


# class CompletedCase(models.Model):
#     collector = models.ForeignKey(Collector, on_delete=models.CASCADE)
#     case = models.ForeignKey(Case, on_delete=models.CASCADE)
#     completed_at = models.DateTimeField(auto_now_add=True)