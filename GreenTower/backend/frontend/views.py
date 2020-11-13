from django.shortcuts import render


def Index(response):
    form = {}
    return render(response, 'frontend/index.html', form)