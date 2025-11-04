from django.contrib import admin
from .models import User, Case, Device, Variant

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    pass

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    pass

@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    pass