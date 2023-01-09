# Generated by Django 4.1.2 on 2023-01-08 08:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0018_category_subcategory"),
    ]

    operations = [
        migrations.AddField(
            model_name="createpost",
            name="category",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="api.category",
            ),
        ),
    ]