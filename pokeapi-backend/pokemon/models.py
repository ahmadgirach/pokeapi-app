from django.db import models


class Pokemon(models.Model):
    name = models.CharField(max_length=20)
    ref = models.IntegerField(
        unique=True,
        help_text="This field is mapped with PokeAPI's pokemon Id.",
    )
    weight = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)

    class Meta:
        db_table = "pokemons"


class PokemonAbility(models.Model):
    pokemon_id = models.ForeignKey(
        Pokemon, related_name="abilities", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=20)
    is_hidden = models.BooleanField(default=False)
    slot = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = "pokemon_abilities"


class PokemonMove(models.Model):
    pokemon_id = models.ForeignKey(
        Pokemon, related_name="moves", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=20)

    class Meta:
        db_table = "pokemon_moves"


class PokemonStat(models.Model):
    pokemon_id = models.ForeignKey(
        Pokemon, related_name="stats", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=20)
    base_stat = models.IntegerField(blank=True, null=True)
    effort = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = "pokemon_stats"
