import csv
from django.core.management.base import BaseCommand
from api.models import User

class Command(BaseCommand):
    help = "Imports user from CSV file"

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help="path to CSV file")

    def handle(self, *args, **options):
        file_path = options['csv_file']
        created_count = 0
        total = 0

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)

            for row in reader:
                username = row.get('username').strip()
                first_name = row.get('first_name').strip()
                last_name = row.get('last_name').strip()
                unique_suffix = row.get('unique_suffix').strip()
                english_name = row.get('english_name').strip()
                
                completion, created = User.objects.get_or_create(
                    username = username,
                    first_name = first_name,
                    last_name = last_name,
                    unique_suffix = unique_suffix,
                    english_name = english_name,
                    password = "facepaydata123"
                )

                if created:
                    created_count += 1

                total += 1

        self.stdout.write(self.style.SUCCESS(
            f"Import complete — {created_count} users added from {total} entries,"
        ))

