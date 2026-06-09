from rest_framework import serializers

from .models import Certification, Education, Experience, Profile, SkillGroup, Stat


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ["value", "label"]


class SkillGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillGroup
        fields = ["label", "skills"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["role", "company", "location", "period", "bullets"]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["degree", "institution", "year", "honors"]


class CertificationSerializer(serializers.ModelSerializer):
    asset = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = ["name", "url", "asset"]

    def get_asset(self, obj):
        if not obj.certificate_file:
            return ""
        request = self.context.get("request")
        url = obj.certificate_file.url
        return request.build_absolute_uri(url) if request else url


class ProfileSerializer(serializers.ModelSerializer):
    stats = StatSerializer(many=True)
    skillGroups = SkillGroupSerializer(source="skill_groups", many=True)
    experience = ExperienceSerializer(many=True)
    education = EducationSerializer()
    certifications = CertificationSerializer(many=True)

    class Meta:
        model = Profile
        fields = [
            "name",
            "initials",
            "role",
            "location",
            "email",
            "github",
            "linkedin",
            "available",
            "headline",
            "bio",
            "about_heading",
            "about_copy",
            "contact_heading",
            "contact_copy",
            "contact_note",
            "stats",
            "skillGroups",
            "experience",
            "education",
            "certifications",
        ]
