# Generated by Django 4.1.2 on 2023-01-08 07:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0012_alter_createpost_price"),
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="category",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="api.createpost",
            ),
        ),
        migrations.AddField(
            model_name="category",
            name="category_name",
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name="createpost",
            name="keyfeatures",
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.CreateModel(
            name="SubCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "subcategory_name",
                    models.CharField(blank=True, max_length=30, null=True),
                ),
                (
                    "subcategory",
                    models.ForeignKey(
                        default=None,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="api.category",
                    ),
                ),
            ],
        ),
    ]