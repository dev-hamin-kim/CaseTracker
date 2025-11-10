from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import User, Case, Variant, VariantCompletion

class Command(BaseCommand):
    help = 'Set case progress for all users based on variant completions'

    def add_arguments(self, parser):
        parser.add_argument("case_name", type=str, help="Name of the case")
        parser.add_argument("username", type=str, nargs="?", help="Username (omit with --all-users)")

        group = parser.add_mutually_exclusive_group(required=True)
        group.add_argument("--done", action="store_true", help="Mark all variants as done")
        group.add_argument("--undone", action="store_true", help="Mark all variants as undone")
        group.add_argument("--delete", action="store_true", help="Delete all completion records")

        parser.add_argument("--all-users", action="store_true", help="Apply to all users who have completions in this case")
        parser.add_argument("--dry-run", action="store_true", help="Preview actions without changing data")
        parser.add_argument("--verbose", action="store_true", help="Show each affected variant")

    def handle(self, *args, **options):
        case_name = options["case_name"]
        username = options.get("username")
        mark_done = options["done"]
        mark_undone = options["undone"]
        delete = options["delete"]
        all_users = options["all_users"]
        dry_run = options["dry_run"]
        verbose = options["verbose"]

        try:
            case = Case.objects.get(name=case_name)
        except Case.DoesNotExist:
            self.stderr.write(self.style.ERROR(f"❌ No case found with name '{case_name}'"))
            return
        
        if all_users:
            user_ids = VariantCompletion.objects.filter(variant__case=case).values_list("user_id", flat=True).distinct()
            users = User.objects.filter(id__in=user_ids)
            if not users.exists():
                self.stderr.write(self.style.WARNING(f"⚠️ No users found with completions in case '{case_name}'"))
                return
        else:
            if not username:
                self.stderr.write(self.style.ERROR("❌ You must provide a username unless using --all-users"))
                return
            try:
                user = User.objects.get(username=username)
                users = [user]
            except User.DoesNotExist:
                self.stderr.write(self.style.ERROR(f"❌ No user found with username '{username}'"))
                return
            
        variants = Variant.objects.filter(case=case)
        total_variants = variants.count()

        if total_variants == 0:
            self.stdout.write(self.style.WARNING(f"⚠️ Case '{case_name}' has no variants. Nothing to do."))
            return
        
        for user in users:
            if delete:
                completions = VariantCompletion.objects.filter(user=user, variant__case=case)
                count = completions.count()
                if dry_run:
                    self.stdout.write(f"🧪 [Dry Run] Would delete {count} completions for '{user.username}'")
                    continue

                deleted_count, _ = completions.delete()
                self.stdout.write(self.style.WARNING(f"🗑️ Deleted {deleted_count} completion records for '{user.username}' in '{case.name}'"))
                continue

            if mark_undone:
                completions = VariantCompletion.objects.filter(user=user, variant__case=case)
                count = completions.count()
                if dry_run:
                    self.stdout.write(f"🧪 [Dry Run] Would reset {count} variants as undone for '{user.username}'")
                    continue

                updated_count = completions.update(completed=False, completed_at=None)
                self.stdout.write(self.style.WARNING(f"♻️ Reset {updated_count} variants as undone for '{user.username}' in '{case.name}'"))
                continue

            if mark_done:
                created_count = 0
                updated_count = 0

                for variant in variants:
                    completion, created = VariantCompletion.objects.get_or_create(
                        user=user,
                        variant=variant,
                        defaults={"completed": True, "completed_at": timezone.now()},
                    )

                    if created:
                        created_count += 1
                        if verbose:
                            self.stdout.write(f"✅ Created new completion for variant {variant.id}")
                    elif not completion.completed:
                        if dry_run:
                            self.stdout.write(f"🧪 [Dry Run] Would mark variant {variant.id} as done for '{user.username}'")
                            continue
                        completion.completed = True
                        completion.completed_at = timezone.now()
                        completion.save()
                        updated_count += 1
                        if verbose:
                            self.stdout.write(f"🟢 Updated existing completion for variant {variant.id}")

                if dry_run:
                    self.stdout.write(f"🧪 [Dry Run] Would create {created_count} and update {updated_count} variants for '{user.username}'")
                else:
                    self.stdout.write(self.style.SUCCESS(
                        f"✅ Marked as done for '{user.username}' — {created_count} created, {updated_count} updated in '{case.name}'."
                    ))

        self.stdout.write(self.style.SUCCESS("🏁 Operation complete."))
