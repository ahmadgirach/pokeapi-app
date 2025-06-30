from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Pokemon
from .serializers import PokemonSerializer


class PokemonViewSet(ModelViewSet):
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer

    def get_queryset(self):
        queryset = self.queryset
        params = self.request.GET
        query = params.get("query", "")

        if query:
            queryset = queryset.filter(name__icontains=query)

        return queryset

    def retrieve(self, request, *args, **kwargs):
        ref = kwargs.get("pk", None)
        pokemon = get_object_or_404(Pokemon, ref=ref)
        serializer = PokemonSerializer(pokemon)
        return Response(serializer.data)
