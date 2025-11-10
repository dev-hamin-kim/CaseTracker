import csv
import logging
from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import User, Case, Device, Variant, VariantCompletion

class Command(BaseCommand):
    help = "Imports data from CSV file"

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help="path to CSV file")

    def handle(self, *args, **options):
        # === Setup logging ===
        log_filename = "import_log.txt"
        logging.basicConfig(
            filename=log_filename,
            level=logging.INFO,
            format="%(asctime)s [%(levelname)s] %(message)s",
        )

        file_path = options['csv_file']
        created_count = 0
        no_such_user = 0
        no_such_case = 0
        no_such_device = 0
        no_such_variant = 0
        existing_count = 0

        logging.info(f"Starting import from {file_path}")

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)

            for row in reader:
                username = row.get('username').strip()
                case_name = row.get('시나리오_이름').strip()
                device_category = row.get('수집기종').strip()
                date_completed = row.get('수집날짜').strip()
                brightness = row.get('시나리오_조도').strip()
                accessory = row.get('시나리오_악세사리').strip()

                try:
                    user = User.objects.get(username=username)
                    case = Case.objects.get(name=case_name)
                    device = Device.objects.get(category=device_category)
                    variant = Variant.objects.get(case=case, target_device=device,
                                                  brightness=brightness, accessory=accessory)
                except User.DoesNotExist:
                    no_such_user += 1
                    msg = f"No username: {username}"
                    print(msg)
                    logging.warning(msg)
                    continue

                except Case.DoesNotExist:
                    no_such_case += 1
                    msg = f"No case named: {case_name}"
                    print(msg)
                    logging.warning(msg)
                    continue

                except Device.DoesNotExist:
                    no_such_device += 1
                    msg = f"No device in category: {device_category}"
                    print(msg)
                    logging.warning(msg)
                    continue

                except Variant.DoesNotExist:
                    no_such_variant += 1
                    msg = f"No variant for {case_name} ({device_category}, {brightness}, {accessory})"
                    print(msg)
                    logging.warning(msg)
                    continue

                completion, created = VariantCompletion.objects.get_or_create(
                    user=user,
                    variant=variant,
                    defaults={
                        'completed': True,
                        'completed_at': date_completed or timezone.now(),
                    }
                )

                if created:
                    created_count += 1
                    msg = f"✅ Created completion for {user.username} → {variant}"
                else:
                    if not completion.completed:
                        completion.completed = True
                        completion.completed_at = date_completed or timezone.now()
                        completion.save()
                        msg = f"🟢 Updated completion status for {user.username} → {variant}"
                    else:
                        msg = f"⚠️ Already exists: {user.username} → {variant}"
                existing_count += 1

                print(msg)
                logging.info(msg)

        summary = (
            f"Import complete — {created_count} new, {existing_count} already existed, "
            f"{no_such_user + no_such_case + no_such_device + no_such_variant} skipped."
        )
        print(summary)
        logging.info(summary)