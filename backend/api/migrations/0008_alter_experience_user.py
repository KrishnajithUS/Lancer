# Generated by Django 4.1.2 on 2023-01-04 12:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_rename_education_education_user_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="experience",
            name="user",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="api.freelancer",
            ),
        ),
    ]