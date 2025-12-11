from django.utils import timezone
from .models import AttendanceRecord, User
import holidays

def create_daily_attendance_records():
    today = timezone.localdate()

    # Skip weekends
    if today.weekday() >= 5:   # 5=Saturday, 6=Sunday
        return

    # Optional: Skip Korean holidays
    kr_holidays = holidays.KR()
    if today in kr_holidays:
        return

    active_users = User.objects.filter(is_active=True)

    for user in active_users:
        AttendanceRecord.objects.get_or_create(
            user=user,
            date=today,
            defaults={
                "clock_in_time": None,
                "clock_out_time": None,
                "completed_variants_count": 0,
            }
        )