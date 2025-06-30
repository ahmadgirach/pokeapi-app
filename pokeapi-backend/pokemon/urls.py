from rest_framework.routers import SimpleRouter, DefaultRouter

from .views import PokemonViewSet


router = SimpleRouter()
router.register(r"pokemons", PokemonViewSet)

urlpatterns = router.urls + []
