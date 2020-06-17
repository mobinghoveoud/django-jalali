# Generated by Django 2.0.1 on 2018-01-21 08:57

import datetime

from django.db import migrations, models
import django_jalali.db.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('date', django_jalali.db.models.jDateField()),
            ],
        ),
        migrations.CreateModel(
            name='BarTime',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('datetime', django_jalali.db.models.jDateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='DateWithDefault',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date1', django_jalali.db.models.jDateTimeField(default=datetime.datetime(2011, 9, 22))),
                ('date2', django_jalali.db.models.jDateTimeField(default=datetime.datetime(2011, 9, 22))),
            ],
        ),
        migrations.CreateModel(
            name='DateTimeWithDefault',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime1', django_jalali.db.models.jDateTimeField(default=datetime.datetime(2011, 9, 22, 10, 22, 23, 240000))),
                ('datetime2', django_jalali.db.models.jDateTimeField(default=datetime.datetime(2011, 9, 22, 10, 22, 23, 240000))),
            ],
        ),
    ]
