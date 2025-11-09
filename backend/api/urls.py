from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path("user/fullname/", views.UserFullNameView.as_view(), name="user-fullname"),

    # ===== CASES URLS ======
    path("cases/", views.CaseList.as_view(), name="case-list"),
    path("cases/create/", views.CreateCase.as_view(), name="create-case"),
    path("cases/delete/<int:pk>/", views.CaseDelete.as_view(), name="delete-case"),
    path("cases/view/<int:pk>/", views.ViewCase.as_view(), name="view-case"),

    # ===== DEVICE URLS ======
    path("devices/create/", views.DeviceListCreate.as_view(), name="create-device"),
    path("devices/", views.DeviceList.as_view(), name="device-list"),
    path("devices/view/<int:pk>/", views.ViewDevice.as_view(), name="view-device"),

    # ===== VARIANT URLS ======
    path("variants/create/", views.CreateVariant.as_view(), name="create-variant"),
    path("variants/", views.VariantList.as_view(), name="variant-list"),
    path("variants/completion-status/<int:pk>/", views.CompleteVariantView.as_view(), name="complete-variant"),

    path("cases/<int:pk>/add-variants/", views.AddVariantToCaseView.as_view(), name="add-variants-to-case"),
]