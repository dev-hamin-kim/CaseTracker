from django.contrib import admin
from .models import User, Case, Device, Variant

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    @admin.action(description="Hide selected case(s)")
    def hide_selected_cases(self, request, queryset):
        queryset.update(is_shown=False)

    actions = ["hide_selected_cases"]

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    pass

@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    pass