# Generated by Django 4.1.2 on 2023-01-16 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("payment", "0004_alter_createpost_category_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="packages",
            name="no_of_posts",
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]