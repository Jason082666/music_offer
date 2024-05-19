from django.shortcuts import render



def index(request):
    return render(request, 'index.html')

def quiz(request):
    return render(request, 'quiz.html')


def result(request):
    return render(request, 'result.html')

def album(request):
    return render(request, 'album.html')