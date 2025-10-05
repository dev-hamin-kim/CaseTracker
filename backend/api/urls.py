from django.urls import path
from . import views

urlpatterns = [
    path("cases/", views.CaseListCreate.as_view(), name="case-list"),
    path("cases/delete/<int:pk>/", views.CaseDelete.as_view(), name="delete-case")
]