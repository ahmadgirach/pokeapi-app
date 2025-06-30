from rest_framework.serializers import ModelSerializer

from .models import Pokemon, PokemonAbility, PokemonMove, PokemonStat


class AbilitySerializer(ModelSerializer):
    class Meta:
        model = PokemonAbility
        exclude = ("pokemon_id",)


class MoveSerializer(ModelSerializer):
    class Meta:
        model = PokemonMove
        exclude = ("pokemon_id",)


class StatSerializer(ModelSerializer):
    class Meta:
        model = PokemonStat
        exclude = ("pokemon_id",)


class PokemonSerializer(ModelSerializer):
    abilities = AbilitySerializer(many=True)
    moves = MoveSerializer(many=True)
    stats = StatSerializer(many=True)

    class Meta:
        model = Pokemon
        fields = (
            "id",
            "name",
            "weight",
            "height",
            "ref",
            "abilities",
            "moves",
            "stats",
        )

    def create(self, validated_data):
        abilities = validated_data.pop("abilities")
        moves = validated_data.pop("moves")
        stats = validated_data.pop("stats")

        pokemon = Pokemon.objects.create(**validated_data)

        PokemonAbility.objects.bulk_create(
            [PokemonAbility(**ability, pokemon_id=pokemon) for ability in abilities]
        )

        PokemonMove.objects.bulk_create(
            [PokemonMove(**move, pokemon_id=pokemon) for move in moves]
        )

        PokemonStat.objects.bulk_create(
            [PokemonStat(**stat, pokemon_id=pokemon) for stat in stats]
        )

        return pokemon
