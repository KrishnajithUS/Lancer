# Generated by Django 4.1.2 on 2022-12-28 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_delete_freelancerbio_remove_experience_location_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="freelancer",
            name="title",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name="freelancer",
            name="experience",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="api.experience",
            ),
        ),
        migrations.AlterField(
            model_name="freelancer",
            name="skills",
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.DeleteModel(
            name="Skills",
        ),
    ]