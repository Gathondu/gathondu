from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Profile
from .serializers import ProfileSerializer


@api_view(["GET"])
def portfolio(request):
    profile = (
        Profile.objects.prefetch_related(
            "stats",
            "skill_groups",
            "experience",
            "certifications__asset",
        )
        .select_related("education", "resume_asset")
        .first()
    )
    if profile is None:
        return Response({"detail": "No portfolio profile has been created yet."}, status=404)

    return Response(ProfileSerializer(profile, context={"request": request}).data)
