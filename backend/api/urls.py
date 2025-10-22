from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'variant/completions', views.VariantCompletionViewSet, basename='variant-completion')

urlpatterns = [

    # ===== CASES URLS ======
    path("cases/", views.CaseList.as_view(), name="case-list"),
    path("cases/create/", views.CreateCase.as_view(), name="create-case"),
    path("cases/delete/<int:pk>/", views.CaseDelete.as_view(), name="delete-case"),
    path("cases/view/<int:pk>/", views.ViewCase.as_view(), name="view-case"),

    # ===== DEVICE URLS ======
    path("devices/create/", views.DeviceListCreate.as_view(), name="create-device"),
    path("devices/", views.DeviceList.as_view(), name="device-list"),

    # ===== VARIANT URLS ======
    path("variants/create/", views.CreateVariant.as_view(), name="create-variant"),
    path("variants/", views.VariantList.as_view(), name="variant-list"),

    path("cases/<int:pk>/add-variants/", views.AddVariantToCaseView.as_view(), name="add-variants-to-case"),

    path("", include(router.urls)),
]