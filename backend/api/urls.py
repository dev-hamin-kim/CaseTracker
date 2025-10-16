from django.urls import path
from . import views

urlpatterns = [

    # ===== CASES URLS ======
    path("cases/", views.CaseList.as_view(), name="case-list"),
    path("cases/create/", views.CaseListCreate.as_view(), name="create-case"),
    path("cases/delete/<int:pk>/", views.CaseDelete.as_view(), name="delete-case"),

    # ===== DEVICE URLS ======
    path("devices/create/", views.DeviceListCreate.as_view(), name="create-device"),
    path("devices/", views.DeviceList.as_view(), name="device-list"),
]